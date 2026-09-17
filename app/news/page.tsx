import Link from 'next/link';
import { newsItems } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Insights | DerivionAcademy.in',
  description: 'Real-time regulatory dispatches, central bank communications, and systemic market intelligence from the ISFT research desk.',
};

export default function NewsPage() {
  const categories = ['All Feeds', 'Macro Policy', 'Regulatory Briefs', 'Risk Infrastructure', 'Market Watch'];

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

        {/* Category pills – static display */}
        <div className="filter-pills-bar" style={{ marginBottom: '32px' }}>
          {categories.map((cat, i) => (
            <span key={cat} className={`filter-pill${i === 0 ? ' active' : ''}`}>{cat}</span>
          ))}
        </div>

        {newsItems.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {newsItems.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  display: 'grid',
                  gridTemplateColumns: '5px 1fr',
                }}
                  className="news-list-card"
                >
                  {/* Accent stripe */}
                  <div style={{ background: 'var(--ochre)', flexShrink: 0 }} />

                  <div style={{ padding: 'clamp(20px,3vw,30px)' }}>
                    {/* Top row: category + date + tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ochre-dark)', background: 'var(--ochre-bg)', border: '1px solid var(--ochre-border)', padding: '3px 10px', borderRadius: '999px' }}>
                        {item.category}
                      </span>
                      {item.dataTag && (
                        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff', background: '#1d4ed8', padding: '3px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7dd3fc', display: 'inline-block' }} />
                          {item.dataTag}
                        </span>
                      )}
                      <span style={{ marginLeft: 'auto', fontSize: '10.5px', color: 'var(--ink-muted)', fontWeight: 500 }}>{item.date}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{ fontSize: 'clamp(16px,2vw,21px)', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.25, marginBottom: '10px', letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.65, marginBottom: '16px', maxWidth: '780px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {item.tags.slice(0, 5).map(tag => (
                        <span key={tag} style={{ fontSize: '9.5px', color: 'var(--ink-muted)', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: 'var(--radius-xs)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-light)', gap: '10px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--ink-black)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9.5px', fontWeight: 800, flexShrink: 0 }}>
                          {item.author.initials}
                        </div>
                        <div>
                          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink-black)' }}>{item.author.name}</div>
                          <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>{item.author.bureau}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ochre-dark)' }}>
                        Read Dispatch →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          /* No items yet */
          <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '48px 32px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ochre-dark)', marginBottom: '10px' }}>
              ● IN PREPARATION
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink-black)', marginBottom: '10px' }}>
              We are gathering interesting &amp; latest info for you
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', maxWidth: '540px', margin: '0 auto 24px', lineHeight: 1.65 }}>
              Our market intelligence desk is continuously tracking real-time circulars, SEBI/RBI updates, and exchange telemetry. New dispatches will appear here once verified.
            </p>
            <Link href="/blogs" className="btn-black" style={{ borderRadius: '999px', padding: '10px 24px' }}>
              Explore Creator Blogs →
            </Link>
          </div>
        )}
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
