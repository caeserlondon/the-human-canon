import { getCanonDataClient } from "@/lib/supabase/server-data";
import type { CanonBook } from "./types";

export type { CanonBook } from "./types";

export async function getAllBooks(): Promise<CanonBook[]> {
  const supabase = getCanonDataClient();
  const { data: rows, error } = await supabase
    .from("canon_books")
    .select("data")
    .eq("data->>status", "published");

  if (error) {
    console.error("[getAllBooks]", error.message);
    return [];
  }

  return ((rows ?? []) as { data: CanonBook }[]).map((r) => r.data);
}

export async function getBookBySlug(slug: string): Promise<CanonBook | undefined> {
  const supabase = getCanonDataClient();
  const { data: row, error } = await supabase
    .from("canon_books")
    .select("data")
    .eq("slug", slug)
    .eq("data->>status", "published")
    .single();

  if (error || !row) return undefined;
  return (row as { data: CanonBook }).data;
}

/** Get books by slugs in the specified order. Skips slugs not found. */
export async function getBooksBySlugs(slugs: string[]): Promise<CanonBook[]> {
  if (slugs.length === 0) return [];

  const supabase = getCanonDataClient();
  const { data: rows, error } = await supabase
    .from("canon_books")
    .select("data")
    .in("slug", slugs)
    .eq("data->>status", "published");

  if (error) return [];

  const bySlug = new Map<string, CanonBook>();
  for (const row of (rows ?? []) as { data: CanonBook }[]) {
    bySlug.set(row.data.slug, row.data);
  }
  return slugs.map((slug) => bySlug.get(slug)).filter((b): b is CanonBook => b != null);
}

/** Convert theme name to URL slug (e.g. "Strategy and planning" -> "strategy-and-planning") */
export function themeToSlug(theme: string): string {
  return theme
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Check if a book theme matches a slug (for filtering) */
export function themeMatchesSlug(theme: string, slug: string): boolean {
  return themeToSlug(theme) === slug;
}

/** Get all unique themes from books, sorted alphabetically, with slugs */
export async function getUniqueThemes(): Promise<{ name: string; slug: string }[]> {
  const books = await getAllBooks();
  const themeSet = new Set<string>();
  for (const book of books) {
    for (const theme of book.themes) {
      themeSet.add(theme);
    }
  }
  return Array.from(themeSet)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ name, slug: themeToSlug(name) }));
}

export async function getRelatedBooks(
  refs: (string | { slug: string; relation?: string })[]
): Promise<{ book: CanonBook; relation?: string }[]> {
  if (refs.length === 0) return [];

  const slugs = refs.map((r) => (typeof r === "string" ? r : r.slug));
  const relations = new Map(
    refs
      .filter((r): r is { slug: string; relation?: string } => typeof r !== "string")
      .map((r) => [r.slug, r.relation])
  );

  const supabase = getCanonDataClient();
  const { data: rows, error } = await supabase
    .from("canon_books")
    .select("data")
    .in("slug", slugs)
    .eq("data->>status", "published");

  if (error) return [];

  return ((rows ?? []) as { data: CanonBook }[])
    .map((r) => r.data)
    .map((book) => ({ book, relation: relations.get(book.slug) }));
}
