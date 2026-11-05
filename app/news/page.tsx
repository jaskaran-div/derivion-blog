import { getAllNewsItems } from '@/lib/autoNews';
import NewsListing from '@/components/NewsListing';
import type { Metadata } from 'next';

// Automated posts from the backend appear within five minutes, without a rebuild.
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Regulatory developments, central bank communications and market commentary from the ISFT research desk.',
  alternates: { canonical: '/news' },
};

export default async function NewsPage() {
  const newsItems = await getAllNewsItems();
  return <NewsListing items={newsItems} page={1} />;
}
