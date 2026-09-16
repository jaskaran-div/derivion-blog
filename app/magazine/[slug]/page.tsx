import { notFound } from 'next/navigation';
import Link from 'next/link';
import { magazineIssues } from '@/lib/data';
import type { Metadata } from 'next';

interface Params { slug: string; }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = magazineIssues.find(m => m.slug === slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.issueNumber} – ${item.title}`, description: item.subtitle.substring(0, 160) };
}

export async function generateStaticParams() {
  return magazineIssues.map(m => ({ slug: m.slug }));
}

export default async function MagazineDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = magazineIssues.find(m => m.slug === slug);
  if (!item) notFound();

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
          marginBottom: '24px',
        }}>
          <Link href="/">Home</Link> <span>›</span>
          <Link href="/magazine" style={{ color: 'var(--ochre-dark)', fontWeight: 600 }}>The Magazine</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)' }}>{item.issueNumber}</span>
        </div>

        {/* TOP SECTION: MAGAZINE COVER & ISSUE OVERVIEW (Matches Screen 1) */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          padding: '36px',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '48px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '44px',
          alignItems: 'start',
        }}>
          {/* Left: Magazine Cover with stone architecture */}
          <div style={{
            aspectRatio: '3 / 4',
            background: 'linear-gradient(135deg, #2b354f 0%, #171d2b 100%)',
            border: '1px solid #dcd6c8',
            borderRadius: 'var(--radius-xs)',
            boxShadow: 'var(--shadow-book)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            color: '#ffffff',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '14px',
              background: 'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.2) 40%, rgba(0,0,0,0.1) 100%)',
            }} />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.15em', color: '#fef08a', textTransform: 'uppercase' }}>
                DERIVION ACADEMY
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, marginTop: '12px' }}>
                The Reclaimed Commons
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.4)', margin: '0 auto 10px' }} />
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '12px', color: '#cbd5e1' }}>
                Vol. XLII • Monograph
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#94a3b8' }}>
              <span>184 PAGES</span>
              <span>LIMITED TO 1,200 COPIES</span>
            </div>
          </div>

          {/* Right: Overview, Quote & Folios List */}
          <div>
            {/* Pull quote in soft box */}
            <div style={{
              background: '#fcfbfa',
              borderLeft: '3px solid var(--ochre)',
              padding: '18px 22px',
              marginBottom: '24px',
              borderRadius: 'var(--radius-xs)',
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '15px',
                fontStyle: 'italic',
                color: 'var(--ink-black)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                “When an entire order crumbles and shared horizons are privatized into tokens, the first duty is this: we catalog the architecture, forgeries, and codes ruling the commons underfoot.”
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-muted)', marginTop: '8px', textAlign: 'right' }}>
                — Dr. Loren Heinrich • Spatial Forensics Desk
              </div>
            </div>

            {/* Issue Overview & Folios */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--ochre-dark)',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '6px',
              }}>
                ISSUE OVERVIEW & FOLIOS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { n: '1.', title: 'The Reclaimed Commons', desc: 'Philosophy / Cartography / Power Lines' },
                  { n: '2.', title: 'Monasteries of the North Atlantic', desc: 'Field Dispatch / Aerial Survey' },
                  { n: '3.', title: 'Desolating the High Plains', desc: 'Interstate Corridors / Agrarian Scarcity' },
                ].map((f) => (
                  <div key={f.n} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--ochre-dark)' }}>
                      {f.n}
                    </span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--ink-black)' }}>
                        {f.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons (Matches Screen 1) */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button type="button" className="btn-black" style={{ padding: '10px 22px' }}>
                READ COMPLETE ISSUE (PRINT)
              </button>
              <button type="button" className="btn-ochre" style={{ padding: '10px 22px' }}>
                PURCHASE PHYSICAL FOLIO ($72)
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: FIELD DISPATCH (3-Photo Grid from Screen 1) */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-header-row">
            <div>
              <div className="section-label-gold">
                FIELD DISPATCH // VOL. XLII
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--ink-black)', marginTop: '2px' }}>
                Monasteries of the North Atlantic
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '20px',
          }}>
            {/* Left large photo frame */}
            <div style={{
              height: '340px',
              background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: 'var(--radius-xs)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              color: '#ffffff',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#fef08a', letterSpacing: '0.1em' }}>
                PLATE 01 // REMOTE REPOSITORIES
              </span>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
                Western Faroe monastic settlements clinging to basalt cliffs
              </div>
            </div>

            {/* Right stacked photos */}
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '20px' }}>
              <div style={{
                background: 'linear-gradient(145deg, #334155 0%, #1e293b 100%)',
                borderRadius: 'var(--radius-xs)',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-end',
                color: '#ffffff',
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#fef08a' }}>PLATE 02</span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700 }}>Atlantic sea-spray weathering on 14th-century stonework</div>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(145deg, #475569 0%, #0f172a 100%)',
                borderRadius: 'var(--radius-xs)',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-end',
                color: '#ffffff',
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#fef08a' }}>PLATE 03</span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontWeight: 700 }}>Vaulted chapel interior and archival manuscript room</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: FACSIMILE PRINT PREVIEW (Open Book Spread from Screen 1) */}
        <div>
          <div className="section-header-row">
            <div>
              <div className="section-label-gold">
                ARCHIVAL REPRODUCTION
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--ink-black)', marginTop: '2px' }}>
                Facsimile Print Preview
              </h2>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-muted)' }}>
              Two-Page Spread (pp. 44–45)
            </span>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
            boxShadow: 'var(--shadow-card)',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            borderLeft: '1px solid #cbd5e1',
          }}>
            {/* Left Page: Essay with drop cap */}
            <div style={{ borderRight: '1px solid var(--border-light)', paddingRight: '36px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-muted)', marginBottom: '14px' }}>
                DERIVION ACADEMY • FOLIO 42
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--ink-black)', marginBottom: '14px' }}>
                The Geometry of Solitude
              </h3>
              <p className="drop-cap" style={{ fontFamily: 'var(--font-serif)', fontSize: '13.5px', lineHeight: 1.8, color: 'var(--ink-black)', textAlign: 'justify' }}>
                The architecture of these cloisters does not explain itself. It shields space and constructs non-electric duration in an age that demands instant transmission. To enter the garden of St. Brendan is to experience the intact physical satisfaction of unmonetized air and silent horizons.
              </p>
            </div>

            {/* Right Page: Archival photo & notes */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-muted)', marginBottom: '14px' }}>
                FACSIMILE DOCUMENTATION
              </div>
              <div style={{
                height: '180px',
                background: 'linear-gradient(145deg, #334155 0%, #1e293b 100%)',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
              }}>
                ARCHIVAL FOLIO SURVEY MAP
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-secondary)' }}>
                Survey notes cross-referenced against Venetian Maritime Admiralty logs demonstrate continuous habitation and sovereign treaty protections spanning five centuries.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns: 320px 1fr'] {
            grid-template-columns: 1fr !important;
          }
          div[style*='grid-template-columns: 1.4fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
          div[style*='grid-template-columns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
