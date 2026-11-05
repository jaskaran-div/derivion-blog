import type { MetadataRoute } from 'next';
import { blogs } from '@/lib/data';
import { getAllNewsItems } from '@/lib/autoNews';
import { NEWS_PAGE_SIZE, absoluteUrl, contentDate } from '@/lib/site';

// Picks up automated News & Insights posts without a rebuild, like the listing pages.
export const revalidate = 300;

function lastModified(item: { date: string; publishedAt?: string }): Date | undefined {
  return contentDate(item.publishedAt ?? item.date) ?? undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getAllNewsItems();
  const newsPages = Math.max(1, Math.ceil(news.length / NEWS_PAGE_SIZE));
  const latest = news[0] ? lastModified(news[0]) : undefined;

  return [
    { url: absoluteUrl('/'), lastModified: latest, changeFrequency: 'daily', priority: 1 },
    { url: absoluteUrl('/news'), lastModified: latest, changeFrequency: 'daily', priority: 0.9 },
    ...Array.from({ length: newsPages - 1 }, (_, index) => ({
      url: absoluteUrl(`/news/page/${index + 2}`),
      changeFrequency: 'daily' as const,
      priority: 0.4,
    })),
    { url: absoluteUrl('/blogs'), lastModified: blogs[0] ? lastModified(blogs[0]) : undefined, changeFrequency: 'weekly', priority: 0.8 },
    ...news.map(item => ({
      url: absoluteUrl(`/news/${item.slug}`),
      lastModified: lastModified(item),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogs.map(item => ({
      url: absoluteUrl(`/blogs/${item.slug}`),
      lastModified: lastModified(item),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
