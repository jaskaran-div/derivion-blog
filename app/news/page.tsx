'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface SpotlightNews {
  id: string;
  slug: string;
  categoryBadge: string;
  date: string;
  dispatchNo: string;
  readTime: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  imgGrad: string;
}

interface DispatchCard {
  id: string;
  slug: string;
  category: string;
  time: string;
  title: string;
  excerpt: string;
  metric?: {
    label: string;
    value: string;
    note?: string;
    type?: 'chart' | 'box' | 'alert' | 'bolt' | 'progress';
  };
  tags?: string[];
  bureau: string;
}

const spotlightItems: SpotlightNews[] = [
  {
    id: 'sp1',
    slug: 'hbm4-next-gen-stacks-thermodynamic-ceilings',
    categoryBadge: 'SPOTLIGHT • AI Infrastructure',
    date: 'OCTOBER 29, 2024',
    dispatchNo: 'DISPATCH #1892',
    readTime: '4 MIN READ',
    title: 'HBM4 Next-Gen Stacks: Sovereign Foundry Yields Confront Thermodynamic Ceilings',
    excerpt: 'Advanced packaging bottlenecks in East Asian fabrication facilities have triggered unprecedented capital relocation toward proprietary liquid-cooling testbenches.',
    authorName: 'Dr. Vikram Singhania',
    authorRole: 'Senior Fellow, Sovereign Tech',
    authorInitials: 'VS',
    imgGrad: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  },
  {
    id: 'sp2',
    slug: 'transatlantic-term-premium-divergence',
    categoryBadge: 'SPOTLIGHT • Macro & Debt',
    date: 'OCTOBER 28, 2024',
    dispatchNo: 'DISPATCH #1891',
    readTime: '6 MIN READ',
    title: 'The Transatlantic Term Premium Divergence: Sovereign Balance Sheets Under Quantitative Tightening',
    excerpt: 'With US debt issuance hitting quarterly records, structural buyers demand heightened inflation-risk protection, widening the spread over core French and German bund facilities.',
    authorName: 'Elena Weber',
    authorRole: 'Chief Fixed Income Economist, Frankfurt',
    authorInitials: 'EW',
    imgGrad: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
  },
  {
    id: 'sp3',
    slug: 'strait-transit-rerouting-freight-hedging',
    categoryBadge: 'SPOTLIGHT • Trade & Logistics',
    date: 'OCTOBER 28, 2024',
    dispatchNo: 'DISPATCH #1890',
    readTime: '5 MIN READ',
    title: 'Strait Transit Re-routing: Bulk Carrier Arbitrage in Cape of Good Hope Freight Hedging',
    excerpt: 'Insurance swap rate spikes continue to force container trajectories, reshaping bunker fuel liquidity pools across Singapore and Port Louis storage terminals.',
    authorName: 'Aris Moros',
    authorRole: 'Maritime Trade Fellow, Piraeus',
    authorInitials: 'AM',
    imgGrad: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
  },
];

