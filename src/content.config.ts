import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One diary post per .md/.mdx in src/content/diaries/. `npm run build` validates
// every post against this schema — it is the content linter (see CLAUDE.md).
const diaries = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/diaries' }),
	schema: z.object({
		title: z.string(),
		description: z.string().max(200),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.enum([
			'ai',
			'business',
			'operation',
			'productivity',
			'software-development',
			'laravel',
			'php',
			'programming',
			'tips',
			'whats-new',
			'whats-new-in-php',
		]),
		tags: z.array(z.string()).default([]),
		// Path under public/images/, e.g. /images/foo.jpg. ASCII only.
		heroImage: z.string().optional(),
		// Alt text + italic caption for heroImage. Falls back to title if omitted.
		heroImageAlt: z.string().optional(),
		draft: z.boolean().default(false),
		// Most posts are Bengali; English posts must opt in with lang: 'en'.
		lang: z.enum(['bn', 'en']).default('bn'),
		/** Short bullets for AEO answer boxes — keep claims grounded in the body. */
		keyTakeaways: z.array(z.string().min(8).max(220)).max(6).default([]),
		/** FAQ pairs → visible section + FAQPage JSON-LD for answer engines. */
		faq: z
			.array(
				z.object({
					question: z.string().min(8).max(180),
					answer: z.string().min(24).max(500),
				}),
			)
			.max(8)
			.default([]),
	}),
});

export const collections = { diaries };
