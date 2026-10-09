'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '@/lib/data';
import Pagination from '@/components/Pagination';

const categories = ['All Feeds', 'Macro Policy', 'Regulatory Briefs', 'Risk Infrastructure', 'Market Watch'] as const;
type NewsCategory = typeof categories[number];
const ITEMS_PER_PAGE = 8;

const categoryTags: Record<Exclude<NewsCategory, 'All Feeds'>, string[]> = {
  'Macro Policy': ['Macro'],
  'Regulatory Briefs': ['Fed', 'Federal Reserve', 'ECB', 'RBA', 'BOE', 'SNB', 'RBI', 'SEBI'],
  'Risk Infrastructure': ['Risk', 'Global Risk'],
  'Market Watch': ['Markets', 'Market Outlook', 'Equities', 'Oil', 'Bitcoin', 'FX', 'Treasuries', 'Bonds', 'Gold', 'Dollar'],
};

function matchesCategory(item: NewsItem, category: NewsCategory): boolean {
  if (category === 'All Feeds') return true;
  if (category === 'Macro Policy' && item.category === category) return true;

  const expectedTags = categoryTags[category].map(tag => tag.toLowerCase());
  return item.tags.some(tag => expectedTags.includes(tag.toLowerCase()));
}

export default function NewsFeed({ items }: { items: NewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All Feeds');
  const [currentPage, setCurrentPage] = useState(1);
  const filteredItems = items.filter(item => matchesCategory(item, activeCategory));
  const pageItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <div className="filter-pills-bar" role="group" aria-label="Filter news by category" style={{ marginBottom: '12px' }}>
        {categories.map(category => {
          const count = items.filter(item => matchesCategory(item, category)).length;
          return (
            <button
              key={category}
              type="button"
              className={`filter-pill${activeCategory === category ? ' active' : ''}`}
              aria-pressed={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
            >
              {category} <span aria-hidden="true">({count})</span>
            </button>
          );
        })}
      </div>

      <p id="news-feed-results" aria-live="polite" style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '20px', scrollMarginTop: '20px' }}>
        Showing {pageItems.length} of {filteredItems.length} dispatches
      </p>

      {filteredItems.length > 0 ? (
        <div aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pageItems.map((item) => {
            const isLead = item.id === items[0]?.id;
            return (
              <Link key={item.id} href={`/news/${item.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <article
                  className="news-list-card"
                  style={{
                    background: '#ffffff',
                    border: isLead ? '2px solid rgba(234, 179, 8, 0.55)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: isLead ? '0 16px 38px rgba(15, 23, 42, 0.12)' : 'var(--shadow-card)',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    display: 'grid',
                    gridTemplateColumns: '5px 1fr',
                    position: 'relative',
                  }}
                >
                  <div style={{ background: isLead ? 'linear-gradient(180deg, #f59e0b, #d97706)' : 'var(--ochre)', flexShrink: 0 }} />
                  <div style={{ padding: 'clamp(20px,3vw,30px)' }}>
                    {item.coverImage && (
                      <div style={{ position: 'relative', aspectRatio: '16 / 7', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                        <Image
                          src={item.coverImage}
                          alt={`${item.title} cover image`}
                          fill
                          sizes="(max-width: 768px) 100vw, 760px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
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
                      {isLead && (
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7c2d12', background: '#fef3c7', border: '1px solid #facc15', padding: '4px 8px', borderRadius: '999px' }}>
                          Latest
                        </span>
                      )}
                      <span style={{ marginLeft: 'auto', fontSize: '10.5px', color: 'var(--ink-muted)', fontWeight: 500 }}>{item.date}</span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(16px,2vw,21px)', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.25, marginBottom: '10px' }}>
                      {item.title}
                    </h2>
                    <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.65, marginBottom: '16px', maxWidth: '780px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.excerpt}
                    </p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {item.tags.slice(0, 5).map(tag => (
                        <span key={tag} style={{ fontSize: '9.5px', color: 'var(--ink-muted)', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: 'var(--radius-xs)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

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
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ochre-dark)' }}>Read Dispatch →</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '40px 28px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink-black)', marginBottom: '8px' }}>No matching dispatches</h2>
          <p style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>Choose another feed to see its news.</p>
        </div>
      )}

      <Pagination
        totalItems={filteredItems.length}
        currentPage={currentPage}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        scrollTargetId="news-feed-results"
      />

      <style jsx>{`
        .news-list-card:hover {
          box-shadow: var(--shadow-hover) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}