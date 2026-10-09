import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/lib/data';
import type { Metadata } from 'next';

interface Params { slug: string; }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = articles.find(a => a.slug === slug);
  if (!item) return { title: 'Not Found' };
  return { title: item.title, description: item.excerpt.substring(0, 160) };
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export default async function LongformArticleDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = articles.find(a => a.slug === slug);
  if (!item) notFound();

  // Use the exact demonstration title and content if it matches or customize dynamically
  const displayTitle = item.slug === 'the-architecture-of-silence' || item.id === 'a1'
    ? 'The Architecture of Silence: What Modern Cities Forgot About Sound and Solitude'
    : item.title;

  const displaySubtitle = item.slug === 'the-architecture-of-silence' || item.id === 'a1'
    ? 'An investigative inquiry into sensory acoustics, corporate sound barriers, and the vanishing acoustic commons of late-stage capitalism.'
    : item.excerpt;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Breadcrumb / Section tag */}
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
          <Link href="/articles" style={{ color: 'var(--ochre-dark)', fontWeight: 600 }}>Longform Articles</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)' }}>{item.category}</span>
        </div>

        {/* Top Headline & Subtitle */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3.8vw, 46px)',
            fontWeight: 700,
            color: 'var(--ink-black)',
            lineHeight: 1.15,
            marginBottom: '14px',
            letterSpacing: '-0.01em',
          }}>
            {displayTitle}
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--ink-secondary)',
            maxWidth: '920px',
          }}>
            {displaySubtitle}
          </p>
        </div>

        {/* Large Hero Portrait Photo */}
        <div style={{
          width: '100%',
          height: '420px',
          background: 'linear-gradient(135deg, #2b354f 0%, #171d2b 100%)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Subtle architectural silhouette backdrop */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 60% 40%, rgba(200, 155, 60, 0.15) 0%, transparent 60%)',
          }} />
          <div style={{ textAlign: 'center', zIndex: 1, padding: '24px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: '#0f172a',
              border: '2px solid rgba(255,255,255,0.3)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontFamily: 'var(--font-serif)',
              fontSize: '36px',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              {item.author.initials}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#ffffff', fontWeight: 700 }}>
              {item.author.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>
              {item.author.role} {item.author.bureau ? `• ${item.author.bureau}` : ''}
            </div>
          </div>
        </div>

        {/* Audio Player Bar (Navy & Ochre) */}
        <div className="audio-player-bar" style={{ marginBottom: '40px' }}>
          <button
            type="button"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              flexShrink: 0,
            }}
            aria-label="Play audio"
          >
            ▶
          </button>
          <span style={{ color: '#fef08a', fontWeight: 600 }}>
            {item.readTime || '42 min read'} // Narrated by Author
          </span>
          {/* Audio Waveform visualization */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flex: 1, height: '24px', padding: '0 16px' }}>
            {[18, 24, 12, 32, 28, 14, 22, 38, 16, 26, 34, 20, 30, 24, 18, 36, 14, 28, 22, 30, 16, 24, 32, 20, 18, 26, 34, 12].map((h, idx) => (
              <div
                key={idx}
                style={{
                  width: '3px',
                  height: `${h}px`,
                  background: idx < 10 ? '#fef08a' : 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>
            14:20 / 42:00
          </span>
        </div>

        {/* 2-Column Monograph Layout (Matches Screen 4) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left Column: Chapters & Release Details */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            {/* Monograph Chapters */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--ochre-dark)',
                textTransform: 'uppercase',
                marginBottom: '14px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '6px',
              }}>
                MONOGRAPH CHAPTERS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <a href="#sec-1" style={{ color: 'var(--ink-black)', fontWeight: 600, display: 'flex', gap: '6px' }}>
                  <span style={{ color: 'var(--ochre-dark)', fontFamily: 'var(--font-mono)' }}>1.</span> The Acoustic Baseline
                </a>
                <a href="#sec-2" style={{ color: 'var(--ink-secondary)', display: 'flex', gap: '6px' }}>
                  <span style={{ color: 'var(--ochre-dark)', fontFamily: 'var(--font-mono)' }}>2.</span> Decibel Capital & Real Estate
                </a>
                <a href="#sec-3" style={{ color: 'var(--ink-secondary)', display: 'flex', gap: '6px' }}>
                  <span style={{ color: 'var(--ochre-dark)', fontFamily: 'var(--font-mono)' }}>3.</span> The Sound-Baffle Class
                </a>
                <a href="#sec-4" style={{ color: 'var(--ink-secondary)', display: 'flex', gap: '6px' }}>
                  <span style={{ color: 'var(--ochre-dark)', fontFamily: 'var(--font-mono)' }}>4.</span> Silence as Sovereign Luxury
                </a>
              </div>
            </div>

            {/* Release Details */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-card)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-secondary)',
            }}>
              <div style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--ink-muted)',
                textTransform: 'uppercase',
                marginBottom: '14px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '6px',
              }}>
                RELEASE DETAILS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div><strong style={{ color: 'var(--ink-black)' }}>Publication:</strong> Volume 42, Issue 3</div>
                <div><strong style={{ color: 'var(--ink-black)' }}>Peer Review:</strong> Double-Blind Validated</div>
                <div><strong style={{ color: 'var(--ink-black)' }}>Citation:</strong> Sterling, A. (2024). Arch. Silence. Derivion, 42(3), 112–148.</div>
                <div><strong style={{ color: 'var(--ink-black)' }}>DOI:</strong> 10.1093/deriv.2024.108</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button type="button" className="btn-black" style={{ width: '100%', justifyContent: 'center' }}>
                Download Full PDF (3.2 MB)
              </button>
              <button type="button" className="btn-white" style={{ width: '100%', justifyContent: 'center' }}>
                Export BibTeX Citation
              </button>
            </div>
          </aside>

          {/* Right Column: Monograph Text (Drop Cap + Serif) */}
          <article style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '44px 48px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div id="sec-1" style={{ marginBottom: '32px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                color: 'var(--ochre-dark)',
                letterSpacing: '0.12em',
                marginBottom: '6px',
              }}>
                1. THE ACOUSTIC BASELINE
              </div>

              {/* Text with Giant Drop Cap T */}
              <p className="drop-cap" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16.5px',
                lineHeight: 1.85,
                color: 'var(--ink-black)',
                marginBottom: '22px',
                textAlign: 'justify',
              }}>
                The sensation of true auditory zero does not exist on populated, planetary terrain. What modern urban construction has produced is a peculiar synthetic baseline: an uninterrupted hum of mechanical ventilation, subterranean subway reverberations, and transformer whine that operates just below conscious auditory attention. Across G7 metropolitan cores, this baseline noise floor has crept upward by four decibels per decade since the postwar industrial expansion. For the nomadic world, solitude was not a physical spatial enclosure; it was an open-horizon acoustic luxury that allowed the nervous system to reorient toward ancestral meditative stillness.
              </p>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16.5px',
                lineHeight: 1.85,
                color: 'var(--ink-black)',
                marginBottom: '24px',
                textAlign: 'justify',
              }}>
                Step today into the corner of 5th Avenue and 52nd Street at midday, and your auditory cortex is assaulted by an uninterrupted 82-decibel din, equivalent to standing continuously adjacent to a diesel freight locomotive running at quarter-throttle. Urban planners have routinely excused this cacophony as the sovereign cost of civilizational vitality. Yet the trade-off was neither inevitable nor explicitly chosen; it was quietly codified in early 20th-century zoning laws that privileged mechanical combustion over ambient tranquillity.
              </p>

              {/* Pull Quote Box (Matches Screen 4) */}
              <div style={{
                background: '#fefce8',
                borderLeft: '3px solid #ca8a04',
                padding: '20px 24px',
                margin: '32px 0',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  color: '#854d0e',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  “Silence is not merely an absence of density; it has become the defined tax of urban existence.”
                </p>
              </div>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16.5px',
                lineHeight: 1.85,
                color: 'var(--ink-black)',
                marginBottom: '28px',
                textAlign: 'justify',
              }}>
                As architectural historian Siegfried Giedion famously observed during the machine age, our era of structural automation has produced "a sensory enclosure so constant that human perception ceases to register the machine." Nowhere was this command over sound more evident than in the private residential enclaves of Manhattan and London City. Double-pane argon insulation, acoustic baffle ceiling baffles, and mechanical white noise generators now insulate the affluent, creating an acoustic divide that mirrors municipal wealth disparity.
              </p>

              {/* Inline Graphic / Architectural Image Frame */}
              <div style={{
                height: '240px',
                background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontFamily: 'var(--font-serif)',
                fontSize: '18px',
              }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: '#94a3b8', letterSpacing: '0.1em' }}>
                    FIG 1.2 // DECIBEL TOPOLOGY MAP
                  </div>
                  <div style={{ fontSize: '16px', color: '#fef08a', marginTop: '4px' }}>
                    Manhattan Acoustic Gradient at 14:00 EST
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginBottom: '32px' }}>
                Figure 1.2: Cross-sectional acoustic survey measuring high-frequency sound attenuation in commercial core towers.
              </div>
            </div>

            {/* Chapter 2 */}
            <div id="sec-2" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '28px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                color: 'var(--ochre-dark)',
                letterSpacing: '0.12em',
                marginBottom: '6px',
              }}>
                2. DECIBEL CAPITAL & REAL ESTATE
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--ink-black)',
                marginBottom: '16px',
              }}>
                The Decibel Economy
              </h2>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16.5px',
                lineHeight: 1.85,
                color: 'var(--ink-black)',
                marginBottom: '18px',
                textAlign: 'justify',
              }}>
                In the contemporary metropolitan real estate market, acoustic silence is priced at a premium of approximately 3.2% per decibel reduction below the municipal 65dB threshold. The quietest residential units in central Paris, Tokyo, and Zurich are no longer defined by square meterage alone, but by their STC (Sound Transmission Class) rating and distance from surface transit conduits.
              </p>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*='grid-template-columns: 260px 1fr'] {
            grid-template-columns: 1fr !important;
          }
          aside { position: static !important; }
        }
      `}</style>
    </div>
  );
}
