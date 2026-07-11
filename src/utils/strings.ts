// All bn/en UI copy lives here (§5) so the label pairs stay auditable and no
// Bengali string is hardcoded inside a component. Usage: t('readMore', lang).

type Lang = 'bn' | 'en';

type StringPair = { bn: string; en: string };

export const STRINGS = {
	latestDispatches: { bn: 'সাম্প্রতিক ডায়েরি', en: 'Latest Dispatches' },
	allDiaries: { bn: 'সব ডায়েরি', en: 'All Diaries' },
	about: { bn: 'পরিচিতি', en: 'About' },
	contact: { bn: 'যোগাযোগ', en: 'Contact' },
	achievements: { bn: 'অর্জন', en: 'Achievements' },
	elsewhere: { bn: 'অন্যত্র', en: 'Elsewhere' },
	readMore: { bn: 'পুরোটা পড়ুন', en: 'Read the dispatch' },
	byline: { bn: 'লিখেছেন নাহিদ বিন আজহার', en: 'By Nahid Bin Azhar' },
	minRead: { bn: 'মিনিট', en: 'min read' },
	newer: { bn: 'নতুন', en: 'Newer' },
	older: { bn: 'পুরোনো', en: 'Older' },
	prevPost: { bn: 'পূর্ববর্তী দিনলিপি', en: 'Continued from' },
	nextPost: { bn: 'পরবর্তী দিনলিপি', en: 'Continues on' },
	subscribe: { bn: 'ডিসপ্যাচ গ্রাহক হন', en: 'Subscribe to the Dispatch' },
	emailPlaceholder: { bn: 'আপনার ইমেইল', en: 'your@email' },
	subscribeCta: { bn: 'গ্রাহক হন', en: 'Subscribe' },
	notFoundTitle: { bn: 'দিনলিপি পাওয়া যায়নি', en: 'Story Not Found' },
	notFoundBody: {
		bn: 'এই ঠিকানায় সংবাদদাতার কোনো প্রতিবেদন নেই।',
		en: 'The correspondent has no dispatch at this address.',
	},
	backHome: { bn: 'প্রচ্ছদে ফিরুন', en: 'Back to the front page' },
} as const satisfies Record<string, StringPair>;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, lang: Lang = 'en'): string {
	return STRINGS[key][lang];
}
