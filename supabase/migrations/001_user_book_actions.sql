-- User book actions: favorites, read_status, wishlist

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- favorites
-- =========================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT favorites_user_book_unique UNIQUE (user_id, book_slug)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_book_slug ON public.favorites(book_slug);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own favorites" ON public.favorites;
CREATE POLICY "Users can manage own favorites"
  ON public.favorites
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =========================
-- read_status
-- =========================
CREATE TABLE IF NOT EXISTS public.read_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT read_status_user_book_unique UNIQUE (user_id, book_slug)
);

CREATE INDEX IF NOT EXISTS idx_read_status_user_id ON public.read_status(user_id);
CREATE INDEX IF NOT EXISTS idx_read_status_book_slug ON public.read_status(book_slug);

ALTER TABLE public.read_status ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own read status" ON public.read_status;
CREATE POLICY "Users can manage own read status"
  ON public.read_status
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =========================
-- wishlist
-- =========================
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT wishlist_user_book_unique UNIQUE (user_id, book_slug)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_book_slug ON public.wishlist(book_slug);

ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own wishlist" ON public.wishlist;
CREATE POLICY "Users can manage own wishlist"
  ON public.wishlist
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Notes:
-- 1) UNIQUE(user_id, book_slug) prevents duplicate rows per user/book pair.
-- 2) `book_slug` is stored as plain text here so this migration can run independently.
-- 3) If you later want a foreign key to canon_books(slug), add it after canon_books exists.