// Shared diary queries so pages don't each re-implement draft filtering + sort.
import { getCollection, type CollectionEntry } from 'astro:content';

/** Drafts are excluded from production builds; visible in dev for preview (§7). */
function isVisible(post: CollectionEntry<'diaries'>): boolean {
	return import.meta.env.PROD ? !post.data.draft : true;
}

/** All visible posts, newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<'diaries'>[]> {
	const posts = await getCollection('diaries', isVisible);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
