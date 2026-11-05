// Site-wide constants and SEO helpers shared by metadata, the sitemap, the RSS feed and JSON-LD.

import type { Metadata } from 'next';

/** Public origin of the blog, without a trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://blog.derivionacademy.in').replace(/\/+$/, '');
export const SITE_NAME = 'DerivionAcademy';
export const PUBLISHER_NAME = 'ISFT research desk';
export const SITE_DESCRIPTION = 'Market briefings, regulatory explainers and trading education from the ISFT research desk.';
export const DEFAULT_OG_IMAGE = '/hero-featured.jpg';

/** Number of News & Insights posts on each listing page (/news, /news/page/2, ...). */
export const NEWS_PAGE_SIZE = 8;

export function newsPageHref(page: number): string {
  return page <= 1 ? '/news' : `/news/page/${page}`;
}

const TITLE_SUFFIX = ` | ${SITE_NAME}`;
const MAX_TITLE_LENGTH = 60;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * A <title> of about 60 characters. Short titles get the site suffix from the root template;
 * longer ones drop the suffix and are cut at a word boundary.
 */
export function seoTitle(title: string): Metadata['title'] {
  const clean = title.replace(/\s+/g, ' ').trim();
  if (clean.length + TITLE_SUFFIX.length <= MAX_TITLE_LENGTH) return clean;
  if (clean.length <= MAX_TITLE_LENGTH) return { absolute: clean };
  const cut = clean.slice(0, MAX_TITLE_LENGTH - 1);
  const atWord = cut.slice(0, Math.max(cut.lastIndexOf(' '), 40)).replace(/[\s,;:—–-]+$/, '');
  return { absolute: `${atWord}…` };
}

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** Parses the content dates used in lib/data.ts ("October 2, 2026", "September 2026") or ISO strings. */
export function contentDate(value: string): Date | null {
  const text = value.trim();
  const match = text.match(/^([A-Za-z]+)\s+(?:(\d{1,2}),?\s+)?(\d{4})$/);
  if (match && match[1].toLowerCase() in MONTHS) {
    // Noon UTC keeps the calendar date the same in Indian and US time zones.
    return new Date(Date.UTC(Number(match[3]), MONTHS[match[1].toLowerCase()], match[2] ? Number(match[2]) : 1, 12));
  }
  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? null : new Date(parsed);
}

export function isoDate(value: string): string | undefined {
  return contentDate(value)?.toISOString();
}

/** First Markdown or HTML image in a post body, used when a post has no cover image. */
export function firstBodyImage(body: string): string | undefined {
  const markdown = body.match(/!\[[^\]]*\]\((\/[^)\s]+|https:\/\/[^)\s]+)\)/);
  const html = body.match(/<img[^>]+src="(\/[^"]+|https:\/\/[^"]+)"/i);
  const candidates = [markdown, html].filter((m): m is RegExpMatchArray => m !== null);
  candidates.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  return candidates[0]?.[1];
}

/** Serialises JSON-LD for a <script type="application/ld+json"> tag without allowing `</script>` breakouts. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
