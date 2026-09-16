import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getItemBySlug, articles, newsItems, blogs, magazineIssues, specialReports } from '@/lib/data';
import type { Metadata } from 'next';

interface Params {
  section: string;
  slug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { section, slug } = await params;
  const item = getItemBySlug(section, slug) as Record<string, unknown> | null;
  if (!item) return { title: 'Not Found' };
  const title = (item.title as string) ?? (item.columnName as string) ?? 'Article';
  const excerpt = (item.excerpt as string) ?? (item.subtitle as string) ?? '';
  return {
    title,
    description: excerpt.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const params: Params[] = [
    ...articles.map(a => ({ section: 'articles', slug: a.slug })),
    ...newsItems.map(n => ({ section: 'news', slug: n.slug })),
    ...blogs.map(b => ({ section: 'blogs', slug: b.slug })),
    ...magazineIssues.map(m => ({ section: 'magazine', slug: m.slug })),
    ...specialReports.map(r => ({ section: 'special-reports', slug: r.slug })),
  ];
  return params;
}

const sectionMeta: Record<string, { label: string; href: string; color: string }> = {
  news: { label: 'News & Insights', href: '/news', color: '#4ade80' },
  articles: { label: 'Longform Articles', href: '/articles', color: 'var(--gold)' },
  blogs: { label: 'Creator Blogs', href: '/blogs', color: '#60a5fa' },
  magazine: { label: 'The Magazine', href: '/magazine', color: '#c084fc' },
  'special-reports': { label: 'Special Reports', href: '/special-reports', color: '#f87171' },
};

export default async function DetailPage({ params }: { params: Promise<Params> }) {
  const { section, slug } = await params;
  const item = getItemBySlug(section, slug) as Record<string, unknown> | null;
  if (!item) notFound();

  const meta = sectionMeta[section] ?? { label: 'Content', href: '/', color: 'var(--gold)' };

  // Derive title, date, author(s), category, body, tags
  const title = (item.title as string) ?? (item.columnName as string) ?? '';
  const subtitle = (item.subtitle as string) ?? '';
  const body = (item.body as string) ?? '';
  const date = (item.date as string) ?? '';
  const category = (item.category as string) ?? '';
  const tags: string[] = (item.tags as string[]) ?? [];
  const readTime = (item.readTime as string) ?? '';
  const pages = (item.pages as number) ?? null;

  // Author(s)
  const authorSingle = item.author as { name: string; initials: string; role: string; bureau?: string } | undefined;
  const authorsList = item.authors as { name: string; initials: string; role: string; bureau?: string }[] | undefined;
  const authors = authorsList ?? (authorSingle ? [authorSingle] : []);

  // Related items – pick 4 from same section
  const allSectionItems = { news: newsItems, articles, blogs, magazine: magazineIssues, 'special-reports': specialReports }[section] ?? [];
  const related = (allSectionItems as { slug: string; title?: string; columnName?: string; date?: string; category?: string }[])
    .filter((i) => i.slug !== slug)
    .slice(0, 4);

  // Blog-specific extras
  const columnName = (item.columnName as string) ?? null;
  const frequency = (item.frequency as string) ?? null;
  const readership = (item.readership as string) ?? null;

  // Magazine-specific
  const issueNumber = (item.issueNumber as string) ?? null;
  const contributors = (item.contributors as string[]) ?? null;

  // Report-specific
  const centralBanks = (item.centralBanks as number) ?? null;
  const transfers = (item.transfers as string) ?? null;
  const accessLevel = (item.accessLevel as string) ?? null;
  const format = (item.format as string) ?? null;

  // Parse body as markdown-like sections
  const sections = body.split('\n## ').map((s, i) => (i === 0 ? s : `## ${s}`));

  return (
    <div className="fade-in">
      {/* Breadcrumb */}
      <div style={{ background: 'var(--navy-800)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Academy</Link>
            <span>›</span>
            <Link href={meta.href} style={{ color: meta.color }}>{meta.label}</Link>
            <span>›</span>
            <span style={{ color: 'var(--slate-light)' }}>{title.substring(0, 50)}{title.length > 50 ? '...' : ''}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div style={{ background: 'var(--navy)', padding: '48px 0 36px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            {/* Section badge + meta */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: meta.color,
                background: `${meta.color}15`, border: `1px solid ${meta.color}40`,
                padding: '3px 10px', borderRadius: '2px',
              }}>
                {meta.label.toUpperCase()}
              </span>
              {category && <span className="category-badge">{category}</span>}
              {readTime && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--slate)' }}>{readTime}</span>}
              {pages && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--slate)' }}>{pages} Pages</span>}
              {date && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--slate)' }}>{date}</span>}
              {accessLevel && (
                <span className={`access-badge ${accessLevel}`}>
                  {accessLevel === 'open' ? 'Open Access' : accessLevel === 'institutional' ? 'Institutional' : 'Declassified'}
                </span>
              )}
            </div>

            {/* Title */}
            {columnName && (
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'var(--gold)', marginBottom: '8px', fontStyle: 'italic' }}>
                {columnName}
              </div>
            )}
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '16px' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: '16px', color: 'var(--slate-light)', lineHeight: 1.7, marginBottom: '24px' }}>{subtitle}</p>
            )}

            {/* Blog extras */}
            {(frequency || readership) && (
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {readership && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--slate)' }}>{readership}</div>}
                {frequency && <span className="freq-badge">{frequency}</span>}
              </div>
            )}

            {/* Magazine extras */}
            {issueNumber && (
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span className="category-badge">{issueNumber}</span>
                {contributors && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {contributors.map(c => <span key={c} className="tag">{c}</span>)}
                  </div>
                )}
              </div>
            )}

            {/* Report extras */}
            {(centralBanks || transfers) && (
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {centralBanks && (
                  <div className="stat-box" style={{ minWidth: '110px' }}>
                    <span className="stat-value" style={{ fontSize: '18px' }}>{centralBanks}</span>
                    <span className="stat-label">Central Banks</span>
                  </div>
                )}
                {transfers && (
                  <div className="stat-box" style={{ minWidth: '130px' }}>
                    <span className="stat-value" style={{ fontSize: '16px' }}>{transfers}</span>
                    <span className="stat-label">Transfers</span>
                  </div>
                )}
              </div>
            )}

            {/* Authors */}
            {authors.length > 0 && (
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
                {authors.map(a => (
                  <div key={a.name} className="author-row">
                    <div className="author-avatar" style={{ width: '38px', height: '38px', fontSize: '13px' }}>{a.initials}</div>
                    <div>
                      <div className="author-name">{a.name}</div>
                      <div className="author-role">{a.role}{a.bureau ? ` · ${a.bureau}` : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative cover band */}
      <div style={{
        height: '6px',
        background: `linear-gradient(90deg, ${meta.color}60 0%, ${meta.color}20 50%, transparent 100%)`,
      }} />

      {/* Main content area */}
      <div className="container" style={{ padding: '48px 24px 64px' }}>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          {/* Body content */}
          <article style={{ flex: 1, minWidth: 0 }}>
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
              {(section === 'special-reports' || section === 'magazine') && (
                <button className="btn btn-primary">Download PDF →</button>
              )}
              {format && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--slate)', display: 'flex', alignItems: 'center' }}>
                  Format: {format}
                </span>
              )}
              <button className="btn btn-outline btn-sm">Share</button>
              <button className="btn btn-outline btn-sm">Cite</button>
            </div>

            {/* Body text */}
            <div className="detail-content">
              {sections.map((section_text, idx) => {
                const lines = section_text.split('\n');
                return (
                  <div key={idx}>
                    {lines.map((line, li) => {
                      if (line.startsWith('## ')) {
                        return <h2 key={li}>{line.replace('## ', '')}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={li}>{line.replace('### ', '')}</h3>;
                      } else if (line.startsWith('> ')) {
                        return <blockquote key={li}>{line.replace('> ', '')}</blockquote>;
                      } else if (line.trim() === '') {
                        return null;
                      } else {
                        return <p key={li}>{line}</p>;
                      }
                    })}
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Keywords & Tags
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            )}

            {/* Author bio card */}
            {authors.length > 0 && (
              <div style={{ marginTop: '40px', background: 'var(--navy-700)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
                  About the Author{authors.length > 1 ? 's' : ''}
                </div>
                {authors.map(a => (
                  <div key={a.name} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <div className="author-avatar" style={{ width: '48px', height: '48px', fontSize: '16px', flexShrink: 0 }}>{a.initials}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 600, color: 'var(--cream)', marginBottom: '4px' }}>{a.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gold)', marginBottom: '8px' }}>{a.role}{a.bureau ? ` · ${a.bureau}` : ''}</div>
                      <p style={{ fontSize: '12px', color: 'var(--slate)', lineHeight: 1.7 }}>
                        Senior research fellow and contributing editor at DerivionAcademy.in, specializing in institutional macroeconomics and quantitative sovereign analysis.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href={meta.href} className="btn btn-outline">← Back to {meta.label}</Link>
              <Link href="/" className="btn btn-ghost">Academy Home</Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            {/* Related content */}
            {related.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-title">Related {meta.label}</div>
                {related.map(r => (
                  <Link key={r.slug} href={`/${section}/${r.slug}`}>
                    <div className="related-item">
                      <div className="related-title">{r.title ?? r.columnName}</div>
                      <div style={{ fontSize: '10px', color: 'var(--slate)', marginTop: '4px' }}>
                        {r.category ?? ''} {r.date ? `· ${r.date}` : ''}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Newsletter subscribe */}
            <div className="sidebar-card">
              <div className="sidebar-title">INSTITUTIONAL ACCESS</div>
              <p style={{ fontSize: '12px', color: 'var(--slate)', lineHeight: 1.7, marginBottom: '16px' }}>
                Receive bi-modal delivery and morning intelligence briefs direct to your sovereign desk.
              </p>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="name@institution.com"
                  style={{
                    background: 'var(--navy-600)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius)', padding: '10px 12px', fontSize: '12px',
                    color: 'var(--cream)', outline: 'none', fontFamily: 'var(--font-sans)',
                  }}
                />
                <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Join →</button>
              </form>
            </div>

            {/* Section navigator */}
            <div className="sidebar-card">
              <div className="sidebar-title">BROWSE SECTIONS</div>
              {Object.entries(sectionMeta).map(([key, val]) => (
                <Link key={key} href={val.href}>
                  <div style={{
                    padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  }}>
                    <div style={{ width: '3px', height: '14px', background: val.color, borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'var(--slate-light)', transition: 'color 0.2s' }}>{val.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          article + aside { width: 100% !important; }
          .container > div[style*='display: flex'][style*='gap: 48px'] {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
