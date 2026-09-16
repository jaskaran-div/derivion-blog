'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Treatise {
  id: string;
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
}

const treatises: Treatise[] = [
  {
    id: 't1',
    slug: 'thermodynamic-imperialism',
    category: 'TECHNOLOGICAL SOVEREIGNTY',
    readTime: '28 Min Read',
    title: 'Thermodynamic Imperialism: The Compute-Power Nexus of Modern Statecraft',
    excerpt: 'Investigating how gigawatt-scale data centers and nuclear baseload containment have replaced deepwater naval access as the primary determinant of national strategic projection.',
    author: 'Dr. Sarah Jenkins • Applied Physics Lab',
  },
  {
    id: 't2',
    slug: 'the-1931-creditanstalt-collapse',
    category: 'HISTORICAL ECONOMICS',
    readTime: '34 Min Read',
    title: 'The 1931 Creditanstalt Collapse and the Anatomy of Pan-European Contagion',
    excerpt: 'A minute-by-minute archival reconstruction of Vienna’s banking disaster, Central European short-term debt moratoriums, and the inevitable unraveling of the interwar Gold Standard.',
    author: 'Julian Vance & Co-Authors • Archival History Fellow',
  },
  {
    id: 't3',
    slug: 'extraterritorial-jurisdiction-subsea-telecom',
    category: 'LEGAL ARCHITECTURE',
    readTime: '22 Min Read',
    title: 'Extraterritorial Jurisdiction in Subsea Telecom Cable Concessions',
    excerpt: 'Analyzing sovereign landing rights, international seabed treaty gray zones, and the weaponization of cable maintenance permits in contested archipelagic waters.',
    author: 'Elena Rostova, LL.M. • Maritime Law Institute',
  },
  {
    id: 't4',
    slug: 'order-book-entropies',
    category: 'QUANTITATIVE ALGORITHMS',
    readTime: '38 Min Read',
    title: 'Order Book Entropies: High-Frequency Information Dissipation at the Limit',
    excerpt: 'Applying non-equilibrium thermodynamics to microsecond limit order books to forecast phase-transition liquidity evaporation during flash events.',
    author: 'Marcus Finch • Derivion Quantitative Unit',
  },
  {
    id: 't5',
    slug: 'geopolitical-metallurgy-neodymium',
    category: 'MINING & GEOLOGY',
    readTime: '31 Min Read',
    title: 'The Geopolitical Metallurgy of High-Purity Neodymium and Dysprosium',
    excerpt: 'Rare earth separation chemistry, environmental cost externalization in Inner Mongolia, and the fragility of magnet manufacturing supply chains.',
    author: 'Claire Fontenot • Commodities Research Bureau',
  },
  {
    id: 't6',
    slug: 'shadow-reserves-evolution-central-bank-pegs',
    category: 'CENTRAL BANKING',
    readTime: '26 Min Read',
    title: 'Shadow Reserves: The Evolution of Central Bank Foreign Exchange Pegs',
    excerpt: 'Investigating off-balance-sheet forward commitments, sovereign wealth derivative overlays, and the true cost of peg defense in frontier economies.',
    author: 'Tariq Al-Mansoor • Sovereign Wealth Desk',
  },
];

