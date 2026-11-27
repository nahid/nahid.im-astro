// Shared SEO / AEO / GEO helpers. Keeps Base.astro thin and makes Person /
// BlogPosting / FAQPage IDs stable so answer engines can join entities.

import {
	ACHIEVEMENTS,
	BIO,
	KNOWS_ABOUT_DISPLAY,
	OPEN_SOURCE,
	SITE,
	SOCIALS,
} from '../consts';

export type FaqItem = { question: string; answer: string };
export type Crumb = { name: string; url: string };

export const PERSON_ID = 'https://nahid.im/#person';
export const WEBSITE_ID = 'https://nahid.im/#website';
export const ORG_ID = 'https://nahid.im/#jouleslabs';

export function absoluteUrl(path: string, site: URL | string | undefined): string {
	return new URL(path, site).href;
}

export function buildPerson(site: URL | string | undefined) {
	const home = absoluteUrl('/', site);
	const about = absoluteUrl('/about/', site);
	return {
		'@type': 'Person',
		'@id': PERSON_ID,
		name: SITE.author,
		alternateName: ['Mehedi Hasan Nahid', 'nahidophia', 'Nahid'],
		url: about,
		mainEntityOfPage: about,
		image: {
			'@type': 'ImageObject',
			url: absoluteUrl(BIO.photo, site),
			caption: SITE.author,
		},
		jobTitle: 'CTO & Co-founder',
		worksFor: { '@id': ORG_ID },
		homeLocation: {
			'@type': 'Place',
			name: BIO.location,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Dhaka',
				addressCountry: 'BD',
			},
		},
		email: SITE.email,
		description: BIO.summary,
		knowsAbout: [...KNOWS_ABOUT_DISPLAY],
		sameAs: SOCIALS.map((s) => s.href),
		award: ACHIEVEMENTS.map((a) => `${a.year}: ${a.text}`),
		// Help engines map open-source identity without inventing facts.
		owns: OPEN_SOURCE.map((p) => ({
			'@type': 'SoftwareSourceCode',
			name: p.name,
			url: p.url,
			programmingLanguage: p.language,
			description: p.description,
		})),
		nationality: {
			'@type': 'Country',
			name: 'Bangladesh',
		},
		// Soft self-reference so home and about share one entity.
		identifier: home,
	};
}

export function buildOrganization(site: URL | string | undefined) {
	return {
		'@type': 'Organization',
		'@id': ORG_ID,
		name: 'JoulesLabs',
		url: 'https://jouleslabs.com',
		logo: absoluteUrl(BIO.photo, site),
		founder: { '@id': PERSON_ID },
		employee: { '@id': PERSON_ID },
		sameAs: ['https://jouleslabs.com'],
	};
}

export function buildWebSite(site: URL | string | undefined, inLanguage: string) {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: SITE.title,
		alternateName: [SITE.masthead, SITE.tagline, 'nahid.im'],
		url: absoluteUrl('/', site),
		description: SITE.description,
		inLanguage,
		publisher: { '@id': PERSON_ID },
		author: { '@id': PERSON_ID },
		copyrightHolder: { '@id': PERSON_ID },
		isAccessibleForFree: true,
	};
}

export function buildBreadcrumbs(crumbs: Crumb[], site: URL | string | undefined) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: absoluteUrl(c.url, site),
		})),
	};
}

export function buildFaqPage(faq: FaqItem[], pageUrl: string) {
	return {
		'@type': 'FAQPage',
		'@id': `${pageUrl}#faq`,
		mainEntity: faq.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}

export function buildBlogPosting(opts: {
	site: URL | string | undefined;
	title: string;
	description: string;
	canonical: string;
	inLanguage: string;
	publishedTime: string;
	modifiedTime?: string;
	imageUrl: string;
	imageAlt?: string;
	category: string;
	tags: string[];
	wordCount: number;
}) {
	const {
		site,
		title,
		description,
		canonical,
		inLanguage,
		publishedTime,
		modifiedTime,
		imageUrl,
		imageAlt,
		category,
		tags,
		wordCount,
	} = opts;

	return {
		'@type': 'BlogPosting',
		'@id': `${canonical}#article`,
		headline: title,
		description,
		datePublished: publishedTime,
		dateModified: modifiedTime ?? publishedTime,
		author: { '@id': PERSON_ID },
		creator: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		image: {
			'@type': 'ImageObject',
			url: imageUrl,
			caption: imageAlt ?? title,
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonical,
			url: canonical,
			isPartOf: { '@id': WEBSITE_ID },
		},
		url: canonical,
		inLanguage,
		isAccessibleForFree: true,
		isPartOf: { '@id': WEBSITE_ID },
		articleSection: category,
		keywords: tags.length ? tags.join(', ') : undefined,
		wordCount,
		about: tags.map((tag) => ({ '@type': 'Thing', name: tag })),
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['.post__headline', '.takeaways', '.prose > p:first-of-type'],
		},
		citation: absoluteUrl('/about/', site),
	};
}

export function buildProfilePage(opts: {
	site: URL | string | undefined;
	canonical: string;
	description: string;
}) {
	return {
		'@type': 'ProfilePage',
		'@id': `${opts.canonical}#profile`,
		url: opts.canonical,
		name: `${SITE.author} — About`,
		description: opts.description,
		mainEntity: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },
	};
}
