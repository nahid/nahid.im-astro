// RSS feed for the diary. The footer links here (/rss.xml); @astrojs/rss is
// already a dependency. Reuses the shared published-posts query so draft
// filtering and sort order match every other listing.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getPublishedPosts } from '../utils/posts';

export async function GET(context: APIContext) {
	const posts = await getPublishedPosts();
	return rss({
		title: SITE.title,
		description: SITE.description,
		// `site` is set in astro.config.mjs, so context.site is always populated;
		// the literal is only a type-level fallback (the old one passed a title
		// string where a URL belongs).
		site: context.site ?? 'https://nahid.im',
		// The diary is Bengali-first (§3).
		customData: '<language>bn-BD</language>',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/diaries/${post.id}/`,
			categories: [post.data.category, ...post.data.tags],
		})),
	});
}
