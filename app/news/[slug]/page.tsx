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

export default async function NewsDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = newsItems.find(n => n.slug === slug);
  if (!item) notFound();

  // Use the exact demonstration title and content if it matches or customize dynamically
  const displayTitle = item.slug === 'global-energy-rebalancing' || item.id === 'n1'
    ? 'Global Energy Rebalancing: How New High-Voltage Grids are Redefining Industrial Sovereignty'
    : item.title;

  const displaySubtitle = item.slug === 'global-energy-rebalancing' || item.id === 'n1'
    ? 'Cross-continental ultra-access facilities and ultra-high-voltage subsea cables are shifting economic gravity faster than classical maritime shipping lanes ever managed.'
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
          <Link href="/news" style={{ color: 'var(--ochre-dark)', fontWeight: 600 }}>News & Insights</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)' }}>{item.category}</span>
        </div>

        {/* 3-COLUMN EDITORIAL LAYOUT (Matches Screen 2) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr 260px',
          gap: '32px',
          alignItems: 'start',
          marginBottom: '56px',
        }}>
          {/* Left Column: Developing Wire */}
          <aside style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <span className="dot-green" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--ochre-dark)' }}>
                DEVELOPING WIRE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { time: '09:42', title: 'OPEC+ Extends Voluntary Cuts: Saudi & Russian Supply Deficit Enters Projected Winter Peak' },
                { time: '10:15', title: 'ECB Governing Council Split Deepens on Wage Growth Metrics: Hawks Signal Potential Delay to Easing Cycle' },
                { time: '11:30', title: 'US 10-Year Auction Tail Widens to 2.4bps Amid Primary Dealer Balance Sheet Constraints' },
                { time: '12:05', title: 'Taiwan Semiconductor Export Clearances Tighten for GAA 2nm Test Chips' },
              ].map((wire, idx) => (
                <div key={idx} style={{ borderBottom: idx < 3 ? '1px solid var(--border-light)' : 'none', paddingBottom: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
                    {wire.time} EST
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11.5px', color: 'var(--ink-black)', lineHeight: 1.4, marginTop: '2px', fontWeight: 500 }}>
                    {wire.title}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Center Column: Main Story */}
          <article style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9.5px',
              fontWeight: 700,
              color: 'var(--ochre-dark)',
              letterSpacing: '0.12em',
              marginBottom: '10px',
            }}>
              GLOBAL ENERGY INFRASTRUCTURE: SPECIAL DISPATCH
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 2.8vw, 34px)',
              fontWeight: 800,
              color: 'var(--ink-black)',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}>
              {displayTitle}
            </h1>

            <p style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'var(--ink-secondary)',
              marginBottom: '20px',
            }}>
              {displaySubtitle}
            </p>

            {/* Transmission Pylon Image Frame */}
            <div style={{
              height: '300px',
              background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: 'var(--radius-md)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fef08a', letterSpacing: '0.1em' }}>
                  FIGURE 1.1 // HIGH-VOLTAGE DIRECT CURRENT (HVDC) TRANSMISSION
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, marginTop: '6px' }}>
                  North Sea Interconnector Terminal Grid Infrastructure
                </div>
              </div>
            </div>

            {/* Author Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '16px',
              marginBottom: '24px',
            }}>
              <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '11px' }}>
                {item.author.initials}
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-black)' }}>
                  By {item.author.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--ink-muted)' }}>
                  {item.author.role}
                </div>
              </div>
            </div>

            {/* Key Points Box (Yellow / Ochre Border from Screen 2) */}
            <div style={{
              background: '#fefce8',
              border: '1px solid #fde047',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              marginBottom: '24px',
              fontSize: '12px',
              color: '#713f12',
              lineHeight: 1.6,
            }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>• Pacific HVDC Supply Gap:</strong> The Pacific HVDC gap is 8x wider than Atlantic routes, creating unprecedented arbitrage windows for domestic sovereign battery storage build-outs.
              </div>
              <div>
                <strong>• Transformer Lead Times:</strong> Lead times for grid-scale high-voltage transformers have jumped to 48 months, establishing a severe bottleneck for artificial intelligence compute hubs.
              </div>
            </div>

            {/* Body Text */}
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '15.5px',
              lineHeight: 1.8,
              color: 'var(--ink-black)',
            }}>
              <p style={{ marginBottom: '18px' }}>
                The international monetary system has centuries of precedent for facilities along deep-water ocean crossings and specialized pipeline corridors. Today, data centers, synthetic fuel synthesizers, and primary metals processors are seeking immediate physical proximity to direct electrical conduits where uncurtailed megawatts from nuclear and wind are converted directly into value.
              </p>
              <p style={{ marginBottom: '18px' }}>
                In this transformed topography of state capacity, traditional geographical advantages recede before the imperative of transformer allocation and high-voltage grid stability.
              </p>
            </div>
          </article>

          {/* Right Column: Chart & Ad Box */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* CapEx Velocity Chart Box */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                INTERCONNECTION CAPEX VELOCITY
              </div>

              {/* Mini Bar Chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                {[30, 45, 60, 80, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: `${h}%`, background: i === 4 ? '#b48328' : '#e2e8f0', borderRadius: '4px 4px 0 0' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                      &apos;{20 + i}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--ink-secondary)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                Global HVDC CapEx projected to hit $148B by 2028.
              </div>
            </div>

            {/* Quote Box */}
            <div style={{
              background: '#fafaf9',
              borderLeft: '3px solid var(--ochre)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12.5px',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--ink-black)',
              lineHeight: 1.5,
            }}>
              “The country that controls the transformer patent pool controls the speed at which artificial intelligence clusters can physically turn on.”
            </div>

            {/* Infrastructure Map Ad Box (Screen 2) */}
            <div style={{
              background: '#0c1729',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              color: '#ffffff',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#fef08a', letterSpacing: '0.12em' }}>
                CRITICAL INFRASTRUCTURE
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, margin: '8px 0 10px', lineHeight: 1.3 }}>
                HVDC Transmission & Power Grid Interconnection Map
              </h3>
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '14px' }}>
                High-resolution GIS vector overlay detailing 140 planned subsea transmission routes.
              </p>
              <button type="button" className="btn-ochre" style={{ width: '100%', justifyContent: 'center', fontSize: '10.5px' }}>
                DOWNLOAD HI-RES MAP ↓
              </button>
            </div>
          </aside>
        </div>

        {/* SECTION: SECTOR ANALYSIS & ANALYTICAL WIRE (4 Cards from Screen 2) */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-header-row">
            <div>
              <div className="section-label-gold">
                SECTOR ANALYSIS & ANALYTICAL WIRE
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--ink-black)', marginTop: '2px' }}>
                Cross-Asset Quantitative Dispatches
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                title: 'Silicon Photonics Transition: Overcoming Copper\'s Thermal Threshold',
                author: 'Dr. Vikram Singhania',
                cat: 'AI & Semiconductors',
                bg: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              },
              {
                title: 'Sovereign Wealth Funds: Gulf Capital Reshapes Western Public Equities',
                author: 'Tariq Al-Mansoor',
                cat: 'Sovereign Wealth',
                bg: 'linear-gradient(145deg, #334155 0%, #1e293b 100%)',
              },
              {
                title: 'De Novo Enzymatic Synthesis Challenges Classical Petrochemical Cracking',
                author: 'Dr. Ananya Sen',
                cat: 'Biotech & Capital',
                bg: 'linear-gradient(145deg, #0c4a6e 0%, #0369a1 100%)',
              },
              {
                title: 'Treasury Auction Tails: Primary Dealers Absorb Unprecedented Supply',
                author: 'Elena Weber',
                cat: 'Macro & Fixed Income',
                bg: 'linear-gradient(145deg, #1e3a8a 0%, #172554 100%)',
              },
            ].map((card, idx) => (
              <div key={idx} className="editorial-card">
                <div style={{ height: '130px', background: card.bg, padding: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#ffffff', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
                    {card.cat}
                  </span>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-black)', lineHeight: 1.3, marginBottom: '8px' }}>
                    {card.title}
                  </h3>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                    By {card.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: SECTOR RISK RADAR & VOLATILITY METRICS TABLE (Screen 2) */}
        <div style={{
          background: '#0c1729',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          color: '#ffffff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#fef08a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              SECTOR RISK RADAR & VOLATILITY METRICS
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#94a3b8' }}>LIVE TELEMETRY: 06:00 UTC</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px' }}>SECTOR / GEOGRAPHY</th>
                  <th style={{ padding: '8px 12px' }}>COMPOSITE SPREAD</th>
                  <th style={{ padding: '8px 12px' }}>KEY METRIC</th>
                  <th style={{ padding: '8px 12px' }}>REGULATORY STATUS</th>
                  <th style={{ padding: '8px 12px' }}>SYSTEMIC RISK WEIGHT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sec: 'Trans-Atlantic HVDC', spread: '+64.2 bps', metric: '3.125% OIS', status: 'Approved (EU 2024)', risk: 'Moderate (Tier 2)' },
                  { sec: 'East Asia Advanced Fab', spread: '+142.8 bps', metric: '94% Fab Yield', status: 'Export Control Act', risk: 'Elevated (Tier 1)' },
                  { sec: 'North Sea Wind Interconnect', spread: '+41.0 bps', metric: '18 GW Connected', status: 'Sovereign Guarantee', risk: 'Low (Tier 3)' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px 12px', color: '#ffffff', fontWeight: 600 }}>{row.sec}</td>
                    <td style={{ padding: '10px 12px', color: '#fef08a' }}>{row.spread}</td>
                    <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{row.metric}</td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{row.status}</td>
                    <td style={{ padding: '10px 12px', color: '#4ade80' }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          div[style*='grid-template-columns: 240px 1fr 260px'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
