// Global site data. Import anywhere with `import { SITE, ... } from '../consts'`.
// Content lives here (not scattered in components) so it stays editable in one place.

export const SITE = {
	/** Masthead nameplate — set in Special Elite caps by the design. */
	masthead: 'Nahid | The Alien',
	/** Human owner / byline. */
	author: 'Nahid Bin Azhar',
	/** <title> suffix and RSS/OG site name. */
	title: 'Nahid Bin Azhar | The Alien — AI Engineering & Enterprise AI',
	description:
		'Nahid Bin Azhar is a CTO, software engineer, and technology entrepreneur focused on AI Engineering, Enterprise AI, and Software Architecture.',
	/** Folio strip furniture. */
	kicker: 'Multiverse Edition',
	tagline: 'The Alien Dispatch',
	/** Brand / homepage headline. */
	brandHeadline: 'Building Intelligent Systems.',
	/** Short brand statement for meta and editorial framing. */
	brandStatement:
		'Building intelligent systems and engineering practical AI solutions that solve real-world business problems.',
	established: 1988,
	/** Default OG locale; per-post pages override from the post lang. */
	locale: 'bn_BD',
	/** Default social-share card, used when a page passes no ogImage. Absolute-ised
	 *  against `site` in Base.astro. Drop the file at public/images/og-default.png. */
	ogImage: '/images/og-default.webp',
	/** Twitter/X handle for card attribution (matches SOCIALS). */
	twitterHandle: '@nahidophia',
	/** Public contact address — mailto: link on /contact, no backend required. */
	email: 'nahid.dns@gmail.com',
} as const;

/** Primary navigation. `href` values must match the target site map (§2). */
export const NAV = [
	{ href: '/', label: 'Home', label_bn: 'প্রচ্ছদ' },
	{ href: '/diaries/', label: 'Diaries', label_bn: 'ডায়েরি' },
	{ href: '/about/', label: 'About', label_bn: 'পরিচিতি' },
	{ href: '/contact/', label: 'Contact', label_bn: 'যোগাযোগ' },
] as const;

/** Short bio shown on the homepage and About lede. */
export const BIO = {
	name: 'Nahid Bin Azhar',
	/** Legal / alternate public name used on LinkedIn and paperwork. */
	alternateName: 'Mehedi Hasan Nahid',
	role: 'CTO & Co-founder | AI Engineering & Enterprise AI | Software Architecture',
	location: 'Dhaka, Bangladesh',
	/** One-line entity answer for AEO / About ledes. */
	summary:
		'Nahid Bin Azhar (also Mehedi Hasan Nahid) is CTO & Co\u2011founder of JoulesLabs, focused on AI Engineering, Enterprise AI, and Software Architecture.',
	/** One entry per paragraph — Bio.astro renders each as its own <p>. Keep it a
	 *  list, not one string with newlines: HTML collapses \n, so a single string
	 *  would set the whole bio as one block. */
	blurb: [
		"I'm Nahid Bin Azhar, a software engineer and technology entrepreneur focused on AI Engineering and Enterprise AI.",
		'With 15+ years of experience in software engineering, architecture, and product development, I explore how artificial intelligence can be transformed into reliable systems, practical products, and meaningful business solutions.',
		'As CTO & Co-founder at JoulesLabs, I work at the intersection of software architecture, AI engineering, and technology strategy.',
		'Still exploring. Still learning. Still building intelligent systems.',
	],
	/** Portrait lives in public/images/; grayscale is applied in CSS, not baked in.
	 *  Migrated from the old WordPress media library. */
	photo: '/images/nahid-bin-azhar.webp',
} as const;

/** Home "achievements" column — plain editable list, newest/most notable first. */
export const ACHIEVEMENTS = [
	{ year: '2017', text: 'Won the PHPClasses Innovation Award twice, for practical PHP solutions built for the developer community.' },
	{ year: '2019', text: 'Won the BASIS National ICT Award as part of the team behind an innovative SaaS application.' },
	{ year: '2026', text: 'Ranked the #1 PHP open source contributor in Bangladesh since 2019, by contributions to the PHP ecosystem.' },
] as const;

/** Open-source projects surfaced on the home page. Newest/most notable first;
 *  `stars` is a hand-updated snapshot (no build-time GitHub calls). */
