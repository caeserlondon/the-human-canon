'use client'

import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function AuthNav() {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const supabase = createClient()
		supabase.auth.getUser().then(({ data: { user } }) => {
			setUser(user)
			setLoading(false)
		})
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
		})
		return () => subscription.unsubscribe()
	}, [])

	const handleSignOut = async () => {
		const supabase = createClient()
		await supabase.auth.signOut()
		router.push('/')
		router.refresh()
	}

	if (loading) return null

	if (user) {
		return (
			<>
				<Link href='/dashboard' className='nav-link transition-colors text-sm'>
					My books
				</Link>
				<button
					onClick={handleSignOut}
					className='nav-link hover:text-text text-sm transition-colors bg-transparent border-none cursor-pointer'
				>
					Sign out
				</button>
			</>
		)
	}

	return (
		<div className='relative group'>
			<Link
				href='/sign-in'
				className='text-sm nav-link transition-colors'
				aria-haspopup='true'
			>
				Sign in
			</Link>
			<div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 top-full mt-1 pt-1 min-w-[180px]'>
				<div className='hc-card border border-border rounded-lg shadow-lg py-2 px-3'>
					<Link
						href='/sign-in'
						className='block w-full rounded bg-gold py-2 text-center text-sm font-semibold text-bg hover:bg-gold2 transition-colors'
					>
						Sign in
					</Link>
					<p className='mt-2 text-xs text-muted text-center'>
						New user?{' '}
						<Link
							href='/sign-up'
							className='text-gold hover:text-gold2 font-medium'
						>
							Start here
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
