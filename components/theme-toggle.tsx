'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		const current = document.documentElement.getAttribute('data-theme') as
			| 'dark'
			| 'light'
			| null
		setTheme(current === 'light' ? 'light' : 'dark')
	}, [])

	const toggle = () => {
		const next = theme === 'dark' ? 'light' : 'dark'
		setTheme(next)
		document.documentElement.setAttribute('data-theme', next)
		localStorage.setItem('theme', next)
	}

	if (!mounted) return null

	return (
		<button
			type='button'
			onClick={toggle}
			className='flex size-8 items-center justify-center text-[rgb(var(--nav-icon))] hover:text-[rgb(var(--nav-link-hover))] transition-colors'
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
		>
			{theme === 'dark' ? (
				<Moon className='size-5' aria-hidden />
			) : (
				<Sun className='size-5' aria-hidden />
			)}
		</button>
	)
}
