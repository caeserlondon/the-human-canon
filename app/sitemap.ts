import { MetadataRoute } from "next";
import { getAllBooks } from "@/lib/books";
import { getAllAuthors } from "@/lib/authors";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thehumancanon.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allBooks, allAuthors] = await Promise.all([getAllBooks(), getAllAuthors()]);
  const books = allBooks.map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const authors = allAuthors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/books`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...books,
    { url: `${baseUrl}/authors`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...authors,
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/public-domain`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/sign-in`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/sign-up`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
