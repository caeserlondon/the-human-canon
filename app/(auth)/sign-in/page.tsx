'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function SignInForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const next = searchParams.get('next') ?? '/'
	const errorParam = searchParams.get('error')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(
		errorParam === 'auth'
			? 'Google sign-in failed. Please check your configuration and try again.'
			: null,
	)
	const [loading, setLoading] = useState(false)

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			const supabase = createClient()
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) throw error
			router.push(next)
			router.refresh()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleSignIn = async () => {
		setError(null)
		setLoading(true)
		try {
			const supabase = createClient()
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
				},
			})
			if (error) throw error
			if (data?.url) {
				window.location.href = data.url
				return
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong')
			setLoading(false)
		}
	}

	return (
		<main className='hc-bg flex min-h-screen flex-col'>
			<Header />
			<div className='mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16'>
				<h1 className='text-2xl font-bold'>Sign in</h1>
				<p className='mt-2 text-sm text-muted'>
					Mark books as favorites, read, or add to your wishlist.
				</p>
				<button
					type='button'
					onClick={handleGoogleSignIn}
					disabled={loading}
					className='mt-8 flex w-full items-center justify-center gap-2 rounded border border-border bg-panel py-2.5 text-sm font-medium text-text hover:bg-panel2 transition-colors disabled:opacity-50'
				>
					<svg className='size-5 shrink-0' viewBox='0 0 24 24'>
						<path
							fill='#4285F4'
							d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
						/>
						<path
							fill='#34A853'
							d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
						/>
						<path
							fill='#FBBC05'
							d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
						/>
						<path
							fill='#EA4335'
							d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
						/>
					</svg>
					{loading ? 'Redirecting...' : 'Continue with Google'}
				</button>
				<div className='relative my-6'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-border' />
					</div>
					<div className='relative flex justify-center text-xs'>
						<span className='bg-bg px-2 text-muted2'>or</span>
					</div>
				</div>
				<form
					data-testid='sign-in-form'
					onSubmit={handleSignIn}
					className='w-full space-y-4'
				>
					<div>
						<label
							htmlFor='email'
							className='mb-1 block text-sm font-medium text-muted'
						>
							Email
						</label>
						<input
							data-testid='sign-in-email'
							id='email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='w-full rounded bg-panel border border-border px-4 py-2 text-text placeholder:text-muted2 focus:border-gold focus:outline-none'
							placeholder='you@example.com'
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='mb-1 block text-sm font-medium text-muted'
						>
							Password
						</label>
						<input
							data-testid='sign-in-password'
							id='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='w-full rounded bg-panel border border-border px-4 py-2 text-text placeholder:text-muted2 focus:border-gold focus:outline-none'
						/>
					</div>
					{error && <p className='text-sm text-red-400'>{error}</p>}
					<button
						type='submit'
						disabled={loading}
						className='w-full rounded bg-gold py-2 font-semibold text-bg hover:bg-gold2 disabled:opacity-50'
					>
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>
				<p className='mt-6 text-sm text-muted'>
					Don&apos;t have an account?{' '}
					<Link
						href='/sign-up'
						className='text-gold hover:text-gold2 font-medium'
					>
						Sign up
					</Link>
				</p>
			</div>
			<Footer />
		</main>
	)
}

export default function SignInPage() {
	return (
		<Suspense
			fallback={
				<main className='hc-bg flex min-h-screen flex-col'>
					<Header />
					<div className='mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16'>
						<div className='h-8 w-48 animate-pulse rounded bg-panel' />
					</div>
					<Footer />
				</main>
			}
		>
			<SignInForm />
		</Suspense>
	)
}
