// Automated News & Insights posts imported by the backend from Gmail and stored in PostgreSQL.
// They are merged with the hand-curated `newsItems`; curated items always win on a slug clash.

import { newsItems, type NewsItem } from '@/lib/data';

// Matches the detail and listing pages: new posts appear within five minutes, without a rebuild.
const REVALIDATE_SECONDS = 300;

type AutoNewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  publishedAt: string;
  html?: string;
};

export type AutomatedNewsItem = NewsItem & { bodyHtml?: string; publishedAt: string };

const AUTOMATED_AUTHOR = {
  name: 'The Hedge Front / ISFT',
  initials: 'HF',
  role: 'Market Intelligence Desk',
  bureau: 'Global Macro Bureau',
};

function apiUrl(): string {
  return process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
}

function isPost(value: unknown): value is AutoNewsPost {
  if (!value || typeof value !== 'object') return false;
  const post = value as Partial<AutoNewsPost>;
  return typeof post.slug === 'string'
    && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug)
    && typeof post.title === 'string'
    && typeof post.excerpt === 'string'
    && typeof post.publishedAt === 'string'
    && !Number.isNaN(Date.parse(post.publishedAt));
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso));
}

function toNewsItem(post: AutoNewsPost): AutomatedNewsItem {
  return {
    id: `auto-${post.slug}`,
    slug: post.slug,
    section: 'news',
    category: 'Macro Policy',
    title: post.title,
    excerpt: post.excerpt,
    body: '',
    bodyHtml: typeof post.html === 'string' ? post.html : undefined,
    coverImage: post.coverImageUrl?.startsWith('https://res.cloudinary.com/') ? post.coverImageUrl : undefined,
    author: AUTOMATED_AUTHOR,
    date: formatDate(post.publishedAt),
    publishedAt: post.publishedAt,
    tags: ['Macro', 'Markets'],
    dataTag: 'LIVE WIRE',
  };
}

async function fetchJson(path: string): Promise<unknown> {
  const base = apiUrl();
  if (!base) return null;
  try {
    const response = await fetch(`${base}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function fetchAutomatedNewsItems(): Promise<AutomatedNewsItem[]> {
  const body = await fetchJson('/api/auto-news/posts');
  const posts = (body as { posts?: unknown } | null)?.posts;
  return Array.isArray(posts) ? posts.filter(isPost).map(toNewsItem) : [];
}

export async function fetchAutomatedNewsItem(slug: string): Promise<AutomatedNewsItem | null> {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug.length > 140) return null;
  const body = await fetchJson(`/api/auto-news/posts/${encodeURIComponent(slug)}`);
  const post = (body as { post?: unknown } | null)?.post;
  return isPost(post) && typeof post.html === 'string' ? toNewsItem(post) : null;
}

function sortTime(item: NewsItem | AutomatedNewsItem): number {
  if ('publishedAt' in item) return Date.parse(item.publishedAt);
  const parsed = Date.parse(item.date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/** Curated and automated news, newest first. Falls back to curated items if the API is down. */
export async function getAllNewsItems(): Promise<NewsItem[]> {
  const automated = await fetchAutomatedNewsItems();
  if (automated.length === 0) return newsItems;
  const curatedSlugs = new Set(newsItems.map(item => item.slug));
  return [...newsItems, ...automated.filter(item => !curatedSlugs.has(item.slug))]
    .map((item, index) => ({ item, index, time: sortTime(item) }))
    .sort((a, b) => b.time - a.time || a.index - b.index)
    .map(({ item }) => item);
}

/** Curated items are served from the bundle; anything else is looked up in the backend. */
export async function findNewsItem(slug: string): Promise<NewsItem | AutomatedNewsItem | null> {
  return newsItems.find(item => item.slug === slug) ?? await fetchAutomatedNewsItem(slug);
}
