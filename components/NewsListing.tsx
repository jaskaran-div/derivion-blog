import Link from 'next/link';
import NewsFeed from '@/components/NewsFeed';
import type { NewsItem } from '@/lib/data';
import { NEWS_PAGE_SIZE } from '@/lib/site';

/** The News & Insights listing shared by /news and /news/page/[page]. */
export default function NewsListing({ items, page }: { items: NewsItem[]; page: number }) {
  const totalPages = Math.max(1, Math.ceil(items.length / NEWS_PAGE_SIZE));
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container">

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '20px' }}>
          <Link href="/">Home</Link> <span>›</span>
          {page > 1 ? (
            <>
              <Link href="/news">News &amp; Insights</Link> <span>›</span>
              <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>Page {page}</span>
            </>
          ) : (
            <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>News &amp; Insights</span>
          )}
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="eyebrow-text">DAILY MARKET BRIEFINGS</div>
          <h1 className="page-title">News &amp; Insights{page > 1 ? ` – Page ${page} of ${totalPages}` : ''}</h1>
          <p className="page-subtitle">
            Regulatory developments, central bank communications and market commentary from the ISFT research desk.
          </p>
        </div>

        <NewsFeed items={items} page={page} />
      </div>
    </div>
  );
}
