import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ["var(--font-serif)", "Georgia", "serif"],
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
			},
			colors: {
				bg: 'rgb(var(--bg) / <alpha-value>)',
				bg2: 'rgb(var(--bg-2) / <alpha-value>)',
				panel: 'rgb(var(--panel) / <alpha-value>)',
				panel2: 'rgb(var(--panel-2) / <alpha-value>)',
				text: 'rgb(var(--text) / <alpha-value>)',
				muted: 'rgb(var(--muted) / <alpha-value>)',
				muted2: 'rgb(var(--muted-2) / <alpha-value>)',
				border: 'rgb(var(--border) / <alpha-value>)',
				borderSoft: 'rgb(var(--border-soft) / <alpha-value>)',
				gold: 'rgb(var(--gold) / <alpha-value>)',
				gold2: 'rgb(var(--gold-2) / <alpha-value>)',
				parchment: 'rgb(var(--parchment) / <alpha-value>)',
			},
			borderRadius: {
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
			},
			boxShadow: {
				soft: 'var(--shadow-soft)',
			},
		},
	},
	plugins: [],
};

export default config;
