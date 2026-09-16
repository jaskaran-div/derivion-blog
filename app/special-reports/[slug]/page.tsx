import { notFound } from 'next/navigation';
import Link from 'next/link';
import { specialReports } from '@/lib/data';
import type { Metadata } from 'next';

interface Params { slug: string; }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = specialReports.find(r => r.slug === slug);
  if (!item) return { title: 'Not Found' };
  return { title: item.title, description: item.excerpt.substring(0, 160) };
}

export async function generateStaticParams() {
  return specialReports.map(r => ({ slug: r.slug }));
}

export default async function SpecialReportDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = specialReports.find(r => r.slug === slug);
  if (!item) notFound();

  const related = specialReports.filter(r => r.slug !== slug).slice(0, 4);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 70px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          color: 'var(--ink-muted)',
          marginBottom: '24px',
        }}>
          <Link href="/" style={{ color: 'var(--ink-secondary)' }}>Home</Link>
          <span>›</span>
          <Link href="/special-reports" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>Special Reports</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink-primary)' }}>{item.category}</span>
        </div>

        {/* Dossier Header Card */}
        <div style={{
          background: '#0c1729',
          borderRadius: 'var(--radius-sm)',
          color: '#ffffff',
          padding: '40px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '36px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 700,
              background: 'var(--gold)',
              color: '#0f172a',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
            }}>
              SPECIAL REPORT // {item.category.toUpperCase()}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: '#94a3b8' }}>
              RELEASE DATE: {item.date.toUpperCase()} • {item.pages} PAGES
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: '#4ade80' }}>
              • {item.accessLevel.toUpperCase()} ACCESS
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.2vw, 36px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.25,
            marginBottom: '16px',
          }}>
            {item.title}
          </h1>

          <p style={{
            fontSize: '13.5px',
            lineHeight: 1.7,
            color: '#cbd5e1',
            marginBottom: '28px',
            maxWidth: '850px',
          }}>
            {item.excerpt}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="button" className="btn-gold" style={{ padding: '9px 20px' }}>
              Download Monograph (PDF)
            </button>
            <button type="button" className="btn-white" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)', padding: '9px 20px' }}>
              Export Telemetry Datasets
            </button>
          </div>
        </div>

        {/* Content & Companion Dossiers Sidebar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '36px',
          alignItems: 'start',
        }}>
          {/* Main Body */}
          <article style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {/* Investigators Box */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '32px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Principal Investigators
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.authors.map((auth, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '10px' }}>
                      {auth.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        {auth.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                        {auth.role} {auth.bureau ? `• ${auth.bureau}` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Markdown sections */}
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '15px',
              lineHeight: 1.85,
              color: 'var(--ink-primary)',
            }}>
              {item.body.split('## ').map((section, idx) => {
                if (!section.trim()) return null;
                const lines = section.split('\n');
                const heading = lines[0];
                const paragraphs = lines.slice(1).join('\n').trim();

                return (
                  <div key={idx} style={{ marginBottom: '32px' }}>
                    <h2 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--ink-primary)',
                      marginBottom: '12px',
                      borderBottom: '1px solid var(--border-light)',
                      paddingBottom: '6px',
                    }}>
                      {heading}
                    </h2>
                    {paragraphs.split('\n\n').map((p, pIdx) => (
                      <p key={pIdx} style={{ marginBottom: '16px', color: '#1e293b' }}>
                        {p}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--gold-dark)',
                textTransform: 'uppercase',
                marginBottom: '14px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '6px',
              }}>
                COMPANION DOSSIERS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {related.map(r => (
                  <Link key={r.id} href={`/special-reports/${r.slug}`}>
                    <div style={{ fontSize: '8.5px', fontFamily: 'var(--font-mono)', color: 'var(--gold-dark)' }}>
                      {r.category.toUpperCase()} • {r.pages} PP
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.3, marginTop: '2px' }}>
                      {r.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns: 1fr 300px'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