const categories = [
  'All Treatises (142)',
  'Monetary Philosophy (20)',
  'Techno-Imperialism (34)',
  'Thermodynamic Economics (22)',
  'Subsea Sovereignty (19)',
  'Historical Archives (26)',
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('All Treatises (142)');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTreatises = useMemo(() => {
    if (activeCategory.startsWith('All')) return treatises;
    const cat = activeCategory.split(' ')[0].toLowerCase();
    return treatises.filter(t =>
      t.category.toLowerCase().includes(cat) || t.title.toLowerCase().includes(cat)
    );
  }, [activeCategory]);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 60px' }}>
      <div className="container">
        {/* HEADER */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '30px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          <div>
            <div className="eyebrow-text">
              EXHAUSTIVE INQUIRY & CRITICAL THEORY • PEER-REVIEWED MONOGRAPHS
            </div>
            <h1 className="page-title">
              Longform Treatises & Analytical Essays
            </h1>
            <p className="page-subtitle">
              In-depth academic investigations, geopolitical history, and quantitative structural essays designed for extensive study, complete with mathematical appendixes and bibliographic citations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button type="button" className="btn-black">
              Download All Citations (.bib)
            </button>
            <button type="button" className="btn-white">
              Editorial Guidelines
            </button>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="filter-pills-bar">
          {categories.map(c => (
            <button
              key={c}
              type="button"
              className={`filter-pill ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Reading Time:</span>
            <select className="filter-select">
              <option>All Lengths</option>
              <option>&lt; 20 Mins</option>
              <option>20 - 40 Mins</option>
              <option>&gt; 40 Mins</option>
            </select>
          </div>
        </div>

        {/* COVER TREATISE HERO BOX */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: '32px',
          marginBottom: '52px',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '40px',
        }}>
          {/* Left: Main treatise details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{
                background: '#0f172a',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '8.5px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                textTransform: 'uppercase',
              }}>
                COVER TREATISE • OCTOBER 2024
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                42 MIN READ • 11,400 WORDS
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 2.8vw, 34px)',
              fontWeight: 800,
              color: 'var(--ink-primary)',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}>
              The Architecture of Sovereign Indebtedness: Bilateral Swap Lines as Monetary Hegemony
            </h2>

            <p style={{
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'var(--ink-secondary)',
              marginBottom: '20px',
            }}>
              An empirical deconstruction of post-Bretton Woods central bank liquidity plumbing. How bilateral Federal Reserve swap lines and offshore repo facilities forged an invisible, extraterritorial safety net that reorders sovereign fiscal autonomy during global systemic liquidity shocks.
            </p>

            {/* Pull Quote Box */}
            <div style={{
              background: '#fcfbfa',
              borderLeft: '3px solid #0f172a',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              padding: '14px 18px',
              marginBottom: '28px',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '13px',
              color: 'var(--ink-primary)',
              lineHeight: 1.6,
            }}>
              “The swap line is neither loan nor aid; it is an architectural extension of the sovereign domestic money supply beyond geographic borders.”
            </div>

            {/* Author Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div className="avatar-circle">
                AS
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                  Prof. Alistair Sterling
                </div>
                <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                  Chair of Macrofinancial History, Oxford & Derivion
                </div>
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)' }}>
                  DOI: 10.1093/deriv.2024.108
                </span>
                <Link
                  href="/articles/the-architecture-of-sovereign-indebtedness"
                  className="btn-black"
                  style={{ padding: '8px 16px' }}
                >
                  Read Full Treatise →
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Treatise Dossier & Sections */}
          <div style={{
            background: '#fafaf9',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--gold-dark)',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '8px',
              }}>
                TREATISE DOSSIER & SECTIONS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { sec: '§ 1.0', title: 'The Geopolitics of Liquidity: From Gold Anchors to Balance Sheet Facilities' },
                  { sec: '§ 2.0', title: 'The Offshore Eurodollar Clearing Architecture and Collateral Scarcity' },
                  { sec: '§ 3.0', title: 'Econometric Analysis of 2008 & 2020 Cross-Currency Swap Basis Spikes' },
                  { sec: '§ 4.0', title: 'The Weaponization of Repo: Exclusion as the Ultimate Sovereign Sanction' },
                  { sec: '§ 5.0', title: 'Mathematical Appendix: Dual-Variable Term Premium Dynamics' },
                ].map(s => (
                  <div key={s.sec} style={{ display: 'flex', gap: '10px', fontSize: '11.5px', lineHeight: 1.4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--gold-dark)', fontWeight: 700, flexShrink: 0 }}>
                      {s.sec}
                    </span>
                    <span style={{ color: 'var(--ink-secondary)' }}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-light)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              marginTop: '20px',
            }}>
              <span style={{ color: 'var(--ink-muted)' }}>
                48 Citations Indexed
              </span>
              <a href="#" style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>
                Download PDF Facsimile (3.2 MB)
              </a>
            </div>
          </div>
        </div>

        {/* QUARTERLY RESEARCH TREATISES GRID */}
        <div>
          <div className="section-header-row">
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                Quarterly Research Treatises
              </h2>
              <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                Peer-reviewed quantitative and sociological inquiries published by Derivion fellows.
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-muted)' }}>
              Page 1 of 12 (Showing 6 of 142 Articles)
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {filteredTreatises.map(t => (
              <div
                key={t.id}
                className="editorial-card"
                style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8.5px',
                      fontWeight: 600,
                      color: '#854d0e',
                      background: '#fefce8',
                      border: '1px solid #fde047',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      letterSpacing: '0.04em',
                    }}>
                      {t.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)' }}>
                      {t.readTime}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--ink-primary)',
                    lineHeight: 1.3,
                    marginBottom: '10px',
                  }}>
                    {t.title}
                  </h3>

                  <p style={{
                    fontSize: '12px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {t.excerpt}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                }}>
                  <span style={{ color: 'var(--ink-muted)' }}>
                    {t.author}
                  </span>
                  <Link
                    href={`/articles/${t.slug}`}
                    style={{
                      color: 'var(--ink-primary)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Read Essay →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination-bar">
            <div className="pagination-pages">
              <button
                type="button"
                className="page-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                Previous
              </button>
              {[1, 2, 3].map(p => (
                <button
                  key={p}
                  type="button"
                  className={`page-btn ${currentPage === p ? 'active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <span style={{ padding: '0 4px', color: 'var(--ink-muted)' }}>..</span>
              <button type="button" className="page-btn" onClick={() => setCurrentPage(12)}>
                12
              </button>
              <button
                type="button"
                className="page-btn"
                onClick={() => setCurrentPage(Math.min(12, currentPage + 1))}
              >
                Next
              </button>
            </div>

            <button
              type="button"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                color: 'var(--ink-primary)',
                fontWeight: 600,
              }}
            >
              Export Full Monograph Index (CSV / BibTeX) ↓
            </button>
          </div>
        </div>

        {/* NAVY CTA BANNER */}
        <div className="navy-cta-banner">
          <div>
            <div className="navy-cta-eyebrow">
              INSTITUTIONAL & UNIVERSITY ARCHIVE LICENSES
            </div>
            <h2 className="navy-cta-title">
              Acquire CrossRef DOI Licenses & Unredacted Mathematical Data
            </h2>
            <p className="navy-cta-desc">
              Universities, central banks, and algorithmic research labs can license our full LaTeX source repository, quantitative testbenches, and verified datasets.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-gold"
              style={{ whiteSpace: 'nowrap', padding: '10px 22px' }}
            >
              Institutional Repository Licensing
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          div[style*='grid-template-columns: 1.4fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
