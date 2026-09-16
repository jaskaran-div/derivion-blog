import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'DerivionAcademy.in – Institutional Intelligence & Quantitative Analysis',
  description: 'The authoritative digital chronicle and research bureau providing institutional analysis, quantitative derivative intelligence, and sovereign market reports.',
};

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* ============================================================
          HERO – Magazine Grid (inspired by indise. layout)
          Left: 2 stacked story cards | Right: 1 large featured story
          ============================================================ */}
      <section className="da-hero">
        <div className="da-hero__grid">

          {/* LEFT COLUMN – 2 stacked cards */}
          <div className="da-hero__left">
            {/* Card 1 */}
            <Link href="/articles/the-architecture-of-sovereign-indebtedness" className="da-hero__card da-hero__card--sm">
              <Image
                src="/hero-card1.jpg"
                alt="Financial analyst reviewing market reports"
                fill
                className="da-hero__card-img"
                priority
              />
              <div className="da-hero__card-overlay" />
              <div className="da-hero__card-body">
                <span className="da-hero__card-tag">MACRO & DEBT</span>
                <h3 className="da-hero__card-title">The Architecture of Sovereign Indebtedness: Bilateral Swap Lines as Monetary Hegemony</h3>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/news/transatlantic-term-premium-divergence" className="da-hero__card da-hero__card--sm">
              <Image
                src="/hero-card2.jpg"
                alt="Economists discussing charts in boardroom"
                fill
                className="da-hero__card-img"
              />
              <div className="da-hero__card-overlay" />
              <div className="da-hero__card-body">
                <span className="da-hero__card-tag">AI INFRASTRUCTURE</span>
                <h3 className="da-hero__card-title">HBM4 Next-Gen Stacks: Sovereign Foundry Yields Confront Thermodynamic Ceilings</h3>
              </div>
            </Link>
          </div>

          {/* RIGHT COLUMN – Large featured card (div wrapper avoids nested <a> tags) */}
          <div className="da-hero__card da-hero__card--featured">
            <Image
              src="/hero-featured.jpg"
              alt="Professional researcher at work"
              fill
              className="da-hero__card-img"
              priority
            />
            <div className="da-hero__card-overlay da-hero__card-overlay--featured" />
            <div className="da-hero__card-body da-hero__card-body--featured">
              <span className="da-hero__card-tag">INSTITUTIONAL INTELLIGENCE</span>
              <h2 className="da-hero__featured-title">
                Everything you need to know about Sovereign Debt Clearance for your research
              </h2>
              <div className="da-hero__featured-meta">
                <Link href="/news/strait-transit-rerouting-freight-hedging" className="da-hero__read-btn">
                  Read Article →
                </Link>
                <span className="da-hero__author">
                  <span className="da-hero__author-avatar">VS</span>
                  by Dr. Vikram Singhania
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="container">
        {/* STATS BAR */}
        <div className="da-stats-bar">
          {[
            { v: '48', l: 'Verified Fellows' },
            { v: '6', l: 'Content Verticals' },
            { v: '142+', l: 'Special Reports' },
            { v: 'Bi-Weekly', l: 'Dispatch Cadence' },
          ].map(s => (
            <div key={s.l} className="da-stats-bar__item">
              <div className="da-stats-bar__value">{s.v}</div>
              <div className="da-stats-bar__label">{s.l}</div>
            </div>
          ))}
        </div>

        {/* 2. COVER TREATISE HIGHLIGHT */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              <span className="dot-ochre" /> LEAD ACADEMIC TREATISE
            </div>
            <Link href="/articles" style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
              View All Treatises →
            </Link>
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '36px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '8.5px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                }}>
                  OCTOBER 2024
                </span>
                <span style={{ fontSize: '9.5px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
                  42 MIN READ • 11,400 WORDS
                </span>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink-black)', lineHeight: 1.25, marginBottom: '12px' }}>
                The Architecture of Sovereign Indebtedness: Bilateral Swap Lines as Monetary Hegemony
              </h2>

              <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.65, marginBottom: '18px' }}>
                An empirical deconstruction of post-Bretton Woods central bank liquidity plumbing. How bilateral Federal Reserve swap lines and offshore repo facilities forged an invisible, extraterritorial safety net that reorders sovereign fiscal autonomy during global systemic liquidity shocks.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="avatar-circle">AS</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-black)' }}>
                    Prof. Alistair Sterling
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                    Chair of Macrofinancial History, Oxford & Derivion
                  </div>
                </div>
                <Link
                  href="/articles/the-architecture-of-sovereign-indebtedness"
                  className="btn-black"
                  style={{ marginLeft: 'auto', fontSize: '11px' }}
                >
                  Read Full Treatise →
                </Link>
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '9.5px', color: 'var(--ochre-dark)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  KEY SECTIONS INDEXED
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px', color: 'var(--ink-secondary)' }}>
                  <div>• The Geopolitics of Liquidity: From Gold Anchors to Balance Sheet Facilities</div>
                  <div>• The Offshore Eurodollar Clearing Architecture and Collateral Scarcity</div>
                  <div>• Econometric Analysis of 2008 & 2020 Cross-Currency Swap Basis Spikes</div>
                  <div>• The Weaponization of Repo: Exclusion as the Ultimate Sovereign Sanction</div>
                </div>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--ink-muted)', marginTop: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                DOI: 10.1093/deriv.2024.108 • 48 Citations Indexed
              </div>
            </div>
          </div>
        </section>

        {/* 3. LATEST NEWS SPOTLIGHT */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              <span className="dot-green" /> BREAKING INTELLIGENCE & NEWS DISPATCHES
            </div>
            <Link href="/news" style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
              All 455 Dispatches →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                tag: 'AI Infrastructure',
                title: 'HBM4 Next-Gen Stacks: Sovereign Foundry Yields Confront Thermodynamic Ceilings',
                excerpt: 'Advanced packaging bottlenecks in East Asian fabrication facilities have triggered unprecedented capital relocation toward proprietary liquid-cooling testbenches.',
                author: 'Dr. Vikram Singhania',
                slug: 'hbm4-next-gen-stacks-thermodynamic-ceilings',
                bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              },
              {
                tag: 'Macro & Debt',
                title: 'The Transatlantic Term Premium Divergence: Sovereign Balance Sheets Under QT',
                excerpt: 'With US debt issuance hitting quarterly records, structural buyers demand heightened inflation-risk protection, widening the spread over core French and German bund facilities.',
                author: 'Elena Weber',
                slug: 'transatlantic-term-premium-divergence',
                bg: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
              },
              {
                tag: 'Trade & Logistics',
                title: 'Strait Transit Re-routing: Bulk Carrier Arbitrage in Cape of Good Hope Freight Hedging',
                excerpt: 'Insurance swap rate spikes continue to force container trajectories, reshaping bunker fuel liquidity pools across Singapore and Port Louis storage terminals.',
                author: 'Aris Moros',
                slug: 'strait-transit-rerouting-freight-hedging',
                bg: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
              },
            ].map((item, idx) => (
              <div key={idx} className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    height: '140px',
                    background: item.bg,
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: '8px',
                      color: '#ffffff',
                      background: 'rgba(0,0,0,0.65)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      fontWeight: 700,
                    }}>
                      SPOTLIGHT • {item.tag}
                    </span>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink-black)', lineHeight: 1.3, marginBottom: '8px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.55 }}>
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                }}>
                  <span style={{ color: 'var(--ink-muted)' }}>By {item.author}</span>
                  <Link href={`/news/${item.slug}`} style={{ color: 'var(--ochre-dark)', fontWeight: 700 }}>
                    Read Dispatch →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PINNACLE FELLOW COLUMNS */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              <span className="dot-ochre" /> PINNACLE FELLOW NEWSLETTERS & COLUMNS
            </div>
            <Link href="/blogs" style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
              All 48 Fellow Hubs →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                badge: 'SUBSTACK • 14.2K READERS',
                cadence: 'Weekly',
                initials: 'VS',
                name: 'Dr. Vikram Singhania',
                title: 'The Silicon Foundry Ledger',
                desc: 'Unpacking extreme ultraviolet lithography bottlenecks, wafer-scale thermodynamic dissipation, and state-backed foundry capital expenditure strategies.',
                slug: 'silicon-foundry-ledger',
              },
              {
                badge: 'SUBSTACK • 21.8K READERS',
                cadence: 'Twice Monthly',
                initials: 'EW',
                name: 'Elena Weber',
                title: 'The Yield Arbitrage Journal',
                desc: 'Weekly dissections of G10 sovereign debt issuance, shadow liquidity dynamics, cross-currency basis swaps, and European debt divergence.',
                slug: 'yield-arbitrage-journal',
              },
              {
                badge: 'COLUMN • 9.4K READERS',
                cadence: 'Weekly',
                initials: 'AM',
                name: 'Aris Moros',
                title: 'Chokepoint Chronology',
                desc: 'Geopolitical logistics, bulk carrier transit arbitrage in the Bab-el-Mandeb, vessel telemetry data, and global bunker fuel pricing spikes.',
                slug: 'chokepoint-chronology',
              },
            ].map(col => (
              <div key={col.slug} className="editorial-card" style={{ borderTop: '3px solid #b48328', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '8.5px', background: '#fefce8', color: '#854d0e', border: '1px solid #fde047', padding: '2px 8px', borderRadius: 'var(--radius-xs)', fontWeight: 700 }}>
                    {col.badge}
                  </span>
                  <span style={{ fontSize: '9.5px', color: 'var(--ochre-dark)', fontWeight: 600 }}>{col.cadence}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '11px' }}>{col.initials}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink-black)' }}>{col.name}</div>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink-black)', marginBottom: '8px', lineHeight: 1.25 }}>
                  {col.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--ink-secondary)', lineHeight: 1.55, marginBottom: '18px' }}>
                  {col.desc}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', textAlign: 'right' }}>
                  <Link href={`/blogs/${col.slug}`} style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
                    View Column →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. MAGAZINE ARCHIVE & SPECIAL REPORTS SPLIT */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* The Magazine */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="eyebrow-text">THE MAGAZINE • ISSUE NO. 42</span>
                <Link href="/magazine" style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 700 }}>Archive →</Link>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink-black)', marginBottom: '10px' }}>
                The Reclaimed Commons
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                184-page physical print volume on public sovereign territory, municipal air rights, and Venetian Republic archival cadastral maps.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link href="/magazine/issue-42-the-reclaimed-commons" className="btn-black" style={{ fontSize: '11px' }}>
                  Acquire Physical Folio ($72)
                </Link>
                <Link href="/magazine" className="btn-white" style={{ fontSize: '11px' }}>
                  Browse All 184 Volumes
                </Link>
              </div>
            </div>

            {/* Special Reports */}
            <div style={{
              background: '#0c1729',
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              color: '#ffffff',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '9px', color: '#fef08a', letterSpacing: '0.12em', fontWeight: 700 }}>
                  DECLASSIFIED DOSSIER // REPORT #88
                </span>
                <Link href="/special-reports" style={{ fontSize: '11px', color: '#fef08a', fontWeight: 700 }}>Reports →</Link>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                The Post-Dollar Clearing Architecture
              </h3>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                Tracking $9.4 Trillion in non-Western multilateral currency swap facilities across 42 jurisdictions and shadow reserve accumulation.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link href="/special-reports/post-dollar-clearing-architecture" className="btn-ochre" style={{ fontSize: '11px' }}>
                  Access Dossier (PDF)
                </Link>
                <Link href="/special-reports" className="btn-white" style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>
                  View All Audits
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. NAVY CTA BANNER */}
        <div className="navy-cta-banner">
          <div>
            <div className="navy-cta-eyebrow">
              RESEARCH FELLOWSHIP PROGRAM
            </div>
            <h2 className="navy-cta-title">
              Publish your quantitative research through the Derivion Syndicate
            </h2>
            <p className="navy-cta-desc">
              We provide verified financial economists, hardware architects, and policy historians with peer review, editing desks, cryptographic verification, and instant institutional distribution.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-ochre"
              style={{ whiteSpace: 'nowrap', padding: '10px 24px' }}
            >
              Inquire for Fellowship
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*='grid-template-columns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*='grid-template-columns: 1.4fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .da-hero__grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .da-hero__left {
            grid-template-rows: 220px 220px !important;
          }
          .da-hero__card--featured {
            min-height: 400px !important;
          }
          .da-stats-bar {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
