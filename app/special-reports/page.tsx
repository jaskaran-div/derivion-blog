'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface SpecialDossier {
  id: string;
  slug: string;
  reportNo: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  pages: number;
  format: string;
  desk: string;
}

const dossiers: SpecialDossier[] = [
  {
    id: 'sd1',
    slug: 'trans-pacific-subsea-vulnerability',
    reportNo: 'REPORT #87',
    category: 'INFRASTRUCTURE',
    date: 'August 2024',
    title: 'Trans-Pacific Undersea Cable Vulnerability Audit: Chokepoint Analysis of the Luzon Strait',
    excerpt: 'Physical bathymetry risk models, repair ship flag-state bottlenecks, and financial damage projections in the event of concurrent severed fiber arterials.',
    pages: 84,
    format: 'PDF + Satellite Map',
    desk: 'Tokyo / Maritime',
  },
  {
    id: 'sd2',
    slug: 'strategic-mineral-hoarding-antwerp',
    reportNo: 'REPORT #86',
    category: 'QUANT METALS',
    date: 'July 2024',
    title: 'Strategic Mineral Hoarding & Shadow Warehouse Audits: Antwerp, Rotterdam, and Singapore',
    excerpt: 'Satellite synthetic aperture radar (SAR) inventory verification, off-exchange nickel and lithium off-take contracts, and collateralization risks.',
    pages: 68,
    format: 'PDF + Python Notebook',
    desk: 'London Metals Desk',
  },
  {
    id: 'sd3',
    slug: 'small-modular-reactor-sovereign-guarantees',
    reportNo: 'REPORT #85',
    category: 'POWER & NUCLEAR',
    date: 'June 2024',
    title: 'Small Modular Reactor Economics: Financing Cascades & Sovereign Guarantee Structures',
    excerpt: 'Levelized cost of electricity (LCOE) sensitivity models, regulatory delay externalities, and state-backed underwriting benchmarks for nuclear data centers.',
    pages: 56,
    format: 'PDF + Excel Financial Model',
    desk: 'Paris Energy Bureau',
  },
  {
    id: 'sd4',
    slug: 'sovereign-ai-fund-tracker',
    reportNo: 'REPORT #84',
    category: 'SOVEREIGN WEALTH',
    date: 'May 2024',
    title: 'The Sovereign AI Fund Tracker: Public Capital Deployment into Advanced Accelerators',
    excerpt: 'Cross-border direct investments by Middle Eastern and East Asian sovereign vehicles into semiconductor fab clusters and domestic model training clusters.',
    pages: 74,
    format: 'PDF + RealFlow Database',
    desk: 'Abu Dhabi / Singapore',
  },
  {
    id: 'sd5',
    slug: 'phosphorus-geopolitics-fertilizer',
    reportNo: 'REPORT #83',
    category: 'AGRI-GEOPOLITICS',
    date: 'April 2024',
    title: 'Phosphorus Geopolitics and Global Fertilizer Trade Realignment',
    excerpt: 'Depletion schedules of high-grade phosphate rock in North Africa, export tariffs, and crop yield impacts on South and Southeast Asian agricultural balance sheets.',
    pages: 62,
    format: 'PDF + Trade Flows CSV',
    desk: 'Mumbai / Commodities',
  },
  {
    id: 'sd6',
    slug: 'central-bank-asset-freezing-precedential-legacy',
    reportNo: 'REPORT #82',
    category: 'MONETARY LAW',
    date: 'March 2024',
    title: 'Central Bank Asset Freezing Jurisprudence: The Precedential Legacy of 2022',
    excerpt: 'Comparative analysis of customary international immunity, sovereign countermeasure doctrines, and foreign central bank reserve re-domiciliation away from Euroclear.',
    pages: 78,
    format: 'PDF + Legal Casebook',
    desk: 'Geneva / Sovereign Debt',
  },
];

const categories = [
  'All Special Reports (54)',
  'Sovereign Debt Forensics (16)',
  'Semiconductor & Fab Supply Chains (8)',
  'Energy Grid & Baseload Risk (9)',
  'Central Bank Reserves (7)',
  'Maritime Chokepoint Audits (6)',
];

