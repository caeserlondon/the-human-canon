-- Canon books and authors tables
-- Used by the app to fetch public content.
-- Seeded via scripts/seed.ts using the service role.

-- Keep updated_at in sync on every update
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- canon_books
-- =========================
CREATE TABLE IF NOT EXISTS public.canon_books (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT canon_books_data_is_object CHECK (jsonb_typeof(data) = 'object')
);

-- Useful for filtering published vs draft if you add more statuses later
CREATE INDEX IF NOT EXISTS idx_canon_books_status
  ON public.canon_books ((data->>'status'));

CREATE INDEX IF NOT EXISTS idx_canon_books_updated_at
  ON public.canon_books (updated_at DESC);

DROP TRIGGER IF EXISTS trg_canon_books_set_updated_at ON public.canon_books;
CREATE TRIGGER trg_canon_books_set_updated_at
BEFORE UPDATE ON public.canon_books
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.canon_books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read canon books" ON public.canon_books;
CREATE POLICY "Public can read canon books"
  ON public.canon_books
  FOR SELECT
  USING (true);

-- =========================
-- canon_authors
-- =========================
CREATE TABLE IF NOT EXISTS public.canon_authors (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT canon_authors_data_is_object CHECK (jsonb_typeof(data) = 'object')
);

CREATE INDEX IF NOT EXISTS idx_canon_authors_updated_at
  ON public.canon_authors (updated_at DESC);

DROP TRIGGER IF EXISTS trg_canon_authors_set_updated_at ON public.canon_authors;
CREATE TRIGGER trg_canon_authors_set_updated_at
BEFORE UPDATE ON public.canon_authors
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.canon_authors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read canon authors" ON public.canon_authors;
CREATE POLICY "Public can read canon authors"
  ON public.canon_authors
  FOR SELECT
  USING (true);

-- Notes:
-- 1) Service role bypasses RLS, so no extra INSERT/UPDATE/DELETE policy is needed for seeding.
-- 2) Book fields such as title, author, seo, status, etc. live inside the JSONB `data` column.
-- 3) Main top-level columns are: id, slug, data, created_at, updated_at.