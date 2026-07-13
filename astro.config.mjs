// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nahid.im',
	markdown: {
		shikiConfig: {
			// Astro's default is github-dark, which inlines a near-black background
			// and puts a slab of night in the middle of a cream broadsheet. A light
			// theme keeps code ink-on-paper; global.css then repaints its background
			// to --paper-shade so it matches the rest of the design system.
			theme: 'github-light',
		},
	},
	// Fonts are self-hosted via public/fonts/fonts.css (@font-face, font-display: swap).
	integrations: [
		mdx(),
		sitemap({
			// The dev-only type specimen must never reach production sitemaps/crawlers.
			filter: (page) => !page.includes('/dev/'),
		}),
	],
});