const dispatchCards: DispatchCard[] = [
  // ROW 1
  {
    id: 'd1',
    slug: 'ecb-terminal-rate-curve-shifts-higher',
    category: 'Macro Strategy',
    time: '4m ago',
    title: 'ECB Terminal Rate Curve Shifts Higher as Services Sticky Metrics Persist',
    excerpt: 'Money markets adjust pricing as core services inflation prints hotter than expected in latest flash data...',
    metric: {
      label: 'OIS IMPLIED TERMINAL RATE',
      value: '3.125% +64.2 bps',
      type: 'chart',
    },
    bureau: 'Frankfurt Bureau',
  },
  {
    id: 'd2',
    slug: 'global-copper-inventories-14-month-lows',
    category: 'Energy & Metals',
    time: '1h 14m ago',
    title: 'Global Copper Inventories at 14-Month Lows Across LME Certified Vaults',
    excerpt: 'Accelerated drawdown by Asian grid commitments and electric vehicle build programs outstrip smelter inventory...',
    metric: {
      label: 'LME REGISTERED STOCK',
      value: '130,450 MT +22.8% YoY',
      type: 'box',
    },
    bureau: 'London Metal Desk',
  },
  {
    id: 'd3',
    slug: 'gulf-sovereign-wealth-pivot-semiconductors',
    category: 'Sovereign Funds',
    time: '3h 40m ago',
    title: 'Gulf Sovereign Wealth Allocations Pivot to Direct Asian Semiconductor Equity',
    excerpt: 'Mubadala and ADIA increase participation in syndicate mezzanine tranches targeting foundry buildouts...',
    metric: {
      label: 'COMMITTED ASSET CAPITAL',
      value: '$96.4 Billion Q3 TRANSACTIONS',
      type: 'box',
    },
    bureau: 'Abu Dhabi Bureau',
  },

  // ROW 2
  {
    id: 'd4',
    slug: 'custom-asic-silicon-pressure-gpu-margins',
    category: 'AI & Infrastructure',
    time: '5h 12m ago',
    title: 'Custom ASIC Silicons Pressure General-Purpose GPU Cluster Margin Profiles',
    excerpt: 'Hyperscalers ramp internal silicon alternatives, reducing unit capital expenditure while targeting compute performance per watt...',
    tags: ['TPUv5e', 'Trainium', 'MI300'],
    bureau: 'Silicon Valley Desk',
  },
  {
    id: 'd5',
    slug: 'boj-yield-curve-control-yen-carry-trade',
    category: 'FX & Currencies',
    time: '6h 45m ago',
    title: 'Bank of Japan Yield Curve Control Transition Tests Yen Carry Trade Unwinds',
    excerpt: 'Institutional leverage metrics show persistent resistance as USD/JPY tests thresholds, reinforced by Ministry of Finance oversight...',
    metric: {
      label: '10Y JGB BENCHMARK YIELD',
      value: '0.958% FLAT',
      type: 'chart',
    },
    bureau: 'Tokyo Desk',
  },
  {
    id: 'd6',
    slug: 'glp-1-small-molecule-formulation-trials',
    category: 'Biotech & Healthcare',
    time: '8h 05m ago',
    title: 'GLP-1 Small Molecule Formulation Trials Threaten Injectable Duopoly Formats',
    excerpt: 'Phase Ib bio-availability data for peptide mimetic oral capsules demonstrate equivalent HbA1c reductions with significantly broader supply elasticities...',
    tags: ['Oral-1', 'Eli-77', 'NVO-91'],
    bureau: 'Zurich Desk',
  },

  // ROW 3
  {
    id: 'd7',
    slug: 'offshore-hvdc-cable-backlogs-2031',
    category: 'Climate Capital',
    time: '9h 40m ago',
    title: 'Offshore High-Voltage Direct Current (HVDC) Cable Backlogs Stretch to 2031',
    excerpt: 'Grid interconnect projects across maritime zones encounter multi-year production bottlenecks for extruded XLPE subsea transmission systems...',
    metric: {
      label: 'Global Grid Pipeline Evaluation',
      value: '16% of Capacity',
      type: 'progress',
    },
    bureau: 'Oslo Bureau',
  },
  {
    id: 'd8',
    slug: 'rules-of-origin-enforcement-transshipment',
    category: 'Trade & Customs',
    time: '11h 50m ago',
    title: 'Rules of Origin Enforcement Tightens in Transshipment Corridors',
    excerpt: 'Customs investigation across Southeast Asian assembly hubs triggers audit reassessments for solar modules and EV component supply chains...',
    tags: ['Tariff Risk Elevated', 'Bilateral Audit'],
    bureau: 'Singapore Desk',
  },
  {
    id: 'd9',
    slug: 'emerging-market-hard-currency-refinancing',
    category: 'Sovereign Debt',
    time: 'Oct 27, 2024',
    title: 'Emerging Market Hard-Currency Refinancing Hurdle Looming into Q1 2025',
    excerpt: 'Sub-Saharan and Latin American sovereign borrowers face record maturities amidst elevated US Treasury yields and sovereign spread compression...',
    metric: {
      label: 'ROLLOVER MATURITIES',
      value: '$61.0 Billion',
      type: 'alert',
    },
    bureau: 'London Desk',
  },

  // ROW 4
  {
    id: 'd10',
    slug: 'systematic-trend-followers-re-leverage-vol',
    category: 'Quantitative Models',
    time: 'Oct 27, 2024',
    title: 'Systematic Trend Followers Re-leverage Long Volatility Across Equity Index Baskets',
    excerpt: 'CTA dispersion strategies forecast positioning stream shifts as multiple sovereign macro triggers synchronize across sovereign yields and crude curves...',
    tags: ['CTA DISPERSION ACTIVE', 'VIX GAMMA TRIAL'],
    bureau: 'Chicago Desk',
  },
  {
    id: 'd11',
    slug: 'prime-core-office-appraisals-stabilize',
    category: 'Capital Markets',
    time: 'Oct 26, 2024',
    title: 'Prime Core Office Appraisals Stabilize Across Frankfurt and London City',
    excerpt: 'Capital deployment re-emerges as core net equivalent yields stabilize, providing a floor for institutional asset managers in prime locations...',
    metric: {
      label: 'METRO CAP RATE MEDIA',
      value: '5.25% Steady',
      type: 'box',
    },
    bureau: 'London Real Estate Desk',
  },
  {
    id: 'd12',
    slug: 'enrichment-capacity-contracts-surge-nuclear',
    category: 'Energy Baselines',
    time: 'Oct 25, 2024',
    title: 'Enrichment Capacity Contracts Surge as Utilities Hedge Triuranium Octoxide Feeds',
    excerpt: 'Western nuclear operators lock in multi-year SWU conversion contracts as geopolitical separation from Rosatom facilities accelerates...',
    metric: {
      label: 'SWU SPOT BENCHMARK',
      value: '$178.50 +7.5%',
      type: 'bolt',
    },
    bureau: 'Paris Energy Bureau',
  },
];

