-- Canon books and authors tables
-- Used by the app to fetch book and author content. Seeded via scripts/seed.ts

-- Books: full CanonBook stored as JSONB for flexibility
CREATE TABLE IF NOT EXISTS public.canon_books (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_canon_books_slug ON public.canon_books(slug);
CREATE INDEX IF NOT EXISTS idx_canon_books_status ON public.canon_books((data->>'status'));

ALTER TABLE public.canon_books ENABLE ROW LEVEL SECURITY;

-- Public read for all
CREATE POLICY "Public can read canon books"
  ON public.canon_books FOR SELECT
  USING (true);

-- Authors: full CanonAuthor stored as JSONB
CREATE TABLE IF NOT EXISTS public.canon_authors (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_canon_authors_slug ON public.canon_authors(slug);

ALTER TABLE public.canon_authors ENABLE ROW LEVEL SECURITY;

-- Public read for all
CREATE POLICY "Public can read canon authors"
  ON public.canon_authors FOR SELECT
  USING (true);

-- Service role can insert/update/delete (for seeding)
-- RLS policies for INSERT/UPDATE/DELETE: only service role can do these
-- By default, anon/authenticated users cannot insert. The seed script uses service role.
