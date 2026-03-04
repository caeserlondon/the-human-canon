'use client'

import type { CanonBook } from '@/lib/books'
import Link from 'next/link'
import { AccordionItem } from './accessible-accordion'

function SummaryMarkdown({ text }: { text: string }) {
	const paragraphs = text.split(/\n\n+/)
	return (
		<div className='space-y-4'>
			{paragraphs.map((p, i) => (
				<p key={i} className='leading-relaxed text-muted'>
					{p.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, j) => {
						if (part.startsWith('**') && part.endsWith('**'))
							return <strong key={j}>{part.slice(2, -2)}</strong>
						if (part.startsWith('*') && part.endsWith('*'))
							return <em key={j}>{part.slice(1, -1)}</em>
						return <span key={j}>{part}</span>
					})}
				</p>
			))}
		</div>
	)
}

interface BookPageContentProps {
	book: CanonBook
	related: { book: CanonBook; relation?: string }[]
}

export function BookPageContent({ book, related }: BookPageContentProps) {
	const tocItems = [
		{ id: 'summary', label: 'Summary' },
		{ id: 'key-ideas', label: 'Key ideas' },
		...(book.notableQuotes.length > 0
			? [{ id: 'quotes', label: 'Notable quotes' }]
			: []),
		{ id: 'why-matters', label: 'Why it matters today' },
		...(book.recommendedFor?.length ? [{ id: 'recommended', label: 'Recommended for' }] : []),
		{ id: 'themes', label: 'Themes & tags' },
		...(related.length > 0 ? [{ id: 'related', label: 'Related books' }] : []),
	]

	return (
		<div className='flex flex-col gap-10 lg:flex-row lg:gap-12'>
			{/* Main content — reading width constrained per research */}
			<div className='min-w-0 flex-1'>
				<section id='summary' className='mt-10 scroll-mt-24'>
					<h2 className='text-lg font-bold'>Summary</h2>
					<div className='mt-4 max-w-[65ch]'>
						<SummaryMarkdown text={book.summaryShort} />
					</div>
				</section>

				<section id='key-ideas' className='mt-10 scroll-mt-24'>
					<h2 className='text-lg font-bold'>Key ideas</h2>
					<div className='mt-4 space-y-2'>
						{book.keyIdeas.map((idea) => (
							<AccordionItem key={idea.title} title={idea.title}>
								{idea.explanation}
							</AccordionItem>
						))}
					</div>
				</section>

				{book.notableQuotes.length > 0 && (
					<section id='quotes' className='mt-10 scroll-mt-24'>
						<h2 className='text-lg font-bold'>Notable quotes</h2>
						<ul className='mt-4 max-w-[65ch] space-y-3'>
							{book.notableQuotes.map((quote) => (
								<li
									key={quote}
									className='border-l-2 border-gold pl-4 text-muted italic'
								>
									&ldquo;{quote}&rdquo;
								</li>
							))}
						</ul>
					</section>
				)}

				<section id='why-matters' className='mt-10 scroll-mt-24'>
					<h2 className='text-lg font-bold'>Why it matters today</h2>
					<div className='mt-4 max-w-[65ch]'>
						<p className='leading-relaxed text-muted'>
							{book.whyItMattersToday}
						</p>
					</div>
				</section>

				{book.recommendedFor?.length ? (
					<section id='recommended' className='mt-10 scroll-mt-24'>
						<h2 className='text-lg font-bold'>Recommended for</h2>
						<ul className='mt-4 max-w-[65ch] space-y-2'>
							{book.recommendedFor.map((audience) => (
								<li key={audience} className='flex items-start gap-2 text-muted'>
									<span className='mt-1.5 size-1.5 shrink-0 rounded-full bg-gold' />
									<span>{audience}</span>
								</li>
							))}
						</ul>
					</section>
				) : null}

				<section id='themes' className='mt-10 scroll-mt-24'>
					<h2 className='text-lg font-bold'>Themes & tags</h2>
					<div className='mt-4 flex flex-wrap gap-2'>
						{book.themes.map((theme) => (
							<span key={theme} className='hc-badge'>
								{theme}
							</span>
						))}
						{book.categories?.map((cat) => (
							<span key={cat} className='hc-badge'>
								{cat}
							</span>
						))}
						{book.tags.map((tag) => (
							<span key={tag} className='hc-chip px-3 py-1 text-xs text-muted2'>
								{tag}
							</span>
						))}
					</div>
				</section>

				{related.length > 0 && (
					<section id='related' className='mt-10 scroll-mt-24'>
						<h2 className='text-lg font-bold'>Related books</h2>
						<div className='mt-4 flex flex-wrap gap-6'>
							{related.map(({ book: r, relation }) => (
								<Link
									key={r.id}
									href={`/books/${r.slug}`}
									className='group block max-w-[200px] rounded border border-border bg-panel p-3 transition-colors hover:border-gold'
								>
									<span className='text-xs font-medium text-gold'>
										{relation ?? 'Related'}
									</span>
									<h3 className='mt-1 font-semibold text-text group-hover:text-gold transition-colors'>
										{r.title}
									</h3>
									<p className='mt-0.5 text-sm text-muted'>{r.author}</p>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>

			{/* On this page — TOC */}
			<aside className='shrink-0 lg:w-48'>
				<nav aria-label='On this page' className='sticky top-24'>
					<h3 className='text-xs font-semibold uppercase tracking-wide text-muted2'>
						On this page
					</h3>
					<ul className='mt-3 space-y-2'>
						{tocItems.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									className='text-sm text-muted hover:text-gold transition-colors'
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</div>
	)
}
