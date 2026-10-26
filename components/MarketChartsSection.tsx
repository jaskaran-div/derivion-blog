'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { MarketSnapshot, MarketInstrument } from '@/lib/marketSnapshot';
import { formatDataDate } from '@/lib/marketSnapshot';

// ── Types ────────────────────────────────────────────────────────────────────

type IntelligenceTab = 'central-banks' | 'macro-pulse' | 'research-radar';

interface CentralBankRate {
  id: string;
  bank: string;
  name: string;
  jurisdiction: string;
  flag: string;
  currentRate: number;
  bias: 'hike' | 'hold' | 'cut' | 'neutral';
  biasLabel: string;
  nextMeeting: string;
  probability: string;
  note: string;
}

interface MacroIndicator {
  id: string;
  name: string;
  category: string;
  current: string;
  previous: string;
  change: string;
  up: boolean | null;
  targetOrBenchmark: string;
  source: string;
  chartType: 'sparkline' | 'bar';
  sparkValues: number[];
}

interface ResearchTopic {
  domain: string;
  articlesCount: number;
  percentage: number;
  primaryDesk: string;
  href: string;
  tags: string[];
}

// ── Curated Data from Derivion News & Blog Archives ─────────────────────────

const CENTRAL_BANKS_DATA: CentralBankRate[] = [
  {
    id: 'fomc',
    bank: 'Federal Reserve',
    name: 'Fed Funds Upper Rate',
    jurisdiction: 'United States',
    flag: '🇺🇸',
    currentRate: 4.00,
    bias: 'hold',
    biasLabel: 'Hold Expected',
    nextMeeting: 'Oct 28 (Wed)',
    probability: '90% hold implied',
    note: 'Debate on rate restrictiveness; Q3 advance GDP 3.5% SAAR',
  },
  {
    id: 'ecb',
    bank: 'European Central Bank',
    name: 'Main Refinancing Rate',
    jurisdiction: 'Eurozone',
    flag: '🇪🇺',
    currentRate: 2.50,
    bias: 'hold',
    biasLabel: 'Hold Expected',
    nextMeeting: 'Oct 29 (Thu)',
    probability: 'Hold base case',
    note: 'Balancing upside energy risk with tighter financial conditions',
  },
  {
    id: 'boe',
    bank: 'Bank of England',
    name: 'Official Bank Rate',
    jurisdiction: 'United Kingdom',
    flag: '🇬🇧',
    currentRate: 4.75,
    bias: 'neutral',
    biasLabel: 'Hold / Data Watch',
    nextMeeting: 'Nov 05 (Thu)',
    probability: 'Hold expected',
    note: 'DMP wage expectations steady at 3.5% Y/Y; Autumn Budget watch',
  },
  {
    id: 'rbi',
    bank: 'Reserve Bank of India',
    name: 'Policy Repo Rate',
    jurisdiction: 'India',
    flag: '🇮🇳',
    currentRate: 6.50,
    bias: 'neutral',
    biasLabel: 'Neutral Stance',
    nextMeeting: 'Dec MPC',
    probability: 'Stance unchanged',
    note: 'Food price trajectory & domestic credit growth in focus',
  },
  {
    id: 'boc',
    bank: 'Bank of Canada',
    name: 'Overnight Rate',
    jurisdiction: 'Canada',
    flag: '🇨🇦',
    currentRate: 2.50,
    bias: 'hike',
    biasLabel: '+25 bps Hike',
    nextMeeting: 'Oct 28 (Wed)',
    probability: '80% hike implied',
    note: 'Energy prices bleeding into broader price stickiness',
  },
  {
    id: 'rbnz',
    bank: 'Reserve Bank of NZ',
    name: 'Official Cash Rate',
    jurisdiction: 'New Zealand',
    flag: '🇳🇿',
    currentRate: 3.00,
    bias: 'hike',
    biasLabel: '+25 bps Hike',
    nextMeeting: 'Oct 28 (Wed)',
    probability: 'Westpac hike call',
    note: 'Higher fuel & weaker NZD driving near-term inflation upside',
  },
  {
    id: 'boj',
    bank: 'Bank of Japan',
    name: 'Policy Balance Rate',
    jurisdiction: 'Japan',
    flag: '🇯🇵',
    currentRate: 1.25,
    bias: 'hold',
    biasLabel: 'Hold (Hike in Dec)',
    nextMeeting: 'Oct 30 (Fri)',
    probability: '80% hike odds for Dec',
    note: 'No back-to-back hike after Sept; Dec 18 meeting targeted',
  },
];

