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
		bn: 'নাহিদ বিন আজহারের The Alien Dispatch — সফটওয়্যার আর্কিটেকচার, PHP, Laravel, AI engineering ও JoulesLabs নিয়ে বাংলা নোট।',
		en: 'The Alien Dispatch by Nahid Bin Azhar — software architecture, PHP, Laravel, AI engineering, and building at JoulesLabs from Dhaka.',
	},
	aboutDesc: {
		bn: 'নাহিদ বিন আজহার (মেহেদী হাসান নাহিদ) — সফটওয়্যার আর্কিটেক্ট, JoulesLabs-এর CTO ও সহপ্রতিষ্ঠাতা, ঢাকা থেকে PHP, Laravel ও AI engineering নিয়ে লেখেন।',
		en: 'Who is Nahid Bin Azhar (Mehedi Hasan Nahid)? Software architect, CTO & co-founder of JoulesLabs in Dhaka — PHP, Laravel, AI engineering, and open source.',
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
