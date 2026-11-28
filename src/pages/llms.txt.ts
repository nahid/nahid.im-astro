// llms.txt — machine-readable site map for answer / generative engines (AEO/GEO).
// Spec: https://llmstxt.org/
import type { APIRoute } from 'astro';
import {
	ACHIEVEMENTS,
	BIO,
	EXPERTISE,
	OPEN_SOURCE,
	SITE,
	SOCIALS,
	SPEAKING_MEDIA,
} from '../consts';
import { getPublishedPosts } from '../utils/posts';

/** One physical line — strip CR/LF/Unicode separators so list items never glue together. */
function oneLine(value: string): string {
	return value.replace(/[\s\u2028\u2029]+/gu, ' ').trim();
}

export const GET: APIRoute = async ({ site }) => {
	const origin = site?.origin ?? 'https://nahid.im';
	const posts = await getPublishedPosts();

	const lines: string[] = [
		`# ${SITE.author}`,
		`> ${oneLine(BIO.summary)}`,
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
		`- Laravel open-source creator (Talk, JSONQ, QArray, Presento, Permit) and Enterprise AI architect in ${BIO.location}.`,
		`- [Contact](${origin}/contact/): ${SITE.email}`,
		'',
		'## Areas of Expertise',
		'Three pillars of practice — Enterprise AI, AI Engineering, and Software Architecture.',
		'',
	];

	for (const pillar of EXPERTISE) {
		lines.push(`- ${pillar.title}: ${pillar.items.join('; ')}.`);
	}

	lines.push('', '## Open Source', `Packages at [GitHub @nahid](https://github.com/nahid):`, '');
	for (const p of OPEN_SOURCE) {
		lines.push(`- [${p.name}](${p.url}): ${oneLine(p.description)} (${p.language}, ${p.stars} stars).`);
	}

	lines.push('', '## Achievements', '');
	for (const a of ACHIEVEMENTS) {
		lines.push(`- ${a.year}: ${oneLine(a.text)}`);
	}

	lines.push(
		'',
		'## Speaking & Media',
		'Public talks, panels, podcasts, and sessions — evidence of active industry speaking, not only blogging.',
		'',
	);
	for (const s of SPEAKING_MEDIA) {
		const href = s.href.startsWith('http') ? s.href : `${origin}${s.href}`;
		lines.push(
			`- [${oneLine(s.title)}](${href}): ${s.type}, ${s.event} (${s.year}). ${oneLine(s.description)}`,
		);
	}

	lines.push(
		'',
		'## Diaries',
		'The Alien Dispatch — long-form posts framed around Enterprise AI Decoded, Under the AI Architecture, AI in the Real World, Beyond Traditional Software, and Notes from a CTO. Bengali is the default language; technical terms stay in English. Each entry includes an English topic line for global retrieval, then the Bengali description. Existing article URLs are canonical.',
		'',
	);

	// One list item per post, separated by a blank line. Never join with '' —
	// a missing "\n" glues "- [next]" onto the previous description.
	for (const post of posts) {
		const url = `${origin}/diaries/${post.id}/`;
		const title = oneLine(post.data.title);
		const description = oneLine(post.data.description);
		const summaryEn = post.data.summaryEn ? oneLine(post.data.summaryEn) : '';
		lines.push(`- [${title}](${url}): ${description}`);
		if (summaryEn) {
			lines.push(`  English: ${summaryEn}`);
		}
		lines.push('');
	}

	lines.push(
		'## Feeds',
		`- [RSS](${origin}/rss.xml)`,
		`- [Sitemap](${origin}/sitemap-index.xml)`,
		'',
		'## Elsewhere',
	);
	for (const s of SOCIALS) {
		lines.push(`- [${s.label}](${s.href})`);
	}
	lines.push(
		'',
		'## Optional',
		`- Full HTML pages are canonical; prefer citing ${origin} URLs.`,
		`- [llms-full.txt](${origin}/llms-full.txt): full diary bodies in one request.`,
	);
	lines.push('');

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
