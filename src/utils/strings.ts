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
	openSource: { bn: 'ওপেন সোর্স', en: 'Open Source' },
	openSourceLede: {
		bn: 'খোলা আকাশে পাঠানো সংকেত — এক দশকের পিএইচপি ও গো প্যাকেজ, যে কেউ কুড়িয়ে নিতে পারে।',
		en: 'Signals sent into the open — a decade of PHP and Go packages, free for any crew to pick up.',
	},
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
	homeDesc: {
		bn: 'নাহিদ বিন আজহারের ব্যক্তিগত ডিসপ্যাচ — সফটওয়্যার প্রকৌশল, উদ্যোক্তা জীবন আর কৌতূহলের বাংলা নোট।',
		en: 'The personal dispatch of Nahid Bin Azhar — Bangla notes on software engineering, running a company, and staying curious.',
	},
	aboutDesc: {
		bn: 'নাহিদ বিন আজহার সম্পর্কে — সফটওয়্যার আর্কিটেক্ট, JoulesLabs-এর সিটিও ও সহপ্রতিষ্ঠাতা।',
		en: 'About Nahid Bin Azhar — software architect, CTO & co-founder of JoulesLabs, filing dispatches from Dhaka.',
	},
	contactDesc: {
		bn: 'নাহিদ বিন আজহারের সঙ্গে যোগাযোগ করুন — প্রতিটি বার্তা পড়া হয়।',
		en: 'Send a dispatch to Nahid Bin Azhar — every signal reaches the desk and every signal is read.',
	},
	diariesDesc: {
		bn: 'সব ডায়েরি — সফটওয়্যার, ব্যবসা আর পরীক্ষা-নিরীক্ষা নিয়ে নাহিদ বিন আজহারের লেখা।',
		en: 'Every dispatch by Nahid Bin Azhar — on software, business, and the occasional experiment.',
	},
	notFoundDesc: {
		bn: 'এই ঠিকানায় সংবাদদাতার কোনো প্রতিবেদন নেই।',
		en: 'The correspondent has no dispatch at this address.',
	},
} as const satisfies Record<string, StringPair>;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, lang: Lang = 'en'): string {
	return STRINGS[key][lang];
}
