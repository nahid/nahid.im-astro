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
		en: 'Signals sent into the open — a decade of PHP and Go packages (Talk, JSONQ, QArray, Presento, Permit, GoHTTP), free for any crew to pick up.',
	},
	expertise: { bn: 'দক্ষতার ক্ষেত্র', en: 'Areas of Expertise' },
	expertiseLede: {
		bn: 'এন্টারপ্রাইজ এআই, এআই ইঞ্জিনিয়ারিং ও সফটওয়্যার আর্কিটেকচার — তিন স্তম্ভে সাজানো আগ্রহ।',
		en: 'Three pillars: Enterprise AI, AI Engineering, and Software Architecture.',
	},
	research: { bn: 'গবেষণা ও অনুসন্ধান', en: 'Research & Exploration' },
	researchLede: {
		bn: 'চলমান গবেষণা — উৎপাদন বাস্তবায়ন হিসেবে দাবি নয়।',
		en: 'Active research — not claimed as a production implementation.',
	},
	editorialSeries: { bn: 'সম্পাদকীয় সিরিজ', en: 'Dispatch Series' },
	editorialLede: {
		bn: 'The Alien Dispatch পাঁচটি পুনরাবৃত্ত সিরিজের চারপাশে সাজানো — বিদ্যমান দিনলিপিগুলো অপরিবর্তিত।',
		en: 'The Alien Dispatch is organized around five recurring series. Existing articles keep their URLs and categories.',
	},
	speaking: { bn: 'বক্তৃতা ও মিডিয়া', en: 'Speaking & Media' },
	speakingLede: {
		bn: 'পডকাস্ট, বিশ্ববিদ্যালয় সেশন ও টেক টক — শুধু ব্লগ নয়, ইন্ডাস্ট্রি স্পিকিংও।',
		en: 'Podcasts, university sessions, and tech talks — industry speaking beyond the dispatch desk.',
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
	subscribeRssBody: {
		bn: 'নতুন ইমেইল লিস্ট নেই — RSS ফিডে যুক্ত হন, নতুন দিনলিপি প্রকাশের সাথে সাথেই পেয়ে যাবেন।',
		en: 'No email list here — follow the RSS feed and every new dispatch lands the moment it publishes.',
	},
	subscribeCta: { bn: 'RSS ফিড', en: 'Subscribe via RSS' },
	contactMailCta: { bn: 'ইমেইল করুন', en: 'Send an email' },
	contactCopyCta: { bn: 'ইমেইল কপি করুন', en: 'Copy email address' },
	contactCopied: { bn: 'কপি করা হয়েছে!', en: 'Copied!' },
	notFoundTitle: { bn: 'দিনলিপি পাওয়া যায়নি', en: 'Story Not Found' },
	notFoundBody: {
		bn: 'এই ঠিকানায় সংবাদদাতার কোনো প্রতিবেদন নেই।',
		en: 'The correspondent has no dispatch at this address.',
	},
	backHome: { bn: 'প্রচ্ছদে ফিরুন', en: 'Back to the front page' },
	homeDesc: {
		bn: 'নাহিদ বিন আজহার — CTO ও সহপ্রতিষ্ঠাতা, AI Engineering, Enterprise AI ও Software Architecture নিয়ে Building Intelligent Systems.',
		en: 'Nahid Bin Azhar is a CTO, software engineer, and technology entrepreneur focused on AI Engineering, Enterprise AI, and Software Architecture.',
	},
	aboutDesc: {
		bn: 'নাহিদ বিন আজহার (মেহেদী হাসান নাহিদ) — JoulesLabs-এর CTO ও সহপ্রতিষ্ঠাতা; AI Engineering, Enterprise AI ও Software Architecture।',
		en: 'Nahid Bin Azhar (Mehedi Hasan Nahid) — CTO & Co-founder of JoulesLabs, focused on AI Engineering, Enterprise AI, and Software Architecture.',
	},
	keyTakeaways: { bn: 'মূল কথা', en: 'Key takeaways' },
	faq: { bn: 'প্রশ্নোত্তর', en: 'FAQ' },
	aboutAuthor: { bn: 'লেখক পরিচিতি', en: 'About the author' },
	writtenBy: { bn: 'লিখেছেন', en: 'Written by' },
	authorMore: { bn: 'পরিচিতি পড়ুন', en: 'Read the full profile' },
	contactDesc: {
		bn: 'নাহিদ বিন আজহারের সঙ্গে যোগাযোগ করুন — প্রতিটি বার্তা পড়া হয়।',
		en: 'Send a dispatch to Nahid Bin Azhar — every signal reaches the desk and every signal is read.',
	},
	diariesDesc: {
		bn: 'The Alien Dispatch — এন্টারপ্রাইজ এআই, এআই আর্কিটেকচার, বাস্তব জগতের এআই ও CTO নোট নিয়ে নাহিদ বিন আজহারের লেখা।',
		en: 'The Alien Dispatch by Nahid Bin Azhar — Enterprise AI, AI architecture, real-world AI practice, and notes from a CTO.',
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