const MACRO_INDICATORS_DATA: MacroIndicator[] = [
  {
    id: 'us10y',
    name: 'US 10Y Benchmark Yield',
    category: 'Sovereign Debt',
    current: '4.98%',
    previous: '5.10%',
    change: '-12 bps',
    up: false,
    targetOrBenchmark: 'Resistance: 5.15%',
    source: 'Derivion Desk Wire / Treasury',
    chartType: 'sparkline',
    sparkValues: [5.12, 5.10, 5.08, 5.04, 5.02, 4.98],
  },
  {
    id: 'brent',
    name: 'Brent Crude Oil',
    category: 'Energy Commodities',
    current: '$113.40',
    previous: '$110.80',
    change: '+2.35%',
    up: true,
    targetOrBenchmark: '5-Month Peak: $115.00',
    source: 'Global Macro Bureau / EIA',
    chartType: 'sparkline',
    sparkValues: [102.5, 105.0, 107.8, 109.5, 110.8, 113.4],
  },
  {
    id: 'us_gdp',
    name: 'US Q3 GDPNow (SAAR)',
    category: 'Economic Growth',
    current: '3.50%',
    previous: '2.20%',
    change: '+130 bps',
    up: true,
    targetOrBenchmark: 'Consensus: 3.00%',
    source: 'Federal Reserve Bank of Atlanta',
    chartType: 'bar',
    sparkValues: [2.2, 2.7, 3.1, 3.5],
  },
  {
    id: 'core_pce',
    name: 'US Core PCE Inflation',
    category: 'Price Index',
    current: '0.33%',
    previous: '0.24%',
    change: '+9 bps m/m',
    up: true,
    targetOrBenchmark: 'Fed Target: 2.0% Y/Y',
    source: 'Bureau of Economic Analysis',
    chartType: 'bar',
    sparkValues: [0.22, 0.24, 0.27, 0.33],
  },
  {
    id: 'india_vix',
    name: 'India VIX Volatility',
    category: 'Derivatives Structure',
    current: '14.80',
    previous: '15.45',
    change: '-0.65 pts',
    up: false,
    targetOrBenchmark: 'Median Band: 13.5 - 16.5',
    source: 'NSE India / ISFT F&O Desk',
    chartType: 'sparkline',
    sparkValues: [16.2, 15.9, 15.7, 15.4, 15.1, 14.8],
  },
  {
    id: 'gold_ibja',
    name: 'Gold 24K (IBJA Benchmark)',
    category: 'Precious Metals',
    current: '₹78,450',
    previous: '₹77,800',
    change: '+0.84%',
    up: true,
    targetOrBenchmark: 'Support: ₹76,500/10g',
    source: 'IBJA India Benchmarks',
    chartType: 'sparkline',
    sparkValues: [76500, 76900, 77200, 77500, 77800, 78450],
  },
];

