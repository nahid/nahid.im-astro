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
		"Software engineer turned entrepreneur — twelve years in the industry, now building SaaS products as CTO & co-founder of JoulesLabs. Most of these dispatches are in Bangla — notes on engineering, running a company, and staying curious.",
	/** Portrait lives in public/images/; grayscale is applied in CSS, not baked in.
	 *  Placeholder until the real photo is migrated (Phase 2). */
	photo: '/images/portrait-placeholder.svg',
} as const;

/** Home "achievements" column — plain editable list, newest/most notable first. */
export const ACHIEVEMENTS = [
	{ year: 2014, text: 'Co-founded JoulesLabs — a software studio based in Dhaka.' },
	{ year: 2019, text: 'Led delivery of large-scale Laravel and PHP platforms.' },
	{ year: 2023, text: 'Building and mentoring engineering teams across timezones.' },
] as const;

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
