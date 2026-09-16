import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '@/lib/data';
import type { Metadata } from 'next';

interface Params { slug: string; }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = blogs.find(b => b.slug === slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.columnName} – ${item.title}`, description: item.excerpt.substring(0, 160) };
}

export async function generateStaticParams() {
  return blogs.map(b => ({ slug: b.slug }));
}

export default async function CreatorBlogsDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = blogs.find(b => b.slug === slug);
  if (!item) notFound();

  // Use the exact demonstration title and content if it matches or customize dynamically
  const displayTitle = item.slug === 'why-we-rewrote-our-manifesto' || item.id === 'b1'
    ? 'Why We Rewrote Our Entire Product Manifesto in Pen and Ink'
    : item.title;

  const displaySubtitle = item.slug === 'why-we-rewrote-our-manifesto' || item.id === 'b1'
    ? 'When software interfaces become omnipresent and identical, thinking disappears. By returning to physical collaboration records, we recover the immutable discipline of craft and slow reasoning across sovereign execution teams.'
    : item.excerpt;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--ink-muted)',
          marginBottom: '20px',
        }}>
          <Link href="/">Home</Link> <span>›</span>
          <Link href="/blogs" style={{ color: 'var(--ochre-dark)', fontWeight: 600 }}>Creator Blogs</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)' }}>{item.columnName}</span>
        </div>

        {/* HEADER SECTION (Matches Screen 3) */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow-text">
            VOICES & DISPATCHES: FIELD NOTES FROM 48 SENIOR FELLOWS
          </div>
          <h1 className="page-title">
            Voices & Dispatches
          </h1>
          <p className="page-subtitle">
            First-person essays, field notes, and working theories from our global network of 48 fellows, economists, and historians.
          </p>
        </div>

        {/* ROW OF 4 AUTHOR PROFILE CARDS (Matches Screen 3) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}>
          {[
            { initials: 'ER', name: 'Dr. Elena Rostova', desc: 'Maritime Law & Telecom Cables' },
            { initials: 'TA', name: 'Tariq Al-Mansoor', desc: 'Sovereign Wealth & AI Capital' },
            { initials: 'MC', name: 'Mei-Ling Chen', desc: 'Semiconductor Lithography' },
            { initials: 'JG', name: 'Julian S. Gray', desc: 'Archival Monetary History' },
          ].map((author, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="avatar-circle" style={{ width: '36px', height: '36px', fontSize: '11px' }}>
                  {author.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13.5px', fontWeight: 700, color: 'var(--ink-black)' }}>
                    {author.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-muted)' }}>
                    {author.desc}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-white"
                style={{ fontSize: '10px', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>

        {/* MAIN BODY: HERO POST + SIDEBAR (Matches Screen 3) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '36px',
          alignItems: 'start',
        }}>
          {/* Left Column: Hero Post & Secondary Grid */}
          <div>
            {/* Hero Creator Post */}
            <article style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '36px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="avatar-circle" style={{ width: '38px', height: '38px', fontSize: '12px' }}>
                  {item.author.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-black)' }}>
                    {item.author.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                    {item.author.role}
                  </div>
                </div>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 2.8vw, 32px)',
                fontWeight: 800,
                color: 'var(--ink-black)',
                lineHeight: 1.25,
                marginBottom: '14px',
              }}>
                {displayTitle}
              </h2>

              <p style={{
                fontSize: '14.5px',
                lineHeight: 1.7,
                color: 'var(--ink-secondary)',
                marginBottom: '20px',
              }}>
                {displaySubtitle}
              </p>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '15.5px',
                lineHeight: 1.85,
                color: 'var(--ink-black)',
                marginBottom: '24px',
              }}>
                <p style={{ marginBottom: '16px' }}>
                  There is a psychological threshold that occurs when an organization migrates its strategic discourse entirely into digital canvas boards. The frictionless nature of modern collaboration software removes the biological cost of speech, producing a flood of uninspected assertions, decorative diagrams, and premature consensus.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  To write with pen and ink is to encounter an immediate mechanical resistance. Ink is irreversible; paper has bounded borders; words cannot be deleted with a keystroke. This friction forces the writer into deliberate forethought before a single mark touches the rag stock.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', background: '#fefce8', color: '#854d0e', border: '1px solid #fde047', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                  Cognitive Friction Economics
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                  Wafer-Scale Thermodynamics
                </span>
              </div>
            </article>

            {/* 4 Secondary Creator Posts (2x2 grid from Screen 3) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '36px',
            }}>
              {[
                { title: 'Designing for Offline Resilience in Distributed Mesh Grids', author: 'Tariq Al-Mansoor', desc: 'When aggregation lines sever, how do local micro-grids maintain clearing parity?' },
                { title: 'On Hard-Bound Proofs and the Disappearance of Drafts', desc: 'Digital software erases the geological record of thought. Archiving physical notebooks preserves intuition.', author: 'Mei-Ling Chen' },
                { title: 'The Acoustical Geography of Elevated Railway Enclosures', desc: 'Chicago elevated rail corridors reveal micro-economies of noise abatement and municipal property discount.', author: 'Julian S. Gray' },
                { title: 'The Cost of Action Delay and the Slow Return of Reflection', desc: 'Why institutional investment committees benefit from enforced 48-hour mandatory silence protocols.', author: 'Dr. Elena Rostova' },
              ].map((p, idx) => (
                <div key={idx} className="editorial-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    By {p.author}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--ink-black)', lineHeight: 1.3, marginBottom: '8px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom: Field Notes & Marginal Musings */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', fontWeight: 700, color: 'var(--ochre-dark)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
                FIELD NOTES & MARGINAL MUSINGS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)' }}>Oct 28 • Zurich BioDesk</span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13.5px', color: 'var(--ink-black)', marginTop: '2px' }}>
                    The physical constraints of high-purity laboratory water distillation are now setting the cap for next-gen synthetic peptide output.
                  </div>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)' }}>Oct 26 • London Metals Desk</span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13.5px', color: 'var(--ink-black)', marginTop: '2px' }}>
                    Antwerp bonded warehouses report increasing storage requests for non-ferrous alloys with delivery execution dated 2028.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Write for us, Trending Debates, Reading Lists */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>
            {/* Deep Navy Promo Card */}
            <div style={{
              background: '#0c1729',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              color: '#ffffff',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#fef08a', letterSpacing: '0.12em' }}>
                INDEPENDENT FELLOWSHIP
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, margin: '8px 0 10px', lineHeight: 1.25 }}>
                Write for DerivionAcademy.in
              </h3>
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
                We compensate verified economists, engineers, and researchers for long-form analytical dispatches and field notebooks.
              </p>
              <Link
                href="/blogs"
                className="btn-ochre"
                style={{ width: '100%', justifyContent: 'center', fontSize: '11px', borderRadius: 'var(--radius-sm)' }}
              >
                Fellowship Guidelines →
              </Link>
            </div>

            {/* Trending Debates */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--ochre-dark)', textTransform: 'uppercase', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
                TRENDING DEBATES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Is Silicon Photonics fall-rate velocity truly edge-competitive?',
                  'The decline of the second-phase sovereign debt in the age of algorithmic pivots',
                  'Public water terminals as an index of municipal fiscal health',
                ].map((d, i) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--ink-black)', lineHeight: 1.4, fontWeight: 500 }}>
                    • {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Reading Lists */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
                CURATED READING LISTS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'The Craft of Thinking: On Solitude, Notebooks, and Deliberate Slowness',
                  'The Future of Typography in Augmented Environments',
                  'Micro-hydroeconomics in the Swiss Pre-Alps',
                ].map((l, i) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                    • {l}
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Network Registry - No fake backend */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--ink-black)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                CREATOR NETWORK DIRECTORY
              </div>
              <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
                Browse all 48 verified fellows across Macro, Quant, Energy, and Infrastructure desks.
              </p>
              <Link
                href="/blogs"
                className="btn-black"
                style={{ width: '100%', justifyContent: 'center', fontSize: '10.5px', borderRadius: 'var(--radius-sm)' }}
              >
                Browse All 48 Columns →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns: 1fr 320px'] {
            grid-template-columns: 1fr !important;
          }
          div[style*='grid-template-columns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
          aside { position: static !important; }
        }
      `}</style>
    </div>
  );
}
