'use client'

import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthNav } from './auth-nav'
import { RollLink } from './roll-link'
import { ThemeToggle } from './theme-toggle'
interface HeaderProps {
	variant?: 'default' | 'transparent'
}

export function Header({ variant = 'default' }: HeaderProps) {
	const router = useRouter()
	const [query, setQuery] = useState('')

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (query.trim()) {
			router.push(`/books?q=${encodeURIComponent(query.trim())}`)
		}
	}

	const isTransparent = variant === 'transparent'

	return (
		<header
			data-testid='header'
			className={`sticky top-0 z-20 ${
				isTransparent
					? 'bg-transparent border-none shadow-none'
					: 'border-b border-border bg-bg2'
			}`}
		>
			<div className='mx-auto flex max-w-7xl items-center gap-6 px-4 py-3'>
				<Link href='/' className='shrink-0 flex items-center'>
					<Image
						src={logo}
						alt='The Human Canon'
						width={62}
						height={58}
						className='h-[58px] w-auto'
						priority
					/>
				</Link>

				{/* Nav */}
				<nav
					data-testid='nav'
					className='flex flex-1 flex-wrap items-center gap-4 text-sm text-[rgb(var(--nav-link))]'
				>
					<RollLink
						href='/'
						className='nav-link text-[rgb(var(--nav-link))] transition-colors hover:text-[rgb(var(--nav-link-hover))]'
					>
						Home
					</RollLink>
					<RollLink
						href='/books'
						className='nav-link text-[rgb(var(--nav-link))] transition-colors hover:text-[rgb(var(--nav-link-hover))]'
					>
						Books
					</RollLink>
					<RollLink
						href='/authors'
						className='nav-link text-[rgb(var(--nav-link))] transition-colors hover:text-[rgb(var(--nav-link-hover))]'
					>
						Authors
					</RollLink>

					{/* Search bar */}
					<form onSubmit={handleSearch} className='max-w-xs'>
						<div className='relative'>
							<input
								data-testid='search-input'
								type='search'
								placeholder='Search...'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className='w-full rounded bg-panel border border-border px-4 py-2 pl-10 text-sm text-text placeholder:text-muted2 focus:border-gold focus:outline-none'
							/>
							<svg
								className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted2'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</div>
					</form>

					<RollLink href='/about' className='nav-link transition-colors'>
						About
					</RollLink>
					<RollLink href='/privacy' className='nav-link transition-colors'>
						Privacy
					</RollLink>
					<RollLink href='/terms' className='nav-link transition-colors'>
						Terms
					</RollLink>
					<RollLink href='/contact' className='nav-link transition-colors'>
						Contact
					</RollLink>
					<RollLink
						href='/public-domain'
						className='nav-link transition-colors'
					>
						Public Domain
					</RollLink>
					<AuthNav />
					<ThemeToggle />
				</nav>
			</div>
		</header>
	)
}
