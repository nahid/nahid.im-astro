// Category tree (§3 / §1). Slugs match the content schema enum and the WordPress
// URLs we must preserve: /diaries/category/{slug}. Parent pages include the posts
// of their children (see descendants()).

export type CategorySlug =
	| 'ai'
	| 'business'
	| 'operation'
	| 'productivity'
	| 'software-development'
	| 'laravel'
	| 'php'
	| 'programming'
	| 'tips'
	| 'whats-new'
	| 'whats-new-in-php';

export interface CategoryNode {
	slug: CategorySlug;
	/** English display label. */
	label: string;
	/** Bengali display label. */
	label_bn: string;
	children?: CategoryNode[];
}

export const CATEGORY_TREE: CategoryNode[] = [
	{ slug: 'ai', label: 'AI', label_bn: 'এআই' },
	{ slug: 'business', label: 'Business', label_bn: 'ব্যবসা' },
	{ slug: 'operation', label: 'Operation', label_bn: 'পরিচালনা' },
	{ slug: 'productivity', label: 'Productivity', label_bn: 'উৎপাদনশীলতা' },
	{
		slug: 'software-development',
		label: 'Software Development',
		label_bn: 'সফটওয়্যার উন্নয়ন',
		children: [
			{ slug: 'laravel', label: 'Laravel', label_bn: 'লারাভেল' },
			{ slug: 'php', label: 'PHP', label_bn: 'পিএইচপি' },
			{ slug: 'programming', label: 'Programming', label_bn: 'প্রোগ্রামিং' },
			{ slug: 'tips', label: 'Tips', label_bn: 'টিপস' },
		],
	},
	{
		slug: 'whats-new',
		label: "What's New",
		label_bn: 'নতুন যা',
		children: [
			{ slug: 'whats-new-in-php', label: "What's New in PHP", label_bn: 'পিএইচপি-তে নতুন যা' },
		],
	},
];

/** Flat lookup of every node by slug. */
const BY_SLUG: Record<string, CategoryNode> = {};
(function index(nodes: CategoryNode[]) {
	for (const n of nodes) {
		BY_SLUG[n.slug] = n;
		if (n.children) index(n.children);
	}
})(CATEGORY_TREE);

export function getCategory(slug: string): CategoryNode | undefined {
	return BY_SLUG[slug];
}

export function categoryLabel(slug: string, lang: 'bn' | 'en' = 'en'): string {
	const node = BY_SLUG[slug];
	if (!node) return slug;
	return lang === 'bn' ? node.label_bn : node.label;
}

/** A category's own slug plus all descendant slugs (for parent archive pages). */
export function descendants(slug: CategorySlug): CategorySlug[] {
	const node = BY_SLUG[slug];
	if (!node) return [slug];
	const out: CategorySlug[] = [node.slug];
	const walk = (n: CategoryNode) => n.children?.forEach((c) => (out.push(c.slug), walk(c)));
	walk(node);
	return out;
}

/** Every slug in the tree, for getStaticPaths. */
export function allCategorySlugs(): CategorySlug[] {
	return Object.keys(BY_SLUG) as CategorySlug[];
}
