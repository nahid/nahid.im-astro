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
		draft: z.boolean().default(false),
		// Most posts are Bengali; English posts must opt in with lang: 'en'.
		lang: z.enum(['bn', 'en']).default('bn'),
	}),
});

export const collections = { diaries };