export const OPEN_SOURCE = [
	{
		name: 'Talk',
		description: 'Talk is a real-time users messaging and chatting system for Laravel.',
		language: 'PHP',
		stars: 1622,
		url: 'https://github.com/nahid/talk',
	},
	{
		name: 'JSONQ',
		description: 'A PHP query builder for JSON.',
		language: 'PHP',
		stars: 871,
		url: 'https://github.com/nahid/jsonq',
	},
	{
		name: 'QArray',
		description: 'A Query Engine For PHP Array.',
		language: 'PHP',
		stars: 108,
		url: 'https://github.com/nahid/qarray',
	},
	{
		name: 'Presento',
		description: 'Presento - Transformer & Presenter Package for PHP.',
		language: 'PHP',
		stars: 74,
		url: 'https://github.com/nahid/presento',
	},
	{
		name: 'Permit',
		description: 'A Laravel package to handle user authorization and ACL.',
		language: 'PHP',
		stars: 73,
		url: 'https://github.com/nahid/permit',
	},
	{
		name: 'GoHTTP',
		description: 'HTTP client for Go.',
		language: 'Go',
		stars: 66,
		url: 'https://github.com/nahid/gohttp',
	},
] as const;

/** Areas of expertise — three pillars for About / home (content only). */
export const EXPERTISE = [
	{
		title: 'Enterprise AI',
		items: [
			'Enterprise AI Adoption',
			'AI Readiness Assessment',
			'Business AI Opportunities',
			'AI-powered Workflows',
			'Legacy System Modernization',
			'AI Strategy and Architecture',
		],
	},
	{
		title: 'AI Engineering',
		items: [
			'Large Language Models',
			'Retrieval-Augmented Generation',
			'Hybrid Search',
			'Vector Databases',
			'Agentic AI Systems',
			'Model Context Protocol',
			'AI Evaluation and Observability',
			'Production AI Infrastructure',
		],
	},
	{
		title: 'Software Architecture',
		items: [
			'Distributed Systems',
			'Backend Architecture',
			'System Integration',
			'AI-native Software Development',
			'Engineering Leadership',
		],
	},
] as const;

/** Research & exploration — not production claims unless status says so. */
export const RESEARCH = [
	{
		name: 'Meeting Sense',
		status: 'Research',
		description:
			'Research into multilingual meeting intelligence — speech transcription, code-switched Bangla–English understanding, and turning conversations into usable structured knowledge.',
	},
] as const;

/** Editorial series framing for The Alien Dispatch — messaging only; existing
 *  diary categories and URLs are preserved. */
export const EDITORIAL_SERIES = [
	{
		name: 'Enterprise AI Decoded',
		description: 'Making sense of AI adoption, readiness, and strategy for real businesses.',
	},
	{
		name: 'Under the AI Architecture',
		description: 'How intelligent systems are designed — models, retrieval, agents, and infrastructure.',
	},
	{
		name: 'AI in the Real World',
		description: 'Practical notes on shipping AI where products, people, and constraints collide.',
	},
	{
		name: 'Beyond Traditional Software',
		description: 'Where classical engineering meets AI-native development and new workflows.',
	},
	{
		name: 'Notes from a CTO',
		description: 'Leadership, product judgment, and building technology organizations.',
	},
] as const;

/** Topics shown on About and reused by JSON-LD knowsAbout (AEO entity clarity). */
export const KNOWS_ABOUT_DISPLAY = [
	'AI Engineering',
	'Enterprise AI',
	'Software Architecture',
	'Large Language Models',
	'Retrieval-Augmented Generation',
	'Agentic AI Systems',
	'PHP',
	'Laravel',
	'Open source',
	'Engineering Leadership',
] as const;

/** GitHub profile — linked from the open-source section head. */
export const GITHUB_PROFILE = 'https://github.com/nahid';

/** Social links for the SocialBar. Order = display order. */
export const SOCIALS = [
	{ label: 'GitHub', href: 'https://github.com/nahid' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/nahidophia' },
	{ label: 'Twitter / X', href: 'https://twitter.com/nahidophia' },
	{ label: 'Facebook', href: 'https://www.facebook.com/nahidophia' },
	{ label: 'Threads', href: 'https://www.threads.net/@nahidophia' },
] as const;

/** How many posts the homepage "Latest dispatches" section shows. */
export const RECENT_COUNT = 5;
/** Archive pagination size (§2: 10/page). */
export const PER_PAGE = 10;
