import { getCanonDataClient } from "@/lib/supabase/server-data";
import type { CanonAuthor } from "./types";

export type { CanonAuthor } from "./types";

export async function getAllAuthors(): Promise<CanonAuthor[]> {
  const supabase = getCanonDataClient();
  const { data: rows, error } = await supabase
    .from("canon_authors")
    .select("data");

  if (error) {
    console.error("[getAllAuthors]", error.message);
    return [];
  }

  return ((rows ?? []) as { data: CanonAuthor }[]).map((r) => r.data);
}

export async function getAuthorBySlug(slug: string): Promise<CanonAuthor | undefined> {
  const supabase = getCanonDataClient();
  const { data: row, error } = await supabase
    .from("canon_authors")
    .select("data")
    .eq("slug", slug)
    .single();

  if (error || !row) return undefined;
  return (row as { data: CanonAuthor }).data;
}
