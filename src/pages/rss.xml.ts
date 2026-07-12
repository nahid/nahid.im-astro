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
		site: context.site ?? SITE.title,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/diaries/${post.id}/`,
		})),
	});
}
