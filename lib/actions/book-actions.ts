'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type ToggleTable = 'favorites' | 'read_status' | 'wishlist'

type ToggleResult = { success: true; active: boolean } | { error: string }

const TABLE_LABELS: Record<ToggleTable, string> = {
	favorites: 'favorites',
	read_status: 'read status',
	wishlist: 'wishlist',
}

async function toggleBookState(
	table: ToggleTable,
	bookSlug: string,
): Promise<ToggleResult> {
	const slug = bookSlug.trim()

	if (!slug) {
		return { error: 'Invalid book slug' }
	}

	const supabase = await createClient()

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (userError || !user) {
		return { error: 'Not signed in' }
	}

	const { data: existing, error: selectError } = await supabase
		.from(table)
		.select('id')
		.eq('user_id', user.id)
		.eq('book_slug', slug)
		.maybeSingle()

	if (selectError) {
		return { error: `Failed to check ${TABLE_LABELS[table]}` }
	}

	if (existing) {
		const { error: deleteError } = await supabase
			.from(table)
			.delete()
			.eq('id', existing.id)

		if (deleteError) {
			return { error: `Failed to remove from ${TABLE_LABELS[table]}` }
		}

		revalidatePath('/')
		revalidatePath('/books')
		revalidatePath(`/books/${slug}`)

		return { success: true, active: false }
	}

	const { error: insertError } = await supabase.from(table).insert({
		user_id: user.id,
		book_slug: slug,
	})

	if (insertError) {
		return { error: `Failed to add to ${TABLE_LABELS[table]}` }
	}

	revalidatePath('/')
	revalidatePath('/books')
	revalidatePath(`/books/${slug}`)

	return { success: true, active: true }
}

export async function toggleFavorite(bookSlug: string): Promise<ToggleResult> {
	return toggleBookState('favorites', bookSlug)
}

export async function toggleRead(bookSlug: string): Promise<ToggleResult> {
	return toggleBookState('read_status', bookSlug)
}

export async function toggleWishlist(bookSlug: string): Promise<ToggleResult> {
	return toggleBookState('wishlist', bookSlug)
}
