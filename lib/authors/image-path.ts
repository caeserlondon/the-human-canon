/**
 * Maps author slugs to actual image filenames when they differ.
 * Add entries when the author slug doesn't match the file in public/authors.
 */
const SLUG_TO_IMAGE: Record<string, string> = {
  "niccolo-machiavelli": "machiavelli",
  kant: "immanuel-kant",
  rousseau: "jean-jacques-rousseau",
  locke: "john-locke",
  lucretius: "Lucretius", // filename has capital L
};

export function authorSlugToImagePath(slug: string): string {
  const filename = SLUG_TO_IMAGE[slug] ?? slug;
  return `/authors/${filename}.jpg`;
}

/**
 * Returns the image path for an author. Prefers the slug-based mapping over
 * author.image from the DB, since seed data may have incorrect paths.
 */
export function getAuthorImagePath(author: { slug: string; image?: string | null }): string {
  return authorSlugToImagePath(author.slug);
}
