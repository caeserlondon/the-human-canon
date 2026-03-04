export interface CanonBook {
	id: string
	slug: string
	title: string
	originalTitle?: string
	author: string
	authorBirthYear?: number
	authorDeathYear?: number
	civilization: string
	countryOfOrigin: string
	era: string
	publicationYear: number
	language: string

	coverImage?: string
	heroImage?: string

	canonicalScore: number // internal authority metric (0–100)
	difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
	readingTimeMinutes: number
	summaryReadingTimeMinutes: number

	themes: string[]
	tags: string[]
	categories: string[]

	recommendedFor: string[]

	shortDescription: string
	metaDescription: string

	summaryShort: string //  ~3 min read

	keyIdeas: {
		title: string
		explanation: string
	}[]

	notableQuotes: string[]

	whyItMattersToday: string

	relatedBooks: (string | { slug: string; relation?: string })[]

	seo: {
		title: string
		description: string
		keywords: string[]
	}

	status: 'published'
}
