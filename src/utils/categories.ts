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
	/** Short editorial description for archives / messaging (not a redesign). */
	description?: string;
	children?: CategoryNode[];
}

export const CATEGORY_TREE: CategoryNode[] = [
	{
		slug: 'ai',
		label: 'AI',
		label_bn: 'এআই',
		description:
			'Enterprise AI, AI architecture, and practical intelligent systems — aligned with Enterprise AI Decoded and Under the AI Architecture.',
	},
	{
		slug: 'business',
		label: 'Business',
		label_bn: 'ব্যবসা',
		description:
			'Business judgment and AI in the real world — opportunities, constraints, and outcomes.',
	},
	{
		slug: 'operation',
		label: 'Operation',
		label_bn: 'পরিচালনা',
		description: 'Notes from a CTO on running teams, delivery, and technology operations.',
	},
	{
		slug: 'productivity',
		label: 'Productivity',
		label_bn: 'উৎপাদনশীলতা',
		description: 'Developer workflows and tools beyond traditional software practice.',
	},
	{
		slug: 'software-development',
		label: 'Software Development',
		label_bn: 'সফটওয়্যার উন্নয়ন',
		description:
			'Software architecture, backend craft, and AI-native development — Beyond Traditional Software.',
		children: [
			{
				slug: 'laravel',
				label: 'Laravel',
				label_bn: 'লারাভেল',
				description: 'Laravel ecosystem notes from a long-time PHP practitioner.',
			},
			{
				slug: 'php',
				label: 'PHP',
				label_bn: 'পিএইচপি',
				description: 'PHP language and ecosystem notes grounded in open-source practice.',
			},
			{
				slug: 'programming',
				label: 'Programming',
				label_bn: 'প্রোগ্রামিং',
				description: 'Programming craft across stacks and eras.',
			},
			{
				slug: 'tips',
				label: 'Tips',
				label_bn: 'টিপস',
				description: 'Short practical tips for builders.',
			},
		],
	},
	{
		slug: 'whats-new',
		label: "What's New",
		label_bn: 'নতুন যা',
		description: 'What is changing in the tools and platforms we ship with.',
		children: [
			{
				slug: 'whats-new-in-php',
				label: "What's New in PHP",
				label_bn: 'পিএইচপি-তে নতুন যা',
				description: 'PHP release notes and language updates.',
			},
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

/** Editorial description for a category archive, if one is defined. */
export function categoryDescription(slug: string): string | undefined {
	return BY_SLUG[slug]?.description;
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
