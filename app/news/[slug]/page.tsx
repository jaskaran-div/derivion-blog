import { notFound } from 'next/navigation';
import Link from 'next/link';
import { newsItems } from '@/lib/data';
import type { Metadata } from 'next';

interface Params { slug: string; }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find(n => n.slug === slug);
  if (!item) return { title: 'Not Found' };
  return { title: item.title, description: item.excerpt.substring(0, 160) };
}

export async function generateStaticParams() {
  return newsItems.map(n => ({ slug: n.slug }));
}

// ── Simple markdown-to-JSX renderer ──────────────────────────
function renderMarkdown(md: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const lines = md.split('\n');
  let i = 0;
  let tableBuffer: string[] = [];
  let inTable = false;

  function flushTable() {
    if (!tableBuffer.length) return;
    const [headerLine, , ...dataLines] = tableBuffer;
    const headers = headerLine.split('|').map(s => s.trim()).filter(Boolean);
    const rows = dataLines.map(r => r.split('|').map(s => s.trim()).filter(Boolean));
    nodes.push(
      <div key={`tbl-${nodes.length}`} style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {headers.map((h, hi) => (
                <th key={hi} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid #f1f5f9' }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: '10px 14px', color: '#0f172a', lineHeight: 1.5 }}>
                    <span dangerouslySetInnerHTML={{ __html: cell.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2563eb;font-weight:600;" target="_blank" rel="noopener">$1</a>') }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
    inTable = false;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Skip HTML comments (image placeholders)
    if (line.trim().startsWith('<!--')) { i++; continue; }

    // Table detection
    if (line.startsWith('|')) {
      inTable = true;
      tableBuffer.push(line);
      i++;
      continue;
    } else if (inTable) {
      flushTable();
    }

    // H1
    if (line.startsWith('# ')) {
      nodes.push(<h1 key={i} style={{ fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '14px', marginTop: '28px' }}>{line.slice(2)}</h1>);
    }
    // H2
    else if (line.startsWith('## ')) {
      nodes.push(<h2 key={i} style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '10px', marginTop: '32px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{line.slice(3)}</h2>);
    }
    // H3
    else if (line.startsWith('### ')) {
      nodes.push(<h3 key={i} style={{ fontSize: 'clamp(14px,1.6vw,18px)', fontWeight: 700, color: '#0f172a', lineHeight: 1.3, marginBottom: '10px', marginTop: '26px' }}>{line.slice(4)}</h3>);
    }
    // H4
    else if (line.startsWith('#### ')) {
      nodes.push(<h4 key={i} style={{ fontSize: '13px', fontWeight: 700, color: '#1d4ed8', lineHeight: 1.3, marginBottom: '8px', marginTop: '20px', letterSpacing: '0.02em' }}>{line.slice(5)}</h4>);
    }
    // Blockquote
    else if (line.startsWith('> ')) {
      const content = line.slice(2);
      nodes.push(
        <blockquote key={i} style={{ borderLeft: '3px solid #2563eb', background: '#eff6ff', padding: '14px 18px', borderRadius: '0 8px 8px 0', margin: '20px 0', color: '#1e40af', fontSize: '13.5px', lineHeight: 1.65 }}>
          <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
        </blockquote>
      );
    }
    // Horizontal rule
    else if (line.trim() === '---') {
      nodes.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '28px 0' }} />);
    }
    // Bullet list item
    else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={`ul-${nodes.length}`} style={{ marginBottom: '16px', paddingLeft: '0', listStyle: 'none' }}>
          {listItems.map((li, idx) => (
            <li key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '6px', fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
              <span style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }}>▸</span>
              <span dangerouslySetInnerHTML={{ __html: li.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#0f172a">$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }
    // Numbered list
    else if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      nodes.push(
        <ol key={`ol-${nodes.length}`} style={{ marginBottom: '16px', paddingLeft: '20px' }}>
          {listItems.map((li, idx) => (
            <li key={idx} style={{ marginBottom: '6px', fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
              <span dangerouslySetInnerHTML={{ __html: li.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#0f172a">$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2563eb;font-weight:600;" target="_blank" rel="noopener">$1</a>') }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }
    // Paragraph
    else if (line.trim().length > 0) {
      const html = line
        .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#0f172a">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2563eb;font-weight:600;text-decoration:underline;text-underline-offset:2px;" target="_blank" rel="noopener">$1</a>');
      nodes.push(
        <p key={i} style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.75, marginBottom: '14px' }}>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </p>
      );
    }
    i++;
  }

  if (inTable) flushTable();
  return nodes;
}

export default async function NewsDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = newsItems.find(n => n.slug === slug);
  if (!item) notFound();

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container">

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '24px' }}>
          <Link href="/">Home</Link> <span>›</span>
          <Link href="/news" style={{ color: 'var(--ochre-dark)', fontWeight: 600 }}>News & Insights</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)' }}>{item.category}</span>
        </div>

        {/* Main 2-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' }} className="news-detail-grid">

          {/* ── MAIN ARTICLE ── */}
          <article style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>

            {/* Article Header Banner */}
            <div style={{ background: 'var(--navy-deep)', padding: 'clamp(24px,4vw,40px)', color: '#ffffff' }}>
              {/* Category + Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#93c5fd', padding: '4px 12px', borderRadius: '999px' }}>
                  {item.category}
                </span>
                {item.dataTag && (
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', background: '#2563eb', color: '#ffffff', padding: '4px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7dd3fc', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                    {item.dataTag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                {item.title}
              </h1>

              {/* Excerpt */}
              <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.65, marginBottom: '20px', maxWidth: '680px' }}>
                {item.excerpt}
              </p>

              {/* Author + Date row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#1d4ed8', border: '2px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>
                    {item.author.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#f1f5f9' }}>{item.author.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{item.author.role} · {item.author.bureau}</div>
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>
                  {item.date}
                </div>
              </div>
            </div>

            {/* Tags row */}
            <div style={{ padding: '14px 32px', background: '#fafbfc', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {item.tags.map(tag => (
                <span key={tag} style={{ fontSize: '9.5px', fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.04em' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Body */}
            <div style={{ padding: 'clamp(24px,4vw,40px)' }}>
              {renderMarkdown(item.body)}
            </div>

            {/* Footer */}
            <div style={{ padding: '20px 32px', background: '#f8fafc', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                Published by <strong style={{ color: '#0f172a' }}>{item.author.name}</strong> on {item.date}
              </div>
              <Link href="/news" style={{ fontSize: '11.5px', fontWeight: 700, color: '#1d4ed8' }}>
                ← All Dispatches
              </Link>
            </div>
          </article>

          {/* ── RIGHT SIDEBAR ── */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Quick Summary Card */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} />
                KEY MARKET LEVELS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: '2Y Treasury Yield', value: '4.72%', change: '+2bps from high', up: false },
                  { label: 'Brent Crude', value: '$105.70', change: 'Recovered', up: true },
                  { label: 'Gold (XAU)', value: '~$4,300', change: 'Modestly +ve', up: true },
                  { label: 'WTI Crude', value: '>$102', change: 'Recovered', up: true },
                  { label: 'S&P 500 Futures', value: '+0.5%+', change: 'Rebounding', up: true },
                  { label: 'Oct Hike Prob.', value: '50%', change: 'Money Markets', up: false },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ fontSize: '11px', color: '#475569' }}>{item.label}</div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{item.value}</div>
                      <div style={{ fontSize: '9.5px', color: item.up ? '#16a34a' : '#dc2626', fontWeight: 600 }}>{item.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Bank Watch */}
            <div style={{ background: 'var(--navy-deep)', borderRadius: 'var(--radius-md)', padding: '20px', color: '#ffffff' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '14px' }}>
                CENTRAL BANK WATCH
              </div>
              {[
                { bank: 'US Fed (FOMC)', action: '25bps HIKE', status: 'Unanimous', color: '#ef4444' },
                { bank: 'BOE (MPC)', action: 'HOLD — unch', status: '6-3 vote exp.', color: '#f59e0b' },
                { bank: 'BOJ', action: 'Monitoring Yen', status: 'Higher bar', color: '#94a3b8' },
                { bank: 'ECB', action: 'Watching CPI', status: 'Dove signals', color: '#22c55e' },
              ].map((cb, i) => (
                <div key={i} style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#f1f5f9' }}>{cb.bank}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: cb.color }}>{cb.action}</span>
                    <span style={{ fontSize: '9.5px', color: '#64748b' }}>{cb.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Events Mini Calendar */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '12px' }}>
                TODAY — KEY EVENTS
              </div>
              {[
                { time: '10:00', label: 'EUR CPI Final', flag: '🇪🇺' },
                { time: '12:00', label: 'BOE Rate Decision', flag: '🇬🇧', hot: true },
                { time: '13:30', label: 'US Jobless + Philly Fed', flag: '🇺🇸', hot: true },
                { time: '15:00', label: 'US Pending Home Sales', flag: '🇺🇸' },
              ].map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', marginBottom: '10px', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#475569', width: '38px', flexShrink: 0 }}>{e.time}</div>
                  <div style={{ flex: 1, fontSize: '11px', color: e.hot ? '#0f172a' : '#475569', fontWeight: e.hot ? 700 : 500 }}>
                    {e.flag} {e.label}
                  </div>
                  {e.hot && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />}
                </div>
              ))}
            </div>

            {/* Explore Blogs CTA */}
            <div style={{ background: 'var(--ochre-bg)', border: '1px solid var(--ochre-border)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8', marginBottom: '6px' }}>The Hedge Front</div>
              <p style={{ fontSize: '11.5px', color: '#3730a3', lineHeight: 1.55, marginBottom: '12px' }}>
                Deep-dive dispatches on derivatives, forex regulations & quantitative intelligence.
              </p>
              <Link href="/blogs" style={{ display: 'block', textAlign: 'center', background: '#1d4ed8', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 16px', borderRadius: '999px', textDecoration: 'none' }}>
                Read Dispatches →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .news-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