export default function SpecialReportsPage() {
  const [activeCategory, setActiveCategory] = useState('All Special Reports (54)');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDossiers = useMemo(() => {
    if (activeCategory.startsWith('All')) return dossiers;
    const cat = activeCategory.split(' ')[0].toLowerCase();
    return dossiers.filter(d =>
      d.category.toLowerCase().includes(cat) || d.title.toLowerCase().includes(cat)
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
              INVESTIGATIVE AUDITS & SECTOR RISK DOSSIERS • EXECUTIVE BRIEFINGS
            </div>
            <h1 className="page-title">
              Special Intelligence Reports & Audits
            </h1>
            <p className="page-subtitle">
              Exhaustive, multi-month forensic investigations into systemic risk, sovereign debt re-benchmarking, critical supply chain choke points, and geopolitical capital flows.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button type="button" className="btn-black">
              Enterprise Syndicate Access
            </button>
            <button type="button" className="btn-white">
              Download Annual Compendium
            </button>
          </div>
        </div>

        {/* HERO DEEP DIVE REPORT (Navy Card from Image 5) */}
        <div style={{
          background: '#0c1729',
          borderRadius: 'var(--radius-sm)',
          color: '#ffffff',
          padding: '36px',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '44px',
          display: 'grid',
          gridTemplateColumns: '1.45fr 1fr',
          gap: '40px',
        }}>
          {/* Left Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                color: '#0f172a',
                background: 'var(--gold)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                letterSpacing: '0.08em',
              }}>
                DEEP DIVE REPORT // REPORT NO. 88
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#94a3b8' }}>
                PUBLISHED: OCTOBER 2024 • 92 PAGES
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 2.8vw, 32px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}>
              The Post-Dollar Clearing Architecture: Bilateral Currency Swaps, CIPS Interoperability, and Shadow Reserve Accumulation
            </h2>

            <p style={{
              fontSize: '12.5px',
              lineHeight: 1.65,
              color: '#cbd5e1',
              marginBottom: '24px',
            }}>
              A comprehensive forensic study tracking over $9.4 Trillion in non-Western multilateral currency swap facilities across 42 jurisdictions. Featuring original transaction topology maps, correspondent bank disconnect models, and econometric projections for global offshore liquidity through 2030.
            </p>

            {/* 3 Telemetry Stats */}
            <div style={{ display: 'flex', gap: '28px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Audited Jurisdictions
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                  42 Central Banks
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Data Points Indexed
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                  18,450 Transfers
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Primary Security Status
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#4ade80', marginTop: '6px' }}>
                  Declassified
                </div>
              </div>
            </div>

            {/* Investigator & Buttons */}
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
              Lead Investigator: <strong style={{ color: '#ffffff' }}>Dr. Henrik Van Der Berg</strong> (Zurich Bureau)
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/special-reports/post-dollar-clearing-architecture"
                className="btn-gold"
                style={{ padding: '9px 18px' }}
              >
                Access Executive Dossier (PDF)
              </Link>
              <button
                type="button"
                className="btn-white"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)', padding: '9px 18px' }}
              >
                Interactive Telemetry Model
              </button>
            </div>
          </div>

          {/* Right Column: Deliverables Sidebar */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-sm)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '8px',
              }}>
                DOSSIER DELIVERABLES & APPENDICES
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Volume 1: Systemic Liquidity Topology & Clearing Disconnects',
                  'Volume 2: 42 Jurisdictional Sovereign Bilateral Agreements',
                  'Appendix A: Python Econometric Backtest Models & CSV Datasets',
                  'Fold-out Map: Global Subsea & Terrestrial Clearing Fiber Routes',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#cbd5e1', lineHeight: 1.4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ochre-light)" strokeWidth="2.2" style={{ flexShrink: 0 }}>
                      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: '#94a3b8',
              marginTop: '20px',
            }}>
              <span>ISBN: 978-1-95284-498-2</span>
              <span style={{ color: 'var(--gold-light)' }}>RESTRICTED DISTRIBUTION</span>
            </div>
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
            <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Format:</span>
            <select className="filter-select">
              <option>All Deliverables</option>
              <option>PDF + Data</option>
              <option>Interactive</option>
            </select>
          </div>
        </div>

        {/* SECTION: DECLASSIFIED SPECIAL REPORTS & FORENSIC STUDIES */}
        <div>
          <div className="section-header-row">
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                Declassified Special Reports & Forensic Studies
              </h2>
              <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                Exhaustive publications available for institutional members and subscriber desk syndicates.
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-muted)' }}>
              Showing 1-6 of 38 Reports
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {filteredDossiers.map(dossier => (
              <div
                key={dossier.id}
                className="editorial-card"
                style={{
                  borderTop: '3px solid #b48328',
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
                      color: 'var(--gold-dark)',
                      letterSpacing: '0.04em',
                    }}>
                      {dossier.reportNo} • {dossier.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)' }}>
                      {dossier.date}
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
                    {dossier.title}
                  </h3>

                  <p style={{
                    fontSize: '12px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '18px',
                  }}>
                    {dossier.excerpt}
                  </p>

                  {/* Metadata spec box */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    fontSize: '10.5px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ink-secondary)',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Pagination:</span>
                      <strong style={{ color: 'var(--ink-primary)' }}>{dossier.pages} Pages</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Format:</span>
                      <span>{dossier.format}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Desk:</span>
                      <span>{dossier.desk}</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                }}>
                  <span style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                    Institutional Access
                  </span>
                  <Link
                    href={`/special-reports/${dossier.slug}`}
                    className="btn-black"
                    style={{ fontSize: '10px', padding: '5px 12px' }}
                  >
                    Download Dossier
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
              <button type="button" className="page-btn" onClick={() => setCurrentPage(6)}>
                6
              </button>
              <button
                type="button"
                className="page-btn"
                onClick={() => setCurrentPage(Math.min(6, currentPage + 1))}
              >
                Next
              </button>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-primary)', fontWeight: 600 }}>
              Request Full Dossier Archive Access (ZIP / API) ↓
            </div>
          </div>
        </div>

        {/* NAVY CTA BANNER */}
        <div className="navy-cta-banner">
          <div>
            <div className="navy-cta-eyebrow">
              DERIVION ACADEMY EXECUTIVE PORTAL
            </div>
            <h2 className="navy-cta-title">
              Equip your investment committee with unredacted forensic dossiers
            </h2>
            <p className="navy-cta-desc">
              Institutional license holders receive raw geospatial files, econometric model spreadsheets, and direct teleconference access to lead report investigators.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn-gold"
              style={{ whiteSpace: 'nowrap', padding: '10px 22px' }}
            >
              Inquire for Institutional License
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          div[style*='grid-template-columns: 1.45fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