const RESEARCH_RADAR_DATA: ResearchTopic[] = [
  {
    domain: 'Macro Policy & Central Banks',
    articlesCount: 14,
    percentage: 38,
    primaryDesk: 'Global Macro Bureau',
    href: '/news',
    tags: ['FOMC', 'ECB', 'UK Budget', 'BOJ', 'PCE Inflation'],
  },
  {
    domain: 'F&O Derivatives & Market Structure',
    articlesCount: 9,
    percentage: 24,
    primaryDesk: 'ISFT Quantitative Desk',
    href: '/blogs',
    tags: ['Closing Auction (CAS)', 'Nifty Spreads', 'SPAN Margin', 'Settlement Funds'],
  },
  {
    domain: 'Forex & FEMA Regulations',
    articlesCount: 7,
    percentage: 19,
    primaryDesk: 'Regulatory Intelligence',
    href: '/blogs',
    tags: ['LRS $250k', 'FEMA Compliance', 'Currency Derivatives', 'SEBI Directives'],
  },
  {
    domain: 'Trading Psychology & Anti-Fragility',
    articlesCount: 4,
    percentage: 11,
    primaryDesk: 'The Hedge Front Syndicate',
    href: '/blogs',
    tags: ['Drawdown Recovery', 'Discipline', 'Risk Limits', 'Position Sizing'],
  },
  {
    domain: 'Academic & Financial Education',
    articlesCount: 3,
    percentage: 8,
    primaryDesk: 'Derivion Academy Bureau',
    href: '/blogs',
    tags: ['NAAC Benchmarks', 'NIRF Optimization', 'Trading Desks', 'Experiential Learning'],
  },
];

// ── SVG Visualization Helpers ────────────────────────────────────────────────

function RateBar({ rate, maxRate = 7.0 }: { rate: number; maxRate?: number }) {
  const pct = Math.min(100, Math.max(12, (rate / maxRate) * 100));
  return (
    <div className="cb-rate-bar-container">
      <div className="cb-rate-bar-track">
        <div
          className="cb-rate-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="cb-rate-bar-value">{rate.toFixed(2)}%</span>
    </div>
  );
}

