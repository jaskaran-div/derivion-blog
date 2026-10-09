import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '@/lib/data';
import type { Metadata } from 'next';

interface Params {
  slug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = blogs.find((b) => b.slug === slug);
  if (!item) return { title: 'Not Found | Derivion Academy' };
  return {
    title: `${item.title} – ${item.columnName}`,
    description: item.excerpt.substring(0, 160),
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: 'article',
      publishedTime: item.date,
      authors: [item.author.name],
    },
  };
}

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

// Markdown renderer helper for clean typography on parchment background
function renderBlogContent(body: string) {
  const lines = body.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (!inList) return;
    if (listType === 'ol') {
      elements.push(
        <ol key={key} className="hf-ordered-list">
          {listItems.map((it, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(it) }} />
          ))}
        </ol>
      );
    } else {
      elements.push(
        <ul key={key} className="hf-unordered-list">
          {listItems.map((it, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(it) }} />
          ))}
        </ul>
      );
    }
    inList = false;
    listItems = [];
  };

  const flushTable = (key: string) => {
    if (!inTable) return;
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1).filter((r) => !r.every((c) => c.match(/^:?-+:?$/)));
      elements.push(
        <div key={key} className="hf-table-container">
          <table className="hf-table">
            <thead>
              <tr>
                {headerRow.map((col, idx) => (
                  <th key={idx} dangerouslySetInnerHTML={{ __html: formatInline(col.trim()) }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((col, cIdx) => (
                    <td key={cIdx} dangerouslySetInnerHTML={{ __html: formatInline(col.trim()) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    inTable = false;
    tableRows = [];
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="hf-code">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList(`list-${i}`);
      flushTable(`table-${i}`);
      continue;
    }

    // Markdown Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(`list-${i}`);
      inTable = true;
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      // Skip separator row like |:---|:---|
      if (!cells.every((c) => /^:?-+:?$/.test(c))) {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable(`table-${i}`);
    }

    // Numbered list (e.g., 1. Item)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        flushList(`list-${i}`);
        inList = true;
        listType = 'ol';
      }
      listItems.push(olMatch[2]);
      continue;
    }

    // Unordered list (e.g., - Item or ● Item)
    const ulMatch = trimmed.match(/^[-*●]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        flushList(`list-${i}`);
        inList = true;
        listType = 'ul';
      }
      listItems.push(ulMatch[1]);
      continue;
    }

    // Otherwise flush list if was open
    flushList(`list-${i}`);

    // Horizontal Rule
    if (trimmed === '---') {
      elements.push(<hr key={`hr-${i}`} className="hf-divider" />);
      continue;
    }

    // Heading 4 (Disclaimers etc.)
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="hf-heading-4">
          {trimmed.replace(/^####\s+/, '')}
        </h4>
      );
      continue;
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="hf-heading-3">
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
      continue;
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="hf-heading-2">
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
      continue;
    }

    // Regular paragraph
    // Check if it's the disclaimer section
    const isDisclaimer = trimmed.toLowerCase().includes('this article is strictly for educational') || trimmed.toLowerCase().includes('disclaimers');
    elements.push(
      <p
        key={`p-${i}`}
        className={isDisclaimer ? 'hf-disclaimer-paragraph' : 'hf-paragraph'}
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  }

  flushList('list-end');
  flushTable('table-end');
  return elements;
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = blogs.find((b) => b.slug === slug);
  if (!item) notFound();

  // Find index and next/prev blogs
  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  const otherBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <div className="blog-detail-viewport">
      <div className="container">
        {/* Top Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="blog-breadcrumb">
          <Link href="/">Home</Link>
          <span className="blog-breadcrumb__sep">›</span>
          <Link href="/blogs" className="blog-breadcrumb__parent">Creator Blogs</Link>
          <span className="blog-breadcrumb__sep">›</span>
          <span className="blog-breadcrumb__current">{item.title}</span>
        </nav>

        {/* Back link & Dispatch Metadata */}
        <div className="blog-top-bar">
          <Link href="/blogs" className="blog-back-btn">
            ← Back to All Blogs
          </Link>
          <div className="blog-meta-tags">
            <span className="blog-meta-tag">{item.columnName}</span>
            <span className="blog-meta-tag">{item.readTime || '6 min read'}</span>
            <span className="blog-meta-tag">{item.date}</span>
          </div>
        </div>

        {/* ============================================================
            MAIN BLOG DETAILING SHEET WITH PARCHMENT & COLUMN BACKGROUND
            Matches user's reference image and layout!
            ============================================================ */}
        <article className="hedge-front-paper-sheet">
          {/* Header row: Logo on left, Title on right */}
          <header className="hedge-front-header">
            <div className="hedge-front-branding">
              <div className="hedge-front-logo-sub">THE</div>
              <div className="hedge-front-logo-main">Hedge</div>
              <div className="hedge-front-logo-footer">
                <span className="hedge-front-logo-front">FRONT</span>
                <span className="hedge-front-logo-by">BLOG BY ISFT</span>
              </div>
            </div>

            <div className="hedge-front-title-container">
              <h1 className="hedge-front-main-title">
                {item.title}
              </h1>
            </div>
          </header>

          {/* Subtitle / Teaser in italic serif */}
          {item.subtitle && (
            <div className="hedge-front-subtitle-box">
              <p className="hedge-front-subtitle-text">
                {item.subtitle}
              </p>
            </div>
          )}

          {/* Body Content */}
          <div className="hedge-front-content-area">
            {renderBlogContent(item.body)}
          </div>

          {/* Tags */}
          <div className="hedge-front-tags-container">
            <div className="hedge-front-tags-label">INDEXED TOPICS:</div>
            <div className="hedge-front-tags-list">
              {item.tags.map((tag) => (
                <span key={tag} className="hedge-front-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Byline Box */}
          <footer className="hedge-front-author-box">
            <div className="hedge-front-author-avatar">
              {item.author.initials}
            </div>
            <div className="hedge-front-author-info">
              <div className="hedge-front-author-name">{item.author.name}</div>
              <div className="hedge-front-author-role">{item.author.role} • {item.author.bureau || 'The Hedge Front'}</div>
              <div className="hedge-front-author-desc">
                Official research dispatch published under the Derivion Academy syndicate. Verified financial analysis, econometric investigations, and market structures.
              </div>
            </div>
          </footer>
        </article>

        {/* ============================================================
            NEXT / PREVIOUS NAVIGATION & RECOMMENDED DISPATCHES
            ============================================================ */}
        <div className="blog-pagination-nav">
          {prevBlog ? (
            <Link href={`/blogs/${prevBlog.slug}`} className="blog-pagination-card prev">
              <span className="blog-pagination-label">← PREVIOUS DISPATCH</span>
              <span className="blog-pagination-title">{prevBlog.title}</span>
            </Link>
          ) : <div />}

          {nextBlog ? (
            <Link href={`/blogs/${nextBlog.slug}`} className="blog-pagination-card next">
              <span className="blog-pagination-label">NEXT DISPATCH →</span>
              <span className="blog-pagination-title">{nextBlog.title}</span>
            </Link>
          ) : <div />}
        </div>

        {/* Read more from The Hedge Front */}
        {otherBlogs.length > 0 && (
          <section className="more-dispatches-section">
            <div className="more-dispatches-header">
              <span className="dot-ochre" /> MORE FROM THE HEDGE FRONT
            </div>
            <div className="more-dispatches-grid">
              {otherBlogs.map((b) => (
                <Link key={b.id} href={`/blogs/${b.slug}`} className="more-dispatch-card">
                  <span className="more-dispatch-badge">{b.columnName}</span>
                  <h4 className="more-dispatch-title">{b.title}</h4>
                  <p className="more-dispatch-excerpt">{b.excerpt}</p>
                  <div className="more-dispatch-meta">
                    <span>{b.author.name}</span>
                    <span>{b.readTime || '6 min read'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .blog-detail-viewport {
          background: #f4efe6;
          min-height: 100vh;
          padding: 24px 0 80px;
          background-image: radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 0);
          background-size: 24px 24px;
        }

        .blog-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--ink-muted);
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .blog-breadcrumb__sep {
          color: #94a3b8;
        }

        .blog-breadcrumb__parent {
          color: var(--ochre-dark);
          font-weight: 600;
        }

        .blog-breadcrumb__current {
          color: var(--ink-black);
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blog-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .blog-back-btn {
          font-size: 12px;
          font-weight: 700;
          color: var(--ink-charcoal);
          background: rgba(255, 255, 255, 0.85);
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(4px);
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
        }

        .blog-back-btn:hover {
          background: #ffffff;
          color: var(--ochre-dark);
          border-color: var(--ochre);
          transform: translateX(-2px);
        }

        .blog-meta-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .blog-meta-tag {
          font-size: 10.5px;
          font-weight: 600;
          color: #52473b;
          background: rgba(255, 255, 255, 0.75);
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(180, 160, 130, 0.3);
        }

        /* ============================================================
           PARCHMENT SHEET CONTAINER
           Features the authentic background with Roman Corinthian column!
           ============================================================ */
        .hedge-front-paper-sheet {
          position: relative;
          background-color: #dfd3bd;
          background-image: url('/images/parchment-bg.jpg');
          background-repeat: no-repeat;
          background-position: left top;
          background-size: cover;
          border-radius: 12px;
          border: 1px solid #c8b99c;
          box-shadow: 0 16px 40px -10px rgba(50, 40, 25, 0.25), 0 2px 10px rgba(0,0,0,0.06);
          margin-bottom: 40px;
          padding: clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px) clamp(40px, 6vw, 72px) clamp(28px, 14vw, 150px);
          overflow: hidden;
        }

        /* Ambient parchment overlay to assure 100% text readability */
        .hedge-front-paper-sheet::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(235, 225, 208, 0.25) 0%,
            rgba(235, 225, 208, 0.72) 18%,
            rgba(235, 225, 208, 0.88) 32%,
            rgba(235, 225, 208, 0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .hedge-front-header,
        .hedge-front-subtitle-box,
        .hedge-front-content-area,
        .hedge-front-tags-container,
        .hedge-front-author-box {
          position: relative;
          z-index: 2;
        }

        /* Header Row with stylized The Hedge Front Monogram */
        .hedge-front-header {
          display: flex;
          align-items: flex-start;
          gap: clamp(20px, 3.5vw, 40px);
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 2px solid rgba(80, 60, 40, 0.15);
        }

        .hedge-front-branding {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border-right: 2px solid rgba(80, 60, 40, 0.18);
          padding-right: clamp(16px, 2.5vw, 28px);
        }

        .hedge-front-logo-sub {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: #435b4c;
          line-height: 1;
        }

        .hedge-front-logo-main {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(38px, 5vw, 56px);
          font-weight: 300;
          color: #435b4c;
          letter-spacing: -0.02em;
          line-height: 0.95;
          margin-top: -4px;
          margin-bottom: 2px;
        }

        .hedge-front-logo-footer {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .hedge-front-logo-front {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #435b4c;
        }

        .hedge-front-logo-by {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #5d7567;
          text-transform: uppercase;
        }

        .hedge-front-title-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hedge-front-main-title {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(26px, 3.8vw, 44px);
          font-weight: 800;
          color: #111827;
          line-height: 1.18;
          letter-spacing: -0.015em;
        }

        /* Subtitle Box in Italic Serif */
        .hedge-front-subtitle-box {
          margin-bottom: 32px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.45);
          border-left: 3px solid #435b4c;
          border-radius: 0 8px 8px 0;
        }

        .hedge-front-subtitle-text {
          font-family: Arial, Helvetica, sans-serif;
          font-style: italic;
          font-size: clamp(14px, 1.8vw, 16px);
          line-height: 1.7;
          color: #1f2937;
        }

        /* Body Typographic Content */
        .hedge-front-content-area {
          font-family: Arial, Helvetica, sans-serif;
          color: #1a202c;
          font-size: clamp(14.5px, 1.5vw, 16px);
          line-height: 1.8;
        }

        .hf-paragraph {
          margin-bottom: 20px;
          color: #1a202c;
          line-height: 1.8;
          text-align: justify;
        }

        .hf-heading-2 {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 800;
          color: #0f172a;
          margin-top: 36px;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .hf-heading-3 {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(19px, 2.2vw, 24px);
          font-weight: 700;
          color: #111827;
          margin-top: 32px;
          margin-bottom: 14px;
          line-height: 1.3;
        }

        .hf-heading-4 {
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(15px, 1.8vw, 18px);
          font-weight: 700;
          color: #1e293b;
          margin-top: 24px;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hf-divider {
          border: none;
          border-top: 1px dashed rgba(100, 80, 50, 0.35);
          margin: 32px 0;
        }

        .hf-ordered-list,
        .hf-unordered-list {
          margin: 16px 0 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #1a202c;
        }

        .hf-ordered-list li,
        .hf-unordered-list li {
          line-height: 1.7;
        }

        .hf-code {
          background: rgba(0, 0, 0, 0.06);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }

        /* Disclaimer Paragraphs */
        .hf-disclaimer-paragraph {
          font-size: 11.5px;
          line-height: 1.65;
          color: #4b5563;
          background: rgba(255, 255, 255, 0.5);
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid rgba(160, 140, 110, 0.25);
          margin-bottom: 12px;
        }

        /* Responsive Comparison Table (for Blog 3 GIFT City vs CSE) */
        .hf-table-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 28px 0;
          border-radius: 8px;
          border: 1px solid rgba(150, 130, 100, 0.3);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .hf-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 500px;
        }

        .hf-table th {
          background: #e2d7c5;
          color: #1a202c;
          padding: 12px 16px;
          text-align: left;
          font-weight: 700;
          border-bottom: 2px solid rgba(120, 100, 70, 0.3);
        }

        .hf-table td {
          padding: 11px 16px;
          border-bottom: 1px solid rgba(150, 130, 100, 0.2);
          color: #2d3748;
        }

        .hf-table tr:last-child td {
          border-bottom: none;
        }

        .hf-table tr:hover td {
          background: rgba(255, 255, 255, 0.95);
        }

        /* Tags in Parchment footer */
        .hedge-front-tags-container {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(120, 100, 70, 0.25);
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hedge-front-tags-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #5d4f3e;
        }

        .hedge-front-tags-list {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .hedge-front-tag-pill {
          font-size: 10.5px;
          font-weight: 600;
          color: #3b3123;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(150, 130, 100, 0.3);
          padding: 3px 10px;
          border-radius: 4px;
        }

        /* Author Box */
        .hedge-front-author-box {
          margin-top: 28px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(150, 130, 100, 0.3);
          border-radius: 8px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .hedge-front-author-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #2d4133;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }

        .hedge-front-author-info {
          flex: 1;
        }

        .hedge-front-author-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .hedge-front-author-role {
          font-size: 11px;
          font-weight: 600;
          color: #435b4c;
          margin-bottom: 6px;
        }

        .hedge-front-author-desc {
          font-size: 11.5px;
          color: #554839;
          line-height: 1.55;
        }

        /* Next / Prev Navigation */
        .blog-pagination-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 48px;
        }

        .blog-pagination-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          box-shadow: var(--shadow-card);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .blog-pagination-card.next {
          text-align: right;
          align-items: flex-end;
        }

        .blog-pagination-card:hover {
          border-color: var(--ochre);
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .blog-pagination-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--ochre-dark);
        }

        .blog-pagination-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink-black);
          line-height: 1.35;
        }

        /* More Dispatches Grid */
        .more-dispatches-section {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: var(--shadow-card);
        }

        .more-dispatches-header {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--ink-black);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .more-dispatches-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .more-dispatch-card {
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 20px;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .more-dispatch-card:hover {
          border-color: #cbd5e1;
          background: #fafaf9;
        }

        .more-dispatch-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--ochre-dark);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .more-dispatch-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink-black);
          line-height: 1.35;
          margin-bottom: 8px;
        }

        .more-dispatch-excerpt {
          font-size: 12px;
          color: var(--ink-secondary);
          line-height: 1.55;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .more-dispatch-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10.5px;
          color: var(--ink-muted);
          border-top: 1px solid var(--border-light);
          padding-top: 10px;
        }

        /* ============================================================
           RESPONSIVENESS (Mobile & Tablet)
           ============================================================ */
        @media (max-width: 900px) {
          .hedge-front-paper-sheet {
            padding-left: clamp(24px, 10vw, 80px);
            padding-right: 24px;
          }
          .hedge-front-header {
            flex-direction: column;
            gap: 16px;
          }
          .hedge-front-branding {
            border-right: none;
            border-bottom: 2px solid rgba(80, 60, 40, 0.18);
            padding-right: 0;
            padding-bottom: 12px;
            width: 100%;
          }
          .more-dispatches-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .hedge-front-paper-sheet {
            padding: 24px 16px 36px 20px;
            border-radius: 8px;
          }
          .hedge-front-paper-sheet::before {
            background: linear-gradient(
              to right,
              rgba(235, 225, 208, 0.7) 0%,
              rgba(235, 225, 208, 0.94) 20%,
              rgba(235, 225, 208, 0.94) 100%
            );
          }
          .blog-pagination-nav {
            grid-template-columns: 1fr;
          }
          .blog-pagination-card.next {
            text-align: left;
            align-items: flex-start;
          }
          .hf-paragraph {
            text-align: left;
          }
          .hedge-front-author-box {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
