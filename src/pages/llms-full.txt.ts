// llms-full.txt — full diary bodies for answer engines that want one-shot context.
// Companion to /llms.txt (https://llmstxt.org/).
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
		`Site: ${SITE.title}`,
		`Home: ${origin}/`,
		`Index: ${origin}/llms.txt`,
		'',
		'## About',
		`- [About ${SITE.author}](${origin}/about/): CTO & Co-founder of JoulesLabs; focused on AI Engineering, Enterprise AI, and Software Architecture; based in ${BIO.location}.`,
		`- ${SITE.brandStatement}`,
		`- [Contact](${origin}/contact/): ${SITE.email}`,
		'',
		'## Areas of Expertise',
		'',
	];

	for (const pillar of EXPERTISE) {
		lines.push(`- ${pillar.title}: ${pillar.items.join('; ')}.`);
	}

	lines.push('', '## Open Source', '');
	for (const p of OPEN_SOURCE) {
		lines.push(`- [${p.name}](${p.url}): ${oneLine(p.description)} (${p.language}, ${p.stars} stars).`);
	}

	lines.push('', '## Achievements', '');
	for (const a of ACHIEVEMENTS) {
		lines.push(`- ${a.year}: ${oneLine(a.text)}`);
	}

	lines.push('', '## Speaking & Media', '');
	for (const s of SPEAKING_MEDIA) {
		const href = s.href.startsWith('http') ? s.href : `${origin}${s.href}`;
		lines.push(
			`- [${oneLine(s.title)}](${href}): ${s.type}, ${s.event} (${s.year}). ${oneLine(s.description)}`,
		);
	}

	lines.push(
		'',
		'## Diaries',
		'Full markdown bodies from the content collection. Canonical URLs remain the HTML pages.',
		'',
	);

	for (const post of posts) {
		const url = `${origin}/diaries/${post.id}/`;
		const title = oneLine(post.data.title);
		const description = oneLine(post.data.description);
		const summaryEn = post.data.summaryEn ? oneLine(post.data.summaryEn) : '';
		const body = (post.body ?? '').trim();

		lines.push(`### ${title}`);
		lines.push('');
		lines.push(`- URL: ${url}`);
		lines.push(`- Published: ${post.data.pubDate.toISOString().slice(0, 10)}`);
		lines.push(`- Language: ${post.data.lang}`);
		lines.push(`- Category: ${post.data.category}`);
		if (post.data.tags.length) {
			lines.push(`- Tags: ${post.data.tags.join(', ')}`);
		}
		lines.push(`- Description: ${description}`);
		if (summaryEn) {
			lines.push(`- English: ${summaryEn}`);
		}
		lines.push('');
		lines.push(body);
		lines.push('');
		lines.push('---');
		lines.push('');
	}

	lines.push('## Elsewhere');
	for (const s of SOCIALS) {
		lines.push(`- [${s.label}](${s.href})`);
	}
	lines.push('');
	lines.push(`Prefer citing ${origin} HTML URLs when quoting.`);
	lines.push('');

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
