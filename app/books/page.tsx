import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthorImage } from "@/components/author-image";
import { SortSelect } from "@/components/sort-select";
import { authorSlugToImagePath } from "@/lib/authors/image-path";
import { getAllBooks } from "@/lib/books";
import type { CanonBook } from "@/lib/books";

function authorNameToSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || "unknown"
  );
}

function sortBooks(books: CanonBook[], sort: string): CanonBook[] {
  const sorted = [...books];
  switch (sort) {
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "author-asc":
      return sorted.sort((a, b) => a.author.localeCompare(b.author));
    case "author-desc":
      return sorted.sort((a, b) => b.author.localeCompare(a.author));
    case "year-asc":
      return sorted.sort((a, b) => a.publicationYear - b.publicationYear);
    case "year-desc":
      return sorted.sort((a, b) => b.publicationYear - a.publicationYear);
    case "title-asc":
    default:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
}

const BOOK_SORT_OPTIONS = [
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
  { value: "author-asc", label: "Author A–Z" },
  { value: "author-desc", label: "Author Z–A" },
  { value: "year-asc", label: "Year (oldest first)" },
  { value: "year-desc", label: "Year (newest first)" },
];

interface BooksPageProps {
  searchParams: Promise<{ q?: string; sort?: string }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { q, sort = "title-asc" } = await searchParams;
  const allBooks = await getAllBooks();
  let books = q
    ? allBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          b.author.toLowerCase().includes(q.toLowerCase())
      )
    : allBooks;
  books = sortBooks(books, sort);

  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <section className="mx-auto max-w-7xl flex-1 px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">The Canon</h1>
            <p className="mt-1 text-muted">
              Curated works across civilizations and centuries.
            </p>
          </div>
          {books.length > 0 && (
            <Suspense fallback={null}>
              <SortSelect
                options={BOOK_SORT_OPTIONS}
                defaultValue="title-asc"
                paramName="sort"
              />
            </Suspense>
          )}
        </div>

        {books.length === 0 ? (
          <div className="hc-card mt-8 p-12 text-center">
            <p className="text-muted">The canon is being built. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group hc-card-grid flex items-start gap-3 rounded-lg border border-panel2 bg-panel p-4 hover:border-gold/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-text group-hover:text-gold transition-colors">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{book.author}</p>
                  <p className="mt-0.5 text-xs text-muted2">
                    {book.publicationYear < 0 ? `${Math.abs(book.publicationYear)} BCE` : book.publicationYear}
                  </p>
                </div>
                <div className="shrink-0">
                  <AuthorImage
                    src={authorSlugToImagePath(authorNameToSlug(book.author))}
                    alt={book.author}
                    name={book.author}
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
