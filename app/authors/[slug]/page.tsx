import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AuthorImage } from "@/components/author-image";
import { getAuthorImagePath } from "@/lib/authors/image-path";
import { getAuthorBySlug, getAllAuthors } from "@/lib/authors";
import { Footer } from "@/components/footer";
import { getBookBySlug } from "@/lib/books";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Not Found" };
  return {
    title: author.seo.title,
    description: author.seo.description,
    keywords: author.seo.keywords,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const yearDisplay = (year: number) =>
    year < 0 ? `${Math.abs(year)} BCE` : year.toString();

  const books = (
    await Promise.all(author.bookSlugs.map((s) => getBookBySlug(s)))
  ).filter((b): b is NonNullable<typeof b> => b != null);

  return (
    <main className="hc-bg flex min-h-screen flex-col">
      <Header />

      <article className="mx-auto max-w-3xl flex-1 px-4 py-10">
        <Link
          href="/authors"
          className="text-sm text-muted hover:text-gold transition-colors"
        >
          ← Back to Authors
        </Link>

        {/* Author header */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <AuthorImage
              src={getAuthorImagePath(author)}
              alt={author.name}
              name={author.name}
              width={160}
              height={160}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold md:text-3xl">{author.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted2">
              <span>{author.civilization}</span>
              <span>·</span>
              <span>{author.era}</span>
              <span>·</span>
              <span>{author.region}</span>
              {(author.birthYear || author.deathYear) && (
                <>
                  <span>·</span>
                  <span>
                    {author.birthYear != null && yearDisplay(author.birthYear)}
                    {author.birthYear != null && author.deathYear != null && " – "}
                    {author.deathYear != null && yearDisplay(author.deathYear)}
                  </span>
                </>
              )}
            </div>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {author.briefHistory}
            </p>
          </div>
        </div>

        {/* Key facts */}
        {author.keyFacts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Key facts</h2>
            <ul className="mt-4 space-y-2">
              {author.keyFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-muted"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Early life */}
        {author.earlyLife && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Early life</h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {author.earlyLife}
            </p>
          </section>
        )}

        {/* Rise to prominence */}
        {author.riseToProminence && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Rise to prominence</h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {author.riseToProminence}
            </p>
          </section>
        )}

        {/* Religion */}
        {author.religion && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Religion & philosophy</h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {author.religion}
            </p>
          </section>
        )}

        {/* Challenges */}
        {author.challenges && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Challenges</h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {author.challenges}
            </p>
          </section>
        )}

        {/* Legacy */}
        <section className="mt-10">
          <h2 className="text-lg font-bold">Legacy</h2>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
            {author.legacy}
          </p>
        </section>

        {/* Death and succession */}
        {author.deathAndSuccession && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Death and succession</h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">
              {author.deathAndSuccession}
            </p>
          </section>
        )}

        {/* Books in the canon */}
        {books.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold">Works in the canon</h2>
            <ul className="mt-4 space-y-2">
              {books.map((book) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.slug}`}
                    className="text-gold hover:text-gold2 font-medium transition-colors"
                  >
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