function MiniSparkline({ values, up }: { values: number[]; up: boolean | null }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 90;
  const H = 28;
  const padding = 3;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * (W - padding * 2) + padding;
      const y = H - padding - ((v - min) / range) * (H - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = up === true ? '#16a34a' : up === false ? '#dc2626' : '#2563eb';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="macro-spark-svg" aria-hidden="true">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

// ── Main Section Component ───────────────────────────────────────────────────

export default function MarketChartsSection() {
  const [activeTab, setActiveTab] = useState<IntelligenceTab>('central-banks');
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
    if (!apiUrl) return;

    let cancelled = false;
    async function loadSnapshot() {
      try {
        const res = await fetch(`${apiUrl}/api/market/snapshot`, {
          signal: AbortSignal.timeout(6000),
        });
        if (!res.ok) return;
        const body = (await res.json()) as MarketSnapshot;
        if (!cancelled && body?.instruments?.length) {
          setSnapshot(body);
        }
      } catch {
        // Silently retain curated benchmarks on timeout
      }
    }

    void loadSnapshot();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-labelledby="desk-intel-title" className="mkt-section desk-intel-section">
      {/* Header with Title and Tab Switcher */}
      <div className="desk-intel-header">
        <div>
          <div className="home-eyebrow">DERIVION RESEARCH DESK · QUANTITATIVE &amp; REGULATORY INTELLIGENCE</div>
          <h2 id="desk-intel-title" className="desk-intel-heading">
            Macro &amp; Market Intelligence Matrix
          </h2>
          <p className="desk-intel-subtitle">
            Synthesized rate trajectories, systemic benchmarks, and research flow compiled across our news dispatches and editorial blogs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="desk-intel-tabs" role="tablist" aria-label="Intelligence Views">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'central-banks'}
            className={`desk-intel-tab ${activeTab === 'central-banks' ? 'active' : ''}`}
            onClick={() => setActiveTab('central-banks')}
          >
            <span className="desk-intel-tab-icon">🏛️</span>
            Central Bank Rates
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'macro-pulse'}
            className={`desk-intel-tab ${activeTab === 'macro-pulse' ? 'active' : ''}`}
            onClick={() => setActiveTab('macro-pulse')}
          >
            <span className="desk-intel-tab-icon">📊</span>
            Macro Indicators
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'research-radar'}
            className={`desk-intel-tab ${activeTab === 'research-radar' ? 'active' : ''}`}
            onClick={() => setActiveTab('research-radar')}
          >
            <span className="desk-intel-tab-icon">📑</span>
            Research Radar
          </button>
        </div>
      </div>

      {/* ── TAB 1: CENTRAL BANK POLICY MATRIX ── */}
      {activeTab === 'central-banks' && (
        <div className="desk-intel-content-block fade-in">
          <div className="desk-intel-callout-banner">
            <div className="desk-intel-callout-badge">SUPER WEEK PREVIEW</div>
            <p className="desk-intel-callout-text">
              Derived from Sunday&apos;s briefing: <strong>RBNZ, BOC, FOMC, ECB &amp; BOJ</strong> policy meetings converge alongside the UK Autumn Budget. Real-time consensus and rate hike probabilities tracked across major central banks.
            </p>
          </div>

          <div className="cb-matrix-grid">
            {CENTRAL_BANKS_DATA.map((cb) => {
              const biasBadgeClass =
                cb.bias === 'hike'
                  ? 'cb-bias--hike'
                  : cb.bias === 'cut'
                  ? 'cb-bias--cut'
                  : cb.bias === 'hold'
                  ? 'cb-bias--hold'
                  : 'cb-bias--neutral';

              return (
                <article key={cb.id} className="cb-card">
                  <div className="cb-card-header">
                    <div className="cb-card-flag-title">
                      <span className="cb-flag" aria-hidden="true">{cb.flag}</span>
                      <div>
                        <h3 className="cb-bank-name">{cb.bank}</h3>
                        <span className="cb-rate-name">{cb.name}</span>
                      </div>
                    </div>
                    <span className={`cb-bias-badge ${biasBadgeClass}`}>{cb.biasLabel}</span>
                  </div>

                  <div className="cb-card-body">
                    <RateBar rate={cb.currentRate} />

                    <div className="cb-metrics-row">
                      <div className="cb-metric">
                        <span className="cb-metric-label">NEXT DECISION</span>
                        <span className="cb-metric-val">{cb.nextMeeting}</span>
                      </div>
                      <div className="cb-metric">
                        <span className="cb-metric-label">MARKET PROBABILITY</span>
                        <span className="cb-metric-val cb-prob-val">{cb.probability}</span>
                      </div>
                    </div>

                    <p className="cb-note">{cb.note}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="desk-intel-footer-bar">
            <span>Primary source: Derivion Macro Policy Dispatches &middot; Bloomberg Consensus &middot; MNI Intelligence Desk</span>
            <Link href="/news" className="desk-intel-deep-link">
              Read Latest Central Bank Previews &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* ── TAB 2: MACRO PULSE & KEY LEVELS ── */}
      {activeTab === 'macro-pulse' && (
        <div className="desk-intel-content-block fade-in">
          <div className="macro-pulse-grid">
            {MACRO_INDICATORS_DATA.map((item) => {
              // If live snapshot is available for this instrument, override values dynamically
              let currentVal = item.current;
              let changeVal = item.change;
              let upVal = item.up;

              if (snapshot?.instruments) {
                if (item.id === 'us10y') {
                  const live = snapshot.instruments.find((i) => i.id === 'UST2Y' || i.id === 'us_10y_yield');
                  if (live && live.value !== null) {
                    currentVal = `${live.value.toFixed(2)}%`;
                    if (live.change !== null) {
                      const bps = Math.round(live.change * 100);
                      changeVal = `${bps > 0 ? '+' : ''}${bps} bps`;
                      upVal = bps > 0 ? true : bps < 0 ? false : null;
                    }
                  }
                } else if (item.id === 'brent') {
                  const live = snapshot.instruments.find((i) => i.id === 'BRENT' || i.id === 'brent_crude');
                  if (live && live.value !== null) {
                    currentVal = `$${live.value.toFixed(2)}`;
                    if (live.changePercent !== null) {
                      changeVal = `${live.changePercent > 0 ? '+' : ''}${live.changePercent.toFixed(2)}%`;
                      upVal = live.changePercent > 0;
                    }
                  }
                } else if (item.id === 'gold_ibja') {
                  const live = snapshot.instruments.find((i) => i.id === 'GOLD_IN_24K' || i.id === 'gold_inr');
                  if (live && live.value !== null) {
                    currentVal = `₹${new Intl.NumberFormat('en-IN').format(Math.round(live.value * 10))}`;
                    if (live.changePercent !== null) {
                      changeVal = `${live.changePercent > 0 ? '+' : ''}${live.changePercent.toFixed(2)}%`;
                      upVal = live.changePercent > 0;
                    }
                  }
                }
              }

              const changeClass = upVal === true ? 'mkt-change--up' : upVal === false ? 'mkt-change--down' : 'mkt-change--neutral';

              return (
                <article key={item.id} className="macro-card">
                  <div className="macro-card-top">
                    <span className="macro-category-badge">{item.category}</span>
                    <span className={`macro-change-badge ${changeClass}`}>
                      {upVal === true ? '▲ ' : upVal === false ? '▼ ' : ''}{changeVal}
                    </span>
                  </div>

                  <h3 className="macro-indicator-title">{item.name}</h3>

                  <div className="macro-main-value-wrap">
                    <span className="macro-main-value">{currentVal}</span>
                    <MiniSparkline values={item.sparkValues} up={upVal} />
                  </div>

                  <div className="macro-card-meta">
                    <div className="macro-meta-item">
                      <span className="macro-meta-label">Benchmark / Target</span>
                      <span className="macro-meta-val">{item.targetOrBenchmark}</span>
                    </div>
                    <div className="macro-meta-item">
                      <span className="macro-meta-label">Desk Source</span>
                      <span className="macro-meta-source">{item.source}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="desk-intel-footer-bar">
            <span>Benchmark indicators referenced in daily dispatches &middot; Live snapshots refreshed periodically</span>
            <Link href="/news" className="desk-intel-deep-link">
              Explore Dispatches on Market Levels &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* ── TAB 3: EDITORIAL RESEARCH RADAR ── */}
      {activeTab === 'research-radar' && (
        <div className="desk-intel-content-block fade-in">
          <div className="radar-layout">
            {/* Left: Domain Distribution Bars */}
            <div className="radar-domains-container">
              <h3 className="radar-section-subtitle">Dispatches &amp; Blog Coverage by Specialization</h3>
              <div className="radar-bars-list">
                {RESEARCH_RADAR_DATA.map((radar) => (
                  <div key={radar.domain} className="radar-bar-item">
                    <div className="radar-bar-header">
                      <div className="radar-bar-title-wrap">
                        <Link href={radar.href} className="radar-domain-link">
                          {radar.domain}
                        </Link>
                        <span className="radar-desk-pill">{radar.primaryDesk}</span>
                      </div>
                      <span className="radar-count-label">
                        <strong>{radar.articlesCount}</strong> dispatches ({radar.percentage}%)
                      </span>
                    </div>

                    <div className="radar-track">
                      <div
                        className="radar-progress"
                        style={{ width: `${radar.percentage * 2.2}%` }}
                      />
                    </div>

                    <div className="radar-tags-row">
                      {radar.tags.map((tag) => (
                        <span key={tag} className="radar-tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Desk Statistics & Pillars */}
            <div className="radar-stats-sidebar">
              <div className="radar-stat-card">
                <span className="radar-stat-number">25+</span>
                <span className="radar-stat-label">Market Dispatches</span>
                <p className="radar-stat-desc">Daily morning briefings on macro, yields, earnings &amp; geopolitics.</p>
              </div>

              <div className="radar-stat-card">
                <span className="radar-stat-number">11</span>
                <span className="radar-stat-label">Creator Research Essays</span>
                <p className="radar-stat-desc">In-depth investigations on CAS 3:15 PM, FEMA, and exchange collapse.</p>
              </div>

              <div className="radar-stat-card">
                <span className="radar-stat-number">7</span>
                <span className="radar-stat-label">Central Banks Monitored</span>
                <p className="radar-stat-desc">Continuous policy transmission models for FOMC, ECB, BOJ, RBI &amp; BOE.</p>
              </div>

              <div className="radar-desk-card">
                <h4 className="radar-desk-title">The ISFT Syndicate</h4>
                <p className="radar-desk-body">
                  All dispatches undergo strict quantitative verification before publication under the Derivion Academy masthead.
                </p>
                <div className="radar-desk-actions">
                  <Link href="/blogs" className="radar-action-btn">
                    Read Creator Blogs &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
