'use client'

import {
	toggleFavorite,
	toggleRead,
	toggleWishlist,
} from '@/lib/actions/book-actions'
import { BookCheck, Bookmark, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BookActionsProps {
	bookSlug: string
	initialFavorite: boolean
	initialRead: boolean
	initialWishlist: boolean
	isSignedIn: boolean
}

export function BookActions({
	bookSlug,
	initialFavorite,
	initialRead,
	initialWishlist,
	isSignedIn,
}: BookActionsProps) {
	const router = useRouter()
	const [favorite, setFavorite] = useState(initialFavorite)
	const [read, setRead] = useState(initialRead)
	const [wishlist, setWishlist] = useState(initialWishlist)

	const handleFavorite = async () => {
		if (!isSignedIn) {
			router.push(`/sign-in?next=/books/${bookSlug}`)
			return
		}

		const result = await toggleFavorite(bookSlug)

		if ('success' in result && result.success) {
			setFavorite(result.active)
		}
	}

	const handleRead = async () => {
		if (!isSignedIn) {
			router.push(`/sign-in?next=/books/${bookSlug}`)
			return
		}

		const result = await toggleRead(bookSlug)

		if ('success' in result && result.success) {
			setRead(result.active)
		}
	}

	const handleWishlist = async () => {
		if (!isSignedIn) {
			router.push(`/sign-in?next=/books/${bookSlug}`)
			return
		}

		const result = await toggleWishlist(bookSlug)

		if ('success' in result && result.success) {
			setWishlist(result.active)
		}
	}

	if (!isSignedIn) {
		return (
			<div className='flex flex-wrap gap-2'>
				<Link
					href={`/sign-in?next=/books/${bookSlug}`}
					className='inline-flex items-center gap-2 rounded border border-border bg-panel px-3 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-gold'
				>
					<Heart className='size-4' />
					Sign in to save books
				</Link>
			</div>
		)
	}

	return (
		<div className='flex flex-wrap gap-2'>
			<button
				type='button'
				onClick={handleFavorite}
				className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
					favorite
						? 'border-gold bg-gold/20 text-gold'
						: 'border-border bg-panel text-muted hover:border-gold hover:text-gold'
				}`}
				title={favorite ? 'Remove from favorites' : 'Add to favorites'}
			>
				<Heart className={`size-4 ${favorite ? 'fill-current' : ''}`} />
				{favorite ? 'Favorited' : 'Favorite'}
			</button>

			<button
				type='button'
				onClick={handleRead}
				className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
					read
						? 'border-gold bg-gold/20 text-gold'
						: 'border-border bg-panel text-muted hover:border-gold hover:text-gold'
				}`}
				title={read ? 'Mark as unread' : 'Mark as read'}
			>
				<BookCheck className={`size-4 ${read ? 'fill-current' : ''}`} />
				{read ? 'Read' : 'Mark read'}
			</button>

			<button
				type='button'
				onClick={handleWishlist}
				className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors ${
					wishlist
						? 'border-gold bg-gold/20 text-gold'
						: 'border-border bg-panel text-muted hover:border-gold hover:text-gold'
				}`}
				title={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
			>
				<Bookmark className={`size-4 ${wishlist ? 'fill-current' : ''}`} />
				{wishlist ? 'In wishlist' : 'Wishlist'}
			</button>
		</div>
	)
}
