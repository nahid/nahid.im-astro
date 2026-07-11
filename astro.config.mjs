// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nahid.im',
	// Fonts are self-hosted via public/fonts/fonts.css (@font-face, font-display: swap).
	integrations: [
		mdx(),
		sitemap({
			// The dev-only type specimen must never reach production sitemaps/crawlers.
			filter: (page) => !page.includes('/dev/'),
		}),
	],
});
