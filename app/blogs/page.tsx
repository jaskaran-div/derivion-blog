'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { blogs, BlogColumn } from '@/lib/data';
import EmptyState from '@/components/EmptyState';

const categoryMap: Record<string, string[]> = {
  'All Blogs': [],
  'Forex & Regulations': ['Forex', 'RBI Regulations', 'FEMA', 'Currency Derivatives'],
  'Exchange Architecture': ['Calcutta Stock Exchange', 'SEBI', 'Regional Exchanges', 'GIFT City', 'Capital Markets'],
  'Financial Education': ['Financial Education', 'Trading Desks', 'NAAC Benchmarks', 'NIRF Optimization'],
  'F&O Derivatives': ['F&O Trading', 'Career Development', 'Risk Psychology', 'Prop Desks', 'Nifty Spreads'],
  'Trading Psychology': ['Trading Psychology', 'Drawdown Recovery', 'Risk Management', 'Anti-Fragility', 'Discipline'],
};

export default function CreatorBlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Blogs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Category filter
      if (activeCategory !== 'All Blogs') {
        const requiredTags = categoryMap[activeCategory] || [];
        const hasTag = requiredTags.some((tag) => blog.tags.includes(tag));
        if (!hasTag) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = blog.title.toLowerCase().includes(q);
        const matchesExcerpt = blog.excerpt.toLowerCase().includes(q);
        const matchesBody = blog.body.toLowerCase().includes(q);
        const matchesTags = blog.tags.some((t) => t.toLowerCase().includes(q));
        const matchesAuthor = blog.author.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesBody && !matchesTags && !matchesAuthor) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  // Featured blog (usually blog-1 or first matching)
  const featuredBlog = filteredBlogs[0];
  const secondaryBlogs = filteredBlogs.slice(1);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: 'var(--ink-muted)',
          marginBottom: '20px',
        }}>
          <Link href="/">Home</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>Creator Blogs</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow-text">
            THE HEDGE FRONT · DISPATCHES & EDITORIAL ESSAYS
          </div>
          <h1 className="page-title">
            The Hedge Front & Creator Blogs
          </h1>
          <p className="page-subtitle">
            First-person research essays, regulatory investigations, and market structure dispatches curated by the ISFT Editorial Desk.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="blogs-filter-container">
          <div className="filter-pills-bar" style={{ margin: 0, border: 'none', padding: 0 }}>
            {Object.keys(categoryMap).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blogs-search-wrapper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search blogs, topics, regulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blogs-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="blogs-search-clear">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {filteredBlogs.length === 0 ? (
          <EmptyState
            sectionName="Creator Blogs"
            categoryName={activeCategory !== 'All Blogs' ? activeCategory : undefined}
            title="We are gathering interesting and latest info for you"
            description={`No publications found matching "${searchQuery || activeCategory}". Our editorial desk is compiling fresh research on this topic. Check back shortly!`}
            actionText="Clear Search & View All Blogs"
            actionHref="/blogs"
          />
        ) : (
          <div>
            {/* FEATURED LEAD BLOG */}
            {featuredBlog && (
              <section style={{ marginBottom: '40px' }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ochre-dark)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span className="dot-ochre" /> LEAD DISPATCH · THE HEDGE FRONT
                </div>

                <div className="featured-blog-card">
                  <div className="featured-blog-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <span className="featured-blog-badge">
                        {featuredBlog.columnName}
                      </span>
                      <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c2d12', background: '#fef3c7', border: '1px solid #facc15', padding: '4px 8px', borderRadius: '999px' }}>
                        Latest
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                        {featuredBlog.date}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>•</span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                        {featuredBlog.readTime || '6 min read'}
                      </span>
                    </div>

                    <h2 className="featured-blog-title">
                      <Link href={`/blogs/${featuredBlog.slug}`}>
                        {featuredBlog.title}
                      </Link>
                    </h2>

                    <p className="featured-blog-excerpt">
                      {featuredBlog.excerpt}
                    </p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '22px' }}>
                      {featuredBlog.tags.map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="featured-blog-footer">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar-circle" style={{ width: '34px', height: '34px', fontSize: '11px' }}>
                          {featuredBlog.author.initials}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-black)' }}>
                            {featuredBlog.author.name}
                          </div>
                          <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                            {featuredBlog.author.role}
                          </div>
                        </div>
                      </div>

                      <Link href={`/blogs/${featuredBlog.slug}`} className="btn-black" style={{ padding: '8px 20px', borderRadius: '9999px' }}>
                        Read Dispatch →
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SECONDARY BLOGS GRID */}
            {secondaryBlogs.length > 0 && (
              <section>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '16px',
                }}>
                  ADDITIONAL DISPATCHES ({secondaryBlogs.length})
                </div>

                <div className="blogs-grid">
                  {secondaryBlogs.map((b) => (
                    <article key={b.id} className="blog-card">
                      <div className="blog-card__inner">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <span className="blog-column-pill">
                            {b.columnName}
                          </span>
                          <span style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                            {b.readTime || '6 min read'}
                          </span>
                        </div>

                        <h3 className="blog-card__title">
                          <Link href={`/blogs/${b.slug}`}>
                            {b.title}
                          </Link>
                        </h3>

                        <p className="blog-card__excerpt">
                          {b.excerpt}
                        </p>

                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                          {b.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="blog-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="blog-card__footer">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '10px' }}>
                            {b.author.initials}
                          </div>
                          <div>
                            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink-black)' }}>
                              {b.author.name}
                            </div>
                            <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>
                              {b.date}
                            </div>
                          </div>
                        </div>

                        <Link href={`/blogs/${b.slug}`} className="blog-card__read-link">
                          Read →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .blogs-filter-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .blogs-search-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          padding: 6px 14px;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          transition: border-color 0.15s ease;
        }

        .blogs-search-wrapper:focus-within {
          border-color: var(--ochre);
        }

        .blogs-search-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 12px;
          color: var(--ink-black);
          width: 100%;
        }

        .blogs-search-clear {
          color: var(--ink-muted);
          font-size: 11px;
          padding: 2px 6px;
        }

        .featured-blog-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: clamp(24px, 4vw, 36px);
          box-shadow: var(--shadow-card);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .featured-blog-card:hover {
          box-shadow: var(--shadow-hover);
        }

        .featured-blog-badge {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          padding: 3px 10px;
          border-radius: 9999px;
        }

        .featured-blog-title {
          font-family: var(--font-serif);
          font-size: clamp(22px, 3.2vw, 32px);
          font-weight: 800;
          color: var(--ink-black);
          line-height: 1.25;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .featured-blog-title a:hover {
          color: var(--ochre-dark);
        }

        .featured-blog-excerpt {
          font-size: clamp(13.5px, 1.8vw, 15px);
          line-height: 1.65;
          color: var(--ink-secondary);
          margin-bottom: 20px;
          max-width: 880px;
        }

        .featured-blog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid var(--border-light);
          gap: 16px;
          flex-wrap: wrap;
        }

        .blog-tag {
          font-size: 10px;
          color: var(--ink-secondary);
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 2px 8px;
          border-radius: var(--radius-xs);
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
          gap: 24px;
        }

        .blog-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-card);
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .blog-card:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
          box-shadow: var(--shadow-hover);
        }

        .blog-card__inner {
          padding: 24px 24px 16px;
        }

        .blog-column-pill {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f172a;
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .blog-card__title {
          font-family: var(--font-serif);
          font-size: clamp(17px, 2vw, 20px);
          font-weight: 700;
          color: var(--ink-black);
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .blog-card__title a:hover {
          color: var(--ochre-dark);
        }

        .blog-card__excerpt {
          font-size: 12.5px;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card__footer {
          padding: 14px 24px;
          background: #fbfbfa;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .blog-card__read-link {
          font-size: 12px;
          font-weight: 700;
          color: var(--ochre-dark);
          transition: transform 0.15s ease;
        }

        .blog-card__read-link:hover {
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .blogs-filter-container {
            flex-direction: column;
            align-items: stretch;
          }
          .blogs-search-wrapper {
            max-width: 100%;
          }
          .blogs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
