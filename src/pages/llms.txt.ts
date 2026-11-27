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
		`Site: ${SITE.title}`,
		`Home: ${origin}/`,
		'',
		'## About',
		`- [About ${SITE.author}](${origin}/about/): CTO & co-founder of JoulesLabs; software architect and open-source contributor based in ${BIO.location}.`,
		`- [Contact](${origin}/contact/): ${SITE.email}`,
		'',
		'## Diaries',
		'Long-form posts on software, AI engineering, PHP/Laravel, productivity, and business. Bengali is the default language; technical terms stay in English.',
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
