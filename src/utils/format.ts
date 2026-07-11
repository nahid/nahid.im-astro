// Newspaper date + reading-time formatting, per Phase 3 §4b.
// English: "Saturday, July 11, 2026". Bengali: "শনিবার, ১১ জুলাই ২০২৬".
// Bengali numerals + month names come from Intl (no manual mapping).

type Lang = 'bn' | 'en';

const LONG: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

const enLong = new Intl.DateTimeFormat('en-US', LONG);
const bnLong = new Intl.DateTimeFormat('bn-BD', LONG);

/** Full dateline, e.g. the masthead bar and post bylines. */
export function formatDate(date: Date, lang: Lang = 'en'): string {
	return (lang === 'bn' ? bnLong : enLong).format(date);
}

/** Machine-readable value for <time datetime>. */
export function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

const bnDigits = new Intl.NumberFormat('bn-BD', { useGrouping: false });

/** Localize an integer's digits (e.g. reading time). */
export function formatNumber(n: number, lang: Lang = 'en'): string {
	return lang === 'bn' ? bnDigits.format(n) : String(n);
}

/**
 * Reading time in minutes. Bengali words are whitespace-delimited, so a word
 * count works for both scripts; Bengali reads a touch slower (§3 item 4).
 */
export function readingMinutes(text: string, lang: Lang = 'en'): number {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const wpm = lang === 'bn' ? 180 : 220;
	return Math.max(1, Math.round(words / wpm));
}
