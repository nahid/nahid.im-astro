// Global site data. Import anywhere with `import { SITE, ... } from '../consts'`.
// Content lives here (not scattered in components) so it stays editable in one place.

export const SITE = {
	/** Masthead nameplate — set in Special Elite caps by the design. */
	masthead: 'Nahid | The Alien',
	/** Human owner / byline. */
	author: 'Nahid Bin Azhar',
	/** <title> suffix and RSS/OG site name. */
	title: 'The Alien Dispatch — Nahid Bin Azhar',
	description:
		'Dispatches on software, business, and the occasional experiment — by Nahid Bin Azhar.',
	/** Folio strip furniture. */
	kicker: 'Multiverse Edition',
	tagline: 'The Alien Dispatch',
	established: 1988,
	/** Default OG locale; per-post pages override from the post lang. */
	locale: 'bn_BD',
	/** Default social-share card, used when a page passes no ogImage. Absolute-ised
	 *  against `site` in Base.astro. Drop the file at public/images/og-default.png. */
	ogImage: '/images/og-default.png',
	/** Twitter/X handle for card attribution (matches SOCIALS). */
	twitterHandle: '@nahidophia',
	/** Public contact address — mailto: link on /contact, no backend required. */
	email: 'nahid@jouleslabs.com',
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
	role: 'Software architect · CTO & co-founder, JoulesLabs',
	location: 'Dhaka, Bangladesh',
	blurb:
		"An alien engineer filing from planet Earth — twelve years in the field, now building SaaS products as CTO & co-founder of JoulesLabs. These dispatches, mostly in Bangla, are transmissions on engineering, running a company, and staying curious in the void.",
	/** Portrait lives in public/images/; grayscale is applied in CSS, not baked in.
	 *  Migrated from the old WordPress media library. */
	photo: '/images/nahid-bin-azhar.png',
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
		name: 'talk',
		description: 'Talk is a real-time users messaging and chatting system for Laravel.',
		language: 'PHP',
		stars: 1622,
		url: 'https://github.com/nahid/talk',
	},
	{
		name: 'jsonq',
		description: 'A PHP query builder for JSON.',
		language: 'PHP',
		stars: 871,
		url: 'https://github.com/nahid/jsonq',
	},
	{
		name: 'qarray',
		description: 'A Query Engine For PHP Array.',
		language: 'PHP',
		stars: 108,
		url: 'https://github.com/nahid/qarray',
	},
	{
		name: 'presento',
		description: 'Presento - Transformer & Presenter Package for PHP.',
		language: 'PHP',
		stars: 74,
		url: 'https://github.com/nahid/presento',
	},
	{
		name: 'permit',
		description: 'A Laravel package to handle user authorization and ACL.',
		language: 'PHP',
		stars: 73,
		url: 'https://github.com/nahid/permit',
	},
	{
		name: 'gohttp',
		description: 'HTTP client for Go.',
		language: 'Go',
		stars: 66,
		url: 'https://github.com/nahid/gohttp',
	},
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
