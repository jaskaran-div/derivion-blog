import Link from 'next/link';
import { newsItems } from '@/lib/data';
import NewsFeed from '@/components/NewsFeed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Insights | DerivionAcademy.in',
  description: 'Real-time regulatory dispatches, central bank communications, and systemic market intelligence from the ISFT research desk.',
};

export default function NewsPage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container">

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '20px' }}>
          <Link href="/">Home</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>News &amp; Insights</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="eyebrow-text">REAL-TIME DISPATCHES &amp; EDITORIAL WIRE</div>
          <h1 className="page-title">News &amp; Insights</h1>
          <p className="page-subtitle">
            Fast-moving regulatory developments, central bank communications, and systemic market infrastructure intelligence.
          </p>
        </div>

        <NewsFeed items={newsItems} />
      </div>

      <style>{`
        .news-list-card:hover {
          box-shadow: var(--shadow-hover) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
