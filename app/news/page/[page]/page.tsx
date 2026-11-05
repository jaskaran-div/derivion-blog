import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { newsItems } from '@/lib/data';
import { getAllNewsItems } from '@/lib/autoNews';
import NewsListing from '@/components/NewsListing';
import { NEWS_PAGE_SIZE, newsPageHref } from '@/lib/site';

// Same cache window as /news, so page boundaries move together when new posts arrive.
export const revalidate = 300;
// Curated pages are prerendered; pages created by new automated posts render on first request.
export const dynamicParams = true;

interface Params { page: string; }

function parsePage(value: string): number | null {
  return /^[1-9]\d{0,3}$/.test(value) ? Number(value) : null;
}

export function generateStaticParams() {
  const pages = Math.ceil(newsItems.length / NEWS_PAGE_SIZE);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page) return { title: 'Not Found', robots: { index: false } };
  return {
    title: `News & Insights – Page ${page}`,
    description: `Older market briefings and regulatory commentary from the ISFT research desk, page ${page}.`,
    alternates: { canonical: newsPageHref(page) },
  };
}

export default async function NewsArchivePage({ params }: { params: Promise<Params> }) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect('/news');

  const items = await getAllNewsItems();
  if ((page - 1) * NEWS_PAGE_SIZE >= items.length) notFound();

  return <NewsListing items={items} page={page} />;
}
