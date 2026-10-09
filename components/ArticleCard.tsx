import Link from 'next/link';
import type { Article } from '@/lib/data';

interface Props {
  article: Article;
  variant?: 'default' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const href = `/articles/${article.slug}`;

  if (variant === 'compact') {
    return (
      <Link href={href}>
        <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="card-meta">
              <span className="category-badge">{article.category}</span>
              <span className="text-xs text-slate">{article.readTime}</span>
            </div>
            <h3 className="card-title" style={{ fontSize: '16px' }}>{article.title}</h3>
            <p className="card-excerpt" style={{ fontSize: '12px' }}>{article.excerpt}</p>
            <div className="card-footer" style={{ marginTop: 'auto' }}>
              <div className="author-row">
                <div className="author-avatar">{article.author.initials}</div>
                <div>
                  <div className="author-name">{article.author.name}</div>
                  <div className="author-role">{article.author.role}</div>
                </div>
              </div>
              <span className="read-more">Read Essay →</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <div className="card fade-in" style={{ cursor: 'pointer' }}>
        {/* Decorative cover placeholder */}
        <div style={{
          width: '100%', height: '200px',
          background: 'linear-gradient(135deg, var(--navy-600) 0%, var(--navy-500) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(201,168,76,0.03) 10px, rgba(201,168,76,0.03) 20px)',
          }} />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 800, color: 'rgba(201,168,76,0.15)', letterSpacing: '-2px' }}>DA</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--slate)', letterSpacing: '0.2em', marginTop: '4px' }}>DERIVION ACADEMY</div>
          </div>
        </div>

        <div className="card-body">
          <div className="card-meta">
            <span className="category-badge">{article.category}</span>
            <span className="text-xs text-slate">{article.readTime}</span>
            <span className="text-xs text-slate">·</span>
            <span className="text-xs text-slate">{article.date}</span>
          </div>
          <h2 className="card-title">{article.title}</h2>
          <p className="card-excerpt">{article.excerpt}</p>
          <div className="card-footer">
            <div className="author-row">
              <div className="author-avatar">{article.author.initials}</div>
              <div>
                <div className="author-name">{article.author.name}</div>
                <div className="author-role">{article.author.role}</div>
              </div>
            </div>
            <span className="read-more">Read Essay →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
