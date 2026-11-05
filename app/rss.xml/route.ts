import { blogs } from '@/lib/data';
import { getAllNewsItems } from '@/lib/autoNews';
import { PUBLISHER_NAME, SITE_DESCRIPTION, SITE_NAME, absoluteUrl, contentDate } from '@/lib/site';

// New automated posts appear in the feed within five minutes, like the listing pages.
export const revalidate = 300;

const FEED_LENGTH = 50;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const news = await getAllNewsItems();
  const entries = [
    ...news.map(item => ({
      title: item.title,
      path: `/news/${item.slug}`,
      description: item.excerpt,
      date: contentDate('publishedAt' in item && typeof item.publishedAt === 'string' ? item.publishedAt : item.date),
      category: 'News & Insights',
    })),
    ...blogs.map(item => ({
      title: item.title,
      path: `/blogs/${item.slug}`,
      description: item.excerpt,
      date: contentDate(item.date),
      category: 'Blogs',
    })),
  ]
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .slice(0, FEED_LENGTH);

  const items = entries.map(entry => {
    const url = absoluteUrl(entry.path);
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(entry.description)}</description>
      <category>${escapeXml(entry.category)}</category>${entry.date ? `
      <pubDate>${entry.date.toUTCString()}</pubDate>` : ''}
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(absoluteUrl('/'))}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-in</language>
    <managingEditor>info@derivion.in (${escapeXml(PUBLISHER_NAME)})</managingEditor>
    <atom:link href="${escapeXml(absoluteUrl('/rss.xml'))}" rel="self" type="application/rss+xml" />${entries[0]?.date ? `
    <lastBuildDate>${entries[0].date.toUTCString()}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
