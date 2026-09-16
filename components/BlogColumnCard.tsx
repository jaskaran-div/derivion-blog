import Link from 'next/link';
import type { BlogColumn } from '@/lib/data';

interface Props {
  blog: BlogColumn;
  variant?: 'featured' | 'grid';
}

export default function BlogColumnCard({ blog, variant = 'grid' }: Props) {
  const href = `/blogs/${blog.slug}`;

  if (variant === 'featured') {
    return (
      <Link href={href}>
        <div className="blog-col-card" style={{ height: '100%' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div className="author-avatar" style={{ width: '40px', height: '40px', fontSize: '14px', flexShrink: 0 }}>
              {blog.author.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--gold)', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', padding: '1px 6px', borderRadius: '2px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  SURFACE
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--slate)', letterSpacing: '0.08em' }}>
                  {blog.readership}
                </span>
                <span className="freq-badge">{blog.frequency}</span>
              </div>
              <div className="author-name">{blog.author.name}</div>
              <div className="author-role">{blog.author.role}</div>
            </div>
          </div>

          <div className="gold-rule" />

          <h3 className="blog-col-title">{blog.columnName}</h3>
          <p className="blog-col-excerpt">{blog.excerpt}</p>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--slate)' }}>Latest: {blog.date}</span>
            <span className="read-more" style={{ fontSize: '11px' }}>View Column →</span>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant
  return (
    <Link href={href}>
      <div className="card fade-in" style={{ cursor: 'pointer', padding: '20px', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span className="category-badge" style={{ fontSize: '8px' }}>{blog.tags[0]}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--slate)' }}>
            {blog.dispatches} Dispatches
          </span>
        </div>
        <h3 className="card-title" style={{ fontSize: '16px' }}>{blog.columnName}</h3>
        <p style={{ fontSize: '11px', color: 'var(--gold)', marginBottom: '6px' }}>by {blog.author.name}</p>
        <p className="card-excerpt" style={{ fontSize: '12px' }}>{blog.excerpt}</p>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '10px', color: 'var(--slate)' }}>updated {blog.date}</span>
          <span className="read-more" style={{ fontSize: '11px' }}>Explore Blog →</span>
        </div>
      </div>
    </Link>
  );
}
