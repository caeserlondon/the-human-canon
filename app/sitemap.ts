import { createClient } from '@supabase/supabase-js'
import type { MetadataRoute } from 'next'

type CanonBookRow = {
	slug: string
	updated_at: string | null
	data: {
		status?: string
	} | null
}

type CanonAuthorRow = {
	slug: string
	updated_at: string | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://the-human-canon.vercel.app'

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}/`,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/books`,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/authors`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/public-domain`,
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/contact`,
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/privacy`,
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `${baseUrl}/terms`,
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	]

	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	)

	const [
		{ data: books, error: booksError },
		{ data: authors, error: authorsError },
	] = await Promise.all([
		supabase.from('canon_books').select('slug, updated_at, data'),
		supabase.from('canon_authors').select('slug, updated_at'),
	])

	if (booksError) {
		console.error('Sitemap Supabase books error:', booksError)
	}

	if (authorsError) {
		console.error('Sitemap Supabase authors error:', authorsError)
	}

	const publishedBookRoutes: MetadataRoute.Sitemap = (
		(books ?? []) as CanonBookRow[]
	)
		.filter((book) => book.data?.status === 'published')
		.map((book) => ({
			url: `${baseUrl}/books/${book.slug}`,
			...(book.updated_at ? { lastModified: new Date(book.updated_at) } : {}),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		}))

	const authorRoutes: MetadataRoute.Sitemap = (
		(authors ?? []) as CanonAuthorRow[]
	).map((author) => ({
		url: `${baseUrl}/authors/${author.slug}`,
		...(author.updated_at ? { lastModified: new Date(author.updated_at) } : {}),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}))

	return [...staticRoutes, ...publishedBookRoutes, ...authorRoutes]
}
