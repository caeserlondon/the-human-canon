import type { Metadata } from 'next'
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const serif = Libre_Baskerville({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-serif',
	display: 'swap',
})

const sans = Source_Sans_3({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'The Human Canon — The greatest books ever written, distilled',
	description:
		'A curated digital institution dedicated to the most important books in human history. Across civilizations. Across centuries.',
	icons: {
		icon: '/favicon.ico',
	},
	openGraph: {
		title: 'The Human Canon',
		description: 'The greatest books ever written — distilled for modern life.',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' data-theme='dark' suppressHydrationWarning>
			<body
				className={`${serif.variable} ${sans.variable} font-sans antialiased`}
			>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                var theme = localStorage.getItem('theme');
                var initial = theme || 'dark';
                document.documentElement.setAttribute('data-theme', initial);
              })();
            `,
					}}
				/>
				{children}
			</body>
		</html>
	)
}
