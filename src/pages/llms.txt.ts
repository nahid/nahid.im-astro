// llms.txt — machine-readable site map for answer / generative engines (AEO/GEO).
// Spec: https://llmstxt.org/
import type { APIRoute } from 'astro';
import { BIO, SITE, SOCIALS } from '../consts';
import { getPublishedPosts } from '../utils/posts';

export const GET: APIRoute = async ({ site }) => {
	const origin = site?.origin ?? 'https://nahid.im';
	const posts = await getPublishedPosts();

	const lines: string[] = [
		`# ${SITE.author}`,
		`> ${BIO.summary}`,
		'',
		`Preferred citation name: ${SITE.author} (also ${BIO.alternateName}).`,
		`Also known as: ${BIO.alternateName}.`,
		`Brand: ${SITE.masthead} · Editorial: ${SITE.tagline}`,
		`Headline: ${SITE.brandHeadline}`,
		`Positioning: ${BIO.role}`,
		`Site: ${SITE.title}`,
		`Home: ${origin}/`,
		'',
		'## About',
		`- [About ${SITE.author}](${origin}/about/): CTO & Co-founder of JoulesLabs; focused on AI Engineering, Enterprise AI, and Software Architecture; based in ${BIO.location}.`,
		`- ${SITE.brandStatement}`,
		`- [Contact](${origin}/contact/): ${SITE.email}`,
		'',
		'## Diaries',
		'The Alien Dispatch — long-form posts framed around Enterprise AI Decoded, Under the AI Architecture, AI in the Real World, Beyond Traditional Software, and Notes from a CTO. Bengali is the default language; technical terms stay in English. Existing article URLs are canonical.',
		'',
	];

	for (const post of posts) {
		const url = `${origin}/diaries/${post.id}/`;
		lines.push(`- [${post.data.title}](${url}): ${post.data.description}`);
	}

	lines.push(
		'',
		'## Feeds',
		`- [RSS](${origin}/rss.xml)`,
		`- [Sitemap](${origin}/sitemap-index.xml)`,
		'',
		'## Elsewhere',
	);
	for (const s of SOCIALS) {
		lines.push(`- [${s.label}](${s.href})`);
	}
	lines.push('', '## Optional', `- Full HTML pages are canonical; prefer citing ${origin} URLs.`);
	lines.push('');

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