const categoryPills = [
  'All Feeds (455)',
  'Macroeconomics & Debt (88)',
  'Geopolitics & Trade (112)',
  'AI & Infrastructure (94)',
  'Biotech & Life Sciences (71)',
  'Climate Capital (90)',
];

export default function AllNewsInsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All Feeds (455)');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDispatches = useMemo(() => {
    if (activeCategory.startsWith('All')) return dispatchCards;
    const cat = activeCategory.split(' ')[0].toLowerCase();
    return dispatchCards.filter(d =>
      d.category.toLowerCase().includes(cat) || d.title.toLowerCase().includes(cat)
    );
  }, [activeCategory]);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '0 0 60px' }}>
      {/* 1. TOP TICKER BAR */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--border-light)',
        padding: '6px 0',
        fontSize: '9.5px',
        color: 'var(--ink-secondary)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span><strong>LSE (100)</strong> 8,248.50 <span style={{ color: '#16a34a' }}>+0.35%</span></span>
            <span>•</span>
            <span><strong>S&P 500</strong> 5,852.20 <span style={{ color: '#16a34a' }}>+0.28%</span></span>
            <span>•</span>
            <span><strong>BRENT CRUDE</strong> $74.20 <span style={{ color: '#dc2626' }}>-0.15%</span></span>
            <span>•</span>
            <span><strong>GOLD (SPOT)</strong> $2,740.10 <span style={{ color: '#16a34a' }}>+0.42%</span></span>
          </div>
          <div style={{ display: 'flex', gap: '12px', color: 'var(--ink-muted)' }}>
            <span>TUESDAY, OCTOBER 29, 2024</span>
            <span>|</span>
            <span style={{ fontWeight: 700, color: 'var(--ink-black)' }}>GLOBAL EDITION</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '32px' }}>
        {/* 2. HEADER TITLE & TELEMETRY ROW */}
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
              GLOBAL DISPATCH DIRECTORY & INDEX A
            </div>
            <h1 className="page-title">
              All News & Analytical Insights
            </h1>
            <p className="page-subtitle">
              Browse the complete repository of real-time macroeconomic dispatches, energy grid transitions, semiconductor supply chain intelligence, and central bank monitors.
            </p>
          </div>

          {/* Telemetry Header Box - Rounded */}
          <div className="telemetry-box" style={{ flexShrink: 0 }}>
            <div className="telemetry-cell">
              <div className="telemetry-label">
                <span className="dot-green" /> LIVE WIRE STATUS
              </div>
              <div className="telemetry-value">
                FEED ONLINE
              </div>
            </div>
            <div className="telemetry-cell">
              <div className="telemetry-label">
                INDEXED REPOSITORY
              </div>
              <div className="telemetry-value">
                455 Dispatches
              </div>
            </div>
            <div className="telemetry-cell" style={{ background: '#f8fafc' }}>
              <div className="telemetry-label">
                REPORTING DESKS
              </div>
              <div className="telemetry-value" style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>
                8 Special Desks
              </div>
            </div>
          </div>
        </div>

        {/* 3. SEARCH & DUAL FILTER TOOLBAR - Rounded & Clean */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* Search Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search headlines, tickers (e.g. SWIFT, TSMC), analysts, sovereign desks, or topics..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '12px',
                color: 'var(--ink-black)',
              }}
            />
            <span style={{
              fontSize: '10px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              color: '#64748b',
              fontWeight: 600,
            }}>
              ⌘ K
            </span>
          </div>

          {/* Filter Pills Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-light)',
          }}>
            {categoryPills.map(c => (
              <button
                key={c}
                type="button"
                className={`filter-pill ${activeCategory === c ? 'active' : ''}`}
                onClick={() => setActiveCategory(c)}
                style={{ padding: '5px 14px', fontSize: '11px' }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Dropdown Filters & Display View Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select className="filter-select">
                <option>Date Range: All Time</option>
                <option>Past 24 Hours</option>
                <option>Past 7 Days</option>
                <option>Past 30 Days</option>
              </select>

              <select className="filter-select">
                <option>Sort: Chronological (Newest)</option>
                <option>Highest Impact</option>
                <option>Most Read</option>
              </select>

              <select className="filter-select">
                <option>Region: Global / Cross-Border</option>
                <option>North America</option>
                <option>European Union</option>
                <option>Asia-Pacific</option>
                <option>Middle East</option>
              </select>
            </div>

            {/* View Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--ink-muted)' }}>
              <span>Display View:</span>
              <div style={{ display: 'flex', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '4px 10px',
                    background: viewMode === 'list' ? '#0f172a' : '#ffffff',
                    color: viewMode === 'list' ? '#ffffff' : 'var(--ink-secondary)',
                    fontSize: '11px',
                  }}
                  aria-label="List view"
                >
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '4px 10px',
                    background: viewMode === 'grid' ? '#0f172a' : '#ffffff',
                    color: viewMode === 'grid' ? '#ffffff' : 'var(--ink-secondary)',
                    fontSize: '11px',
                  }}
                  aria-label="Grid view"
                >
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. EDITORIAL SELECTIONS */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              EDITORIAL SELECTIONS / EXECUTIVE BRIEFS
            </div>
            <div className="section-label-muted">
              3 Essential Intelligence Pieces
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '22px',
          }}>
            {spotlightItems.map(item => (
              <div
                key={item.id}
                className="editorial-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Photo graphic thumbnail */}
                  <div style={{
                    height: '180px',
                    background: item.imgGrad,
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}>
                    <span style={{
                      fontSize: '8.5px',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'rgba(0,0,0,0.65)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                      width: 'fit-content',
                      letterSpacing: '0.06em',
                    }}>
                      {item.categoryBadge}
                    </span>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5px', color: 'rgba(255,255,255,0.85)' }}>
                      <span>{item.date} • {item.dispatchNo}</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      color: 'var(--ink-black)',
                      lineHeight: 1.3,
                      marginBottom: '10px',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '18px',
                    }}>
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer with Avatar & Clean Icons */}
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '10px' }}>
                      {item.authorInitials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--ink-black)' }}>{item.authorName}</div>
                      <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>{item.authorRole}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link
                      href={`/news/${item.slug}`}
                      style={{
                        fontSize: '11px',
                        color: 'var(--ochre-dark)',
                        fontWeight: 700,
                      }}
                    >
                      Read →
                    </Link>
                    <button type="button" style={{ color: 'var(--ink-muted)', display: 'flex' }} aria-label="Save bookmark">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. ARCHIVED DISPATCH CHRONOLOGY */}
        <div>
          <div className="section-header-row">
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink-black)' }}>
                Archived Dispatch Chronology
              </h2>
            </div>
            <div style={{ fontSize: '10px', color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="dot-green" />
              <span>Archival Ledger · Updated 14m Ago</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
            gap: '18px',
          }}>
            {filteredDispatches.map(card => (
              <div
                key={card.id}
                className="editorial-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Category & Timestamp */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '8.5px',
                      fontWeight: 700,
                      color: 'var(--ochre-dark)',
                      background: '#fefce8',
                      border: '1px solid #fde047',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}>
                      {card.category}
                    </span>
                    <span style={{ fontSize: '9px', color: 'var(--ink-muted)' }}>
                      {card.time}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--ink-black)',
                    lineHeight: 1.3,
                    marginBottom: '8px',
                  }}>
                    {card.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '16px',
                  }}>
                    {card.excerpt}
                  </p>

                  {/* Telemetry Metric Box - Clean SVG Indicators */}
                  {card.metric && (
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <div style={{ fontSize: '8px', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
                          {card.metric.label}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                          {card.metric.value}
                        </div>
                      </div>

                      {card.metric.type === 'chart' && (
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="#b48328" strokeWidth="2.5">
                          <polyline points="1,14 7,9 13,11 23,2" />
                        </svg>
                      )}
                      {card.metric.type === 'box' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                          <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
                        </svg>
                      )}
                      {card.metric.type === 'alert' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                      )}
                      {card.metric.type === 'bolt' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      )}
                      {card.metric.type === 'progress' && (
                        <div style={{ width: '48px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: '16%', height: '100%', background: '#b48328' }} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {card.tags && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {card.tags.map(t => (
                        <span key={t} style={{
                          fontSize: '8.5px',
                          background: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-xs)',
                          color: '#475569',
                          fontWeight: 600,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer with clean SVG icons */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '9.5px',
                }}>
                  <span style={{ color: 'var(--ink-muted)' }}>
                    • {card.bureau}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link
                      href={`/news/${card.slug}`}
                      style={{
                        color: 'var(--ink-black)',
                        fontWeight: 700,
                      }}
                    >
                      View Dispatch →
                    </Link>
                    <button type="button" style={{ color: 'var(--ink-muted)', display: 'flex' }} aria-label="Share">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
                      </svg>
                    </button>
                    <button type="button" style={{ color: 'var(--ink-muted)', display: 'flex' }} aria-label="Bookmark">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6. PAGINATION & BROWSE BY YEAR */}
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
              <button type="button" className="page-btn" onClick={() => setCurrentPage(36)}>
                36
              </button>
              <button
                type="button"
                className="page-btn"
                onClick={() => setCurrentPage(Math.min(36, currentPage + 1))}
              >
                Next
              </button>
            </div>

            <div style={{ fontSize: '10px', color: 'var(--ink-muted)' }}>
              BROWSE BY YEAR: <strong style={{ color: 'var(--ink-black)' }}>2024</strong> • 2023 • 2022 • 2021 • <span style={{ color: 'var(--ochre-dark)' }}>Annual Flowchart (1940-2023)</span>
            </div>
          </div>
        </div>

        {/* 7. DEEP NAVY CTA BANNER - Rounded with No Emojis */}
        <div className="navy-cta-banner" style={{ display: 'block', padding: '44px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '640px' }}>
              <div className="navy-cta-eyebrow">
                INSTITUTIONAL ZERO-LATENCY RAW FEEDS
              </div>
              <h2 className="navy-cta-title">
                Synchronize Direct Terminal Feeds to Your Risk Desk
              </h2>
              <p className="navy-cta-desc">
                Receive unredacted dispatch silos, raw econometric telemetry datasets, and breaking central bank/transaction analysis in your terminal inbox daily at 06:00 UTC.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/special-reports"
                className="btn-ochre"
                style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: 'var(--radius-sm)' }}
              >
                Explore Special Reports →
              </Link>
              <Link
                href="/articles"
                className="btn-white"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: 'var(--radius-sm)' }}
              >
                Longform Monograph Index
              </Link>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            fontSize: '10px',
            color: '#94a3b8',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
          }}>
            <span>Encrypted End-to-End Delivery</span>
            <span>•</span>
            <span>Bloomberg/FactSet Enterprise Integration</span>
            <span>•</span>
            <span>Zero-Syndication Spam Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
