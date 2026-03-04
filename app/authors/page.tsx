import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthorImage } from "@/components/author-image";
import { SortSelect } from "@/components/sort-select";
import { getAuthorImagePath } from "@/lib/authors/image-path";
import { getAllAuthors } from "@/lib/authors";
import type { CanonAuthor } from "@/lib/authors";

function yearDisplay(year: number): string {
  return year < 0 ? `${Math.abs(year)} BCE` : year.toString();
}

function sortAuthors(
  authors: CanonAuthor[],
  sort: string
): CanonAuthor[] {
  const sorted = [...authors];
  switch (sort) {
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "date-asc":
      return sorted.sort((a, b) => {
        const aYear = a.birthYear ?? a.deathYear ?? 0;
        const bYear = b.birthYear ?? b.deathYear ?? 0;
        return aYear - bYear;
      });
    case "date-desc":
      return sorted.sort((a, b) => {
        const aYear = a.birthYear ?? a.deathYear ?? 0;
        const bYear = b.birthYear ?? b.deathYear ?? 0;
        return bYear - aYear;
      });
    case "name-asc":
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

const AUTHOR_SORT_OPTIONS = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "date-asc", label: "Date (oldest first)" },
  { value: "date-desc", label: "Date (newest first)" },
];

interface AuthorsPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function AuthorsPage({ searchParams }: AuthorsPageProps) {
  const { sort = "name-asc" } = await searchParams;
  const allAuthors = await getAllAuthors();
  const authors = sortAuthors(allAuthors, sort);

  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <section className="mx-auto max-w-7xl flex-1 px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Authors</h1>
            <p className="mt-1 text-muted">
              The thinkers behind the canon—philosophers, emperors, and visionaries across civilizations.
            </p>
          </div>
          {authors.length > 0 && (
            <Suspense fallback={null}>
              <SortSelect
                options={AUTHOR_SORT_OPTIONS}
                defaultValue="name-asc"
                paramName="sort"
              />
            </Suspense>
          )}
        </div>

        {authors.length === 0 ? (
          <div className="hc-card mt-8 p-12 text-center">
            <p className="text-muted">Author profiles are being added. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group hc-card-grid flex items-start gap-3 rounded-lg border border-panel2 bg-panel p-4 hover:border-gold/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-text group-hover:text-gold transition-colors">
                    {author.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {author.civilization} · {author.era}
                  </p>
                  {(author.birthYear != null || author.deathYear != null) && (
                    <p className="mt-0.5 text-xs text-muted2">
                      {author.birthYear != null && yearDisplay(author.birthYear)}
                      {author.birthYear != null && author.deathYear != null && " – "}
                      {author.deathYear != null && yearDisplay(author.deathYear)}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <AuthorImage
                    src={getAuthorImagePath(author)}
                    alt={author.name}
                    name={author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover ring-1 ring-panel2"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
