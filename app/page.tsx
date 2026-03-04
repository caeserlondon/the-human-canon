import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { AuthorImage } from "@/components/author-image";
import { authorSlugToImagePath } from "@/lib/authors/image-path";
import { FaqAccordion } from "@/components/faq-accordion";

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
import { Footer } from "@/components/footer";
import { getBooksBySlugs } from "@/lib/books";

const POPULAR_BOOK_SLUGS = [
  "apology-plato",
  "meditations-marcus-aurelius",
  "enchiridion-epictetus",
  "the-prince-machiavelli",
  "the-art-of-war-sun-tzu",
  "on-liberty-john-stuart-mill",
  "essays-moral-and-political-hume",
  "the-republic-plato",
  "nicomachean-ethics-aristotle",
  "the-wealth-of-nations-adam-smith",
  "discourse-on-method-descartes",
  "essays-emerson",
] as const;

export default async function HomePage() {
  const featuredBooks = await getBooksBySlugs([...POPULAR_BOOK_SLUGS]);
  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <div className="flex-1">
      {/* Hero — full-width image with navbar on top */}
      <section className="relative w-full">
        {/* Background image: 100% width, auto height, no cropping */}
        <Image
          src="/school-of-athens.jpg"
          alt=""
          width={1920}
          height={1080}
          className="block w-full h-auto"
          priority
          sizes="100vw"
        />

        {/* Dark mode overlay — between image and content */}
        <div className="hero-overlay" aria-hidden />

        {/* Navbar — floating on top of image */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <Header variant="transparent" />
        </div>

        {/* Hero content — over image */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl w-full px-4">
            <div className="max-w-2xl hero-content">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl text-text">
                The greatest books ever written — distilled.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted hero-subtitle">
                A curated digital institution for timeless works across civilizations and centuries—
                rewritten with modern clarity for people who want depth, not fluff.
              </p>
              <div className="mt-7">
                <Link
                  href="/books"
                  className="inline-block rounded bg-gold px-5 py-3 text-sm font-semibold text-black hover:bg-gold2 transition-colors"
                >
                  Explore the Canon
                </Link>
              </div>
          </div>
          </div>
        </div>
      </section>

      {/* Featured shelf — IMDb-style grid */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-xl font-bold">Popular in the Canon</h2>
        <p className="mt-2 text-sm text-muted">
          A small rotating shelf for first-time visitors.
        </p>
        {featuredBooks.length === 0 ? (
          <div className="hc-card mt-6 p-12 text-center">
            <p className="text-muted">The canon is being built. Check back soon.</p>
          </div>
        ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {featuredBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              className="group hc-card-grid flex items-start gap-3 rounded-lg border border-panel2 bg-panel p-4 hover:border-gold/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-text group-hover:text-gold transition-colors">
                  {book.title}
                </h3>
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

      {/* FAQ — accessible accordions per WAI-ARIA */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-xl font-bold">FAQ</h2>
        <div className="mt-6">
          <FaqAccordion />
        </div>
      </section>
      </div>

      <Footer />
    </main>
  );
}
