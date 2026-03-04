import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AuthorImage } from "@/components/author-image";
import { BookActions } from "@/components/book-actions";
import { BookPageContent } from "@/components/book-page-content";
import { Footer } from "@/components/footer";
import { getAllBooks, getBookBySlug, getRelatedBooks } from "@/lib/books";
import { getAuthorBySlug } from "@/lib/authors";
import { authorSlugToImagePath } from "@/lib/authors/image-path";
import { getUserBookActions } from "@/lib/supabase/queries";

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

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Not Found" };
  return {
    title: book.seo.title,
    description: book.seo.description,
    keywords: book.seo.keywords,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const related = await getRelatedBooks(book.relatedBooks);
  const author = await getAuthorBySlug(authorNameToSlug(book.author));
  let bookActions = { favorite: false, read: false, wishlist: false, isSignedIn: false };
  try {
    bookActions = await getUserBookActions(slug);
  } catch {
    // Supabase not configured or tables don't exist yet
  }

  const yearDisplay =
    book.publicationYear < 0 ? `${Math.abs(book.publicationYear)} BCE` : book.publicationYear;

  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <article className="mx-auto max-w-5xl flex-1 px-4 py-10">
        <Link href="/books" className="text-sm text-muted hover:text-gold transition-colors">
          ← Back to Canon
        </Link>

        {/* Book header — same style as author page */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Author photo — square with rounded corners, from public/authors */}
          <div className="shrink-0">
            {author ? (
              <Link
                href={`/authors/${author.slug}`}
                className="block hover:opacity-90 transition-opacity"
              >
                <AuthorImage
                  src={author.image ?? authorSlugToImagePath(author.slug)}
                  alt={book.author}
                  name={book.author}
                  width={160}
                  height={160}
                  className="rounded-lg object-cover"
                />
              </Link>
            ) : (
                <AuthorImage
                src={authorSlugToImagePath(authorNameToSlug(book.author))}
                alt={book.author}
                name={book.author}
                width={160}
                height={160}
                className="rounded-lg object-cover"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold md:text-3xl">{book.title}</h1>
            {book.originalTitle && (
              <p className="mt-1 text-sm text-muted2">{book.originalTitle}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted2">
              {author ? (
                <Link
                  href={`/authors/${author.slug}`}
                  className="hover:text-gold transition-colors"
                >
                  {book.author}
                </Link>
              ) : (
                <span>{book.author}</span>
              )}
              <span>·</span>
              <span>{book.civilization}</span>
              {book.countryOfOrigin && (
                <>
                  <span>·</span>
                  <span>{book.countryOfOrigin}</span>
                </>
              )}
              <span>·</span>
              <span>{book.era}</span>
              <span>·</span>
              <span>{yearDisplay}</span>
              <span>·</span>
              <span>{book.language}</span>
              {book.difficulty && (
                <>
                  <span>·</span>
                  <span>{book.difficulty}</span>
                </>
              )}
              {book.readingTimeMinutes > 0 && (
                <>
                  <span>·</span>
                  <span>
                    {book.readingTimeMinutes >= 60
                      ? `${Math.floor(book.readingTimeMinutes / 60)}h read`
                      : `${book.readingTimeMinutes} min read`}
                  </span>
                </>
              )}
              {book.summaryReadingTimeMinutes > 0 && (
                <>
                  <span>·</span>
                  <span>~{book.summaryReadingTimeMinutes} min summary</span>
                </>
              )}
            </div>
            <div className="mt-4">
              <BookActions
                bookSlug={slug}
                initialFavorite={bookActions.favorite}
                initialRead={bookActions.read}
                initialWishlist={bookActions.wishlist}
                isSignedIn={bookActions.isSignedIn}
              />
            </div>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {book.shortDescription}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <BookPageContent book={book} related={related} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
