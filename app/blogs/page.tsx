'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface PinnacleFellow {
  id: string;
  slug: string;
  badge: string;
  cadence: string;
  initials: string;
  name: string;
  role: string;
  title: string;
  excerpt: string;
  latest: string;
}

interface CreatorNotebook {
  id: string;
  slug: string;
  category: string;
  dispatches: string;
  title: string;
  author: string;
  excerpt: string;
  updated: string;
}

const pinnacleFellows: PinnacleFellow[] = [
  {
    id: 'pf1',
    slug: 'silicon-foundry-ledger',
    badge: 'SUBSTACK • 14.2K READERS',
    cadence: 'Weekly',
    initials: 'VS',
    name: 'Dr. Vikram Singhania',
    role: 'Chair, Computational Materials Desk',
    title: 'The Silicon Foundry Ledger',
    excerpt: 'Unpacking extreme ultraviolet lithography bottlenecks, wafer-scale thermodynamic dissipation, and state-backed foundry capital expenditure strategies.',
    latest: 'Yesterday',
  },
  {
    id: 'pf2',
    slug: 'yield-arbitrage-journal',
    badge: 'SUBSTACK • 21.8K READERS',
    cadence: 'Twice Monthly',
    initials: 'EW',
    name: 'Elena Weber',
    role: 'Senior Fellow, Sovereign Debt & Yields',
    title: 'The Yield Arbitrage Journal',
    excerpt: 'Weekly dissections of G10 sovereign debt issuance, shadow liquidity dynamics, cross-currency basis swaps, and European debt divergence.',
    latest: '3 days ago',
  },
  {
    id: 'pf3',
    slug: 'chokepoint-chronology',
    badge: 'COLUMN • 9.4K READERS',
    cadence: 'Weekly',
    initials: 'AM',
    name: 'Aris Moros',
    role: 'Maritime Security Analyst, Piraeus',
    title: 'Chokepoint Chronology',
    excerpt: 'Geopolitical logistics, bulk carrier transit arbitrage in the Bab-el-Mandeb, vessel telemetry data, and global bunker fuel pricing spikes.',
    latest: 'Oct 28',
  },
];

const creatorNotebooks: CreatorNotebook[] = [
  {
    id: 'cn1',
    slug: 'marginal-liquidity-notes',
    category: 'MACROECONOMICS',
    dispatches: '18 Dispatches',
    title: 'Marginal Liquidity Notes',
    author: 'by Dr. Julian Vance • Tokyo Desk',
    excerpt: 'Investigating overnight repo mechanics, Bank of Japan balance sheet shifts, and the unwinding of cross-border carry trades.',
    updated: 'Updated 4h ago',
  },
  {
    id: 'cn2',
    slug: 'vol-surface-decomposition-latest',
    category: 'QUANT & ASSETS',
    dispatches: '32 Dispatches',
    title: 'Vol Surface Decomposition',
    author: 'by Marcus Finch • Chicago Bureau',
    excerpt: 'Systematic options dispersion models, VIX term-structure anomalies, and gamma imbalances across sovereign ETF complexes.',
    updated: 'Updated Oct 27',
  },
  {
    id: 'cn3',
    slug: 'the-fuel-factor',
    category: 'ENERGY & COMMODITIES',
    dispatches: '24 Dispatches',
    title: 'The Fuel Factor',
    author: 'by Claire Fontenot • Paris Energy Bureau',
    excerpt: 'Nuclear enrichment supply curves, uranium triuranium octoxide contracts, and European electricity grid interconnection economics.',
    updated: 'Updated Oct 26',
  },
  {
    id: 'cn4',
    slug: 'deep-cable-cartography',
    category: 'INFRASTRUCTURE',
    dispatches: '15 Dispatches',
    title: 'Deep Cable Cartography',
    author: 'by Dr. S. Thoma • London Research Unit',
    excerpt: 'Undersea fiber optics, HVDC grid interconnections across the North Sea, and sovereign terrestrial transmission bottlenecks.',
    updated: 'Updated Oct 25',
  },
  {
    id: 'cn5',
    slug: 'peptide-economics',
    category: 'BIOTECH & CAPITAL',
    dispatches: '11 Dispatches',
    title: 'Peptide Economics',
    author: 'by Dr. Ananya Sen • Zurich BioDesk',
    excerpt: 'GLP-1 manufacturing yield challenges, oral peptide patent expiration schedules, and healthcare sovereign fund deployments.',
    updated: 'Updated Oct 24',
  },
  {
    id: 'cn6',
    slug: 'state-balance-sheets',
    category: 'SOVEREIGN WEALTH',
    dispatches: '19 Dispatches',
    title: 'State Balance Sheets',
    author: 'by Tariq Al-Mansoor • Abu Dhabi Bureau',
    excerpt: 'Tracking direct allocations into semiconductor mezzanine tranches and sovereign capital recycling across ASEAN corridors.',
    updated: 'Updated Oct 22',
  },
];

const categoryPills = [
  'All Creators (48)',
  'Macro Theorists (14)',
  'Algorithmic Physics (9)',
  'Energy Geopolitics (11)',
  'Maritime & Logistics (7)',
  'Archival Cryptography (7)',
];

