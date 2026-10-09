'use client';
import Link from 'next/link';
import type { NewsItem } from '@/lib/data';

interface Props {
  item: NewsItem;
  featured?: boolean;
}

export default function NewsItemCard({ item, featured = false }: Props) {
  const href = `/news/${item.slug}`;

  if (featured) {
    return (
      <Link href={href}>
        <div className="card fade-in" style={{ cursor: 'pointer', height: '100%' }}>
          <div style={{
            height: '180px',
            background: 'linear-gradient(160deg, var(--navy-600) 0%, var(--navy-500) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(10,15,30,0.8))' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 16, zIndex: 1 }}>
              <span className="category-badge">{item.category}</span>
            </div>
          </div>
          <div className="card-body">
            <h3 className="card-title" style={{ fontSize: '17px', marginBottom: '8px' }}>{item.title}</h3>
            <p className="card-excerpt" style={{ fontSize: '12px' }}>{item.excerpt}</p>
            <div className="card-footer">
              <div className="author-row">
                <div className="author-avatar">{item.author.initials}</div>
                <div>
                  <div className="author-name">{item.author.name}</div>
                  <div className="author-role">{item.author.role}</div>
                </div>
              </div>
              {item.dataTag && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: 'var(--gold)', background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  padding: '2px 8px', borderRadius: '2px',
                }}>{item.dataTag}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // List row variant
  return (
    <Link href={href}>
      <div className="news-item fade-in">
        <div className="news-date-col">
          <div className="news-date">{item.date}</div>
          <div style={{ marginTop: '4px' }}>
            <span className="category-badge" style={{ fontSize: '8px' }}>{item.category}</span>
          </div>
        </div>
        <div>
          <h3 className="news-title">{item.title}</h3>
          <p className="news-desc">{item.excerpt}</p>
          <div className="news-meta">
            <div className="author-row">
              <div className="author-avatar" style={{ width: '22px', height: '22px', fontSize: '9px' }}>{item.author.initials}</div>
              <span style={{ fontSize: '11px', color: 'var(--slate-light)' }}>{item.author.name}</span>
            </div>
            {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
            {item.dataTag && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                color: 'var(--gold)', background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '2px 8px', borderRadius: '2px',
              }}>{item.dataTag}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