export default function CreatorBlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All Creators (48)');
  const [sortBy, setSortBy] = useState('Most Recent Dispatch');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNotebooks = useMemo(() => {
    if (activeCategory.startsWith('All')) return creatorNotebooks;
    const cat = activeCategory.split(' ')[0].toLowerCase();
    return creatorNotebooks.filter(c =>
      c.category.toLowerCase().includes(cat) || c.title.toLowerCase().includes(cat)
    );
  }, [activeCategory]);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 60px' }}>
      <div className="container">
        {/* TOP HEADER ROW */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '30px',
          marginBottom: '28px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div className="eyebrow-text">
              ACADEMY FELLOWS & INDEPENDENT AUTHORS • ESSAYS & SUBSTACK DISPATCHES
            </div>
            <h1 className="page-title">
              Creator Columns & Dedicated Blogs
            </h1>
            <p className="page-subtitle">
              Unfiltered research notebooks, specialized domain blogs, and thematic dispatches authored by Derivion Academy senior fellows, algorithmic theorists, and sovereign debt historians.
            </p>
          </div>

          {/* TELEMETRY BOX */}
          <div className="telemetry-box" style={{ flexShrink: 0 }}>
            <div className="telemetry-cell">
              <div className="telemetry-label">
                <span className="dot-green" /> DISPATCH TELEMETRY
              </div>
              <div className="telemetry-value">
                ACTIVE SYNDICATION
              </div>
            </div>
            <div className="telemetry-cell">
              <div className="telemetry-label">
                ROSTER / CADENCE
              </div>
              <div className="telemetry-value">
                48 FELLOWS • BI-WEEKLY
              </div>
            </div>
            <div className="telemetry-cell" style={{ background: '#fefce8' }}>
              <div className="telemetry-label" style={{ color: '#854d0e' }}>
                VOL. IV • Q4 2024
              </div>
              <div className="telemetry-value" style={{ color: '#713f12', fontSize: '9px' }}>
                ISSN 2841-9042
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="filter-pills-bar">
          {categoryPills.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option>Most Recent Dispatch</option>
              <option>Readership Scale</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {/* SECTION 1: PINNACLE FELLOW NEWSLETTERS */}
        <div style={{ marginBottom: '44px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              <span className="dot-gold" /> PINNACLE FELLOW NEWSLETTERS
            </div>
            <div className="section-label-muted">
              CURATED BY EDITORIAL BOARD
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}>
            {pinnacleFellows.map(fellow => (
              <div
                key={fellow.id}
                className="editorial-card"
                style={{
                  borderTop: '3px solid #b48328',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      background: '#fefce8',
                      border: '1px solid #fde047',
                      color: '#854d0e',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      letterSpacing: '0.04em',
                    }}>
                      {fellow.badge}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {fellow.cadence}
                    </span>
                  </div>

                  {/* Author Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div className="avatar-circle">
                      {fellow.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        {fellow.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                        {fellow.role}
                      </div>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--ink-primary)',
                    lineHeight: 1.25,
                    marginBottom: '10px',
                  }}>
                    {fellow.title}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'var(--ink-secondary)',
                    marginBottom: '20px',
                  }}>
                    {fellow.excerpt}
                  </p>
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                }}>
                  <span style={{ color: 'var(--ink-muted)' }}>
                    Latest: {fellow.latest}
                  </span>
                  <Link
                    href={`/blogs/${fellow.slug}`}
                    style={{
                      color: 'var(--gold-dark)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    View Column →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: ALL CREATOR PUBLICATIONS & NOTEBOOKS */}
        <div>
          <div className="section-header-row">
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--ink-primary)' }}>
                All Creator Publications & Notebooks
              </h2>
              <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                Explore recent long-form notes and personal analytical blogs from our research roster.
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-muted)' }}>
              Showing 1-9 of 48 Creator Hubs
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '18px',
          }}>
            {filteredNotebooks.map(nb => (
              <div
                key={nb.id}
                className="editorial-card"
                style={{
                  padding: '20px',
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
                      color: 'var(--ink-muted)',
                      border: '1px solid var(--border-light)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      letterSpacing: '0.04em',
                    }}>
                      {nb.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--ink-muted)' }}>
                      {nb.dispatches}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--ink-primary)',
                    marginBottom: '4px',
                  }}>
                    {nb.title}
                  </h3>

                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: 'var(--gold-dark)',
                    marginBottom: '10px',
                    fontWeight: 500,
                  }}>
                    {nb.author}
                  </div>

                  <p style={{
                    fontSize: '12px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {nb.excerpt}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9.5px',
                }}>
                  <span style={{ color: 'var(--ink-muted)' }}>
                    {nb.updated}
                  </span>
                  <Link
                    href={`/blogs/${nb.slug}`}
                    style={{
                      color: 'var(--ink-primary)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Explore Blog →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION BAR */}
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

            <button
              type="button"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                color: 'var(--ink-primary)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Load All 48 Columns Ledger ↓
            </button>
          </div>
        </div>

        {/* NAVY CTA BANNER */}
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
              className="btn-gold"
              style={{ whiteSpace: 'nowrap', padding: '10px 22px' }}
            >
              Inquire for Fellowship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
