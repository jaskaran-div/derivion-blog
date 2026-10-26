'use client';

import { useEffect, useState } from 'react';
import type { MarketSnapshot } from '@/lib/marketSnapshot';
import { formatDataDate } from '@/lib/marketSnapshot';

// ── Types & Helpers ──────────────────────────────────────────────────────────

export type ProductFilterCategory = 'macro' | 'indian-markets' | 'central-banks' | 'commodities' | 'currencies';

interface InstrumentCardData {
  id: string;
  name: string;
  badge: string;
  displayValue: string;
  currentNumber: number;
  prevNumber: number | null;
  changeLabel: string;
  deltaLabel?: string;
  up: boolean | null;
  date: string;
  sourceName: string;
  sourceUrl?: string;
  isStale?: boolean;
  unitPrefix?: string;
  unitSuffix?: string;
}

function finite(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

function formatChartNumber(num: number, prefix = '', suffix = ''): string {
  if (num >= 1000) {
    return `${prefix}${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num)}${suffix}`;
  }
  if (Number.isInteger(num)) {
    return `${prefix}${num}${suffix}`;
  }
  return `${prefix}${num.toFixed(2)}${suffix}`;
}

// ── Detailed SVG Bar Chart ───────────────────────────────────────────────────

interface DetailedBarChartProps {
  value: number;
  prevClose: number | null;
  up: boolean | null;
  prefix?: string;
  suffix?: string;
  deltaLabel?: string;
}

function DetailedBarChart({ value, prevClose, up, prefix = '', suffix = '', deltaLabel }: DetailedBarChartProps) {
  const W = 200;
  const H = 68;
  const bottomPad = 16;
  const topPad = 16;
  const usableH = H - bottomPad - topPad;

  const prev = prevClose !== null ? prevClose : value;
  const hi = Math.max(value, prev);
  const lo = Math.min(value, prev);
  const range = hi - lo || Math.abs(hi) * 0.05 || 1;
  const padFrac = 0.2;
  const totalRange = range * (1 + 2 * padFrac);
  const baseVal = lo - range * padFrac;

  function calcBarH(v: number): number {
    return Math.max(6, Math.min(usableH, ((v - baseVal) / totalRange) * usableH));
  }

  const curH = calcBarH(value);
  const prevH = calcBarH(prev);

  const upColor = '#16a34a';
  const downColor = '#dc2626';
  const neutralColor = '#2563eb';
  const prevBarColor = '#cbd5e1';
  const prevTextColor = '#64748b';

  const curFillColor = up === true ? upColor : up === false ? downColor : neutralColor;
  const curTextColor = '#0f172a';

  // Positions
  const prevX = 26;
  const curX = 126;
  const barW = 48;
  const prevCenter = prevX + barW / 2;
  const curCenter = curX + barW / 2;

  const prevY = H - bottomPad - prevH;
  const curY = H - bottomPad - curH;

  const formattedPrev = formatChartNumber(prev, prefix, suffix);
  const formattedCur = formatChartNumber(value, prefix, suffix);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} aria-hidden="true" className="mkt-bar-svg">
      {/* Baseline */}
      <line
        x1={14}
        y1={H - bottomPad + 1}
        x2={W - 14}
        y2={H - bottomPad + 1}
        stroke="#e2e8f0"
        strokeWidth="1"
      />

      {/* Dotted guideline connecting previous close across to current bar */}
      <line
        x1={prevCenter}
        y1={prevY}
        x2={curCenter}
        y2={prevY}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.75"
      />

      {/* Optional delta tag in the center gap */}
      {deltaLabel && (
        <g>
          <rect
            x={W / 2 - 24}
            y={Math.min(prevY, curY) - 10}
            width={48}
            height={13}
            rx={3}
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="0.8"
          />
          <text
            x={W / 2}
            y={Math.min(prevY, curY) - 1}
            fill={curFillColor}
            fontSize="8"
            fontWeight="800"
            textAnchor="middle"
          >
            {deltaLabel}
          </text>
        </g>
      )}

      {/* ── Left Bar: Previous / Reference ── */}
      <text
        x={prevCenter}
        y={Math.max(11, prevY - 4)}
        fill={prevTextColor}
        fontSize="9.5"
        fontWeight="700"
        textAnchor="middle"
      >
        {formattedPrev}
      </text>
      <rect
        x={prevX}
        y={prevY}
        width={barW}
        height={prevH}
        rx={4}
        fill={prevBarColor}
      />
      <text
        x={prevCenter}
        y={H - 4}
        fill="#94a3b8"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="0.04em"
        textAnchor="middle"
      >
        PREV
      </text>

      {/* ── Right Bar: Current / Latest ── */}
      <text
        x={curCenter}
        y={Math.max(11, curY - 4)}
        fill={curTextColor}
        fontSize="10.5"
        fontWeight="800"
        textAnchor="middle"
      >
        {formattedCur}
      </text>
      <rect
        x={curX}
        y={curY}
        width={barW}
        height={curH}
        rx={4}
        fill={curFillColor}
      />
      <text
        x={curCenter}
        y={H - 4}
        fill="#334155"
        fontSize="8.5"
        fontWeight="800"
        letterSpacing="0.04em"
        textAnchor="middle"
      >
        CURRENT
      </text>
    </svg>
  );
}

// ── Instrument Card ──────────────────────────────────────────────────────────

function InstrumentCard({ item }: { item: InstrumentCardData }) {
  const changeClass =
    item.up === true ? 'mkt-change--up' : item.up === false ? 'mkt-change--down' : 'mkt-change--neutral';

  return (
    <article className="mkt-card" aria-label={item.name}>
      <header className="mkt-card-header">
        <span className="mkt-badge">{item.badge}</span>
        <div className="mkt-card-title-wrap">
          <span className="mkt-card-name">{item.name}</span>
          {item.isStale && <span className="mkt-stale-pill">STALE</span>}
        </div>
      </header>

      <div className="mkt-card-body">
        <div className="mkt-value-row">
          <span className="mkt-value">{item.displayValue}</span>
          <span className={`mkt-change ${changeClass}`}>
            {item.up === true ? '▲ ' : item.up === false ? '▼ ' : ''}
            {item.changeLabel}
          </span>
        </div>

        <div className="mkt-chart-wrap" aria-hidden="true">
          <DetailedBarChart
            value={item.currentNumber}
            prevClose={item.prevNumber}
            up={item.up}
            prefix={item.unitPrefix}
            suffix={item.unitSuffix}
            deltaLabel={item.deltaLabel}
          />
        </div>
      </div>

      <footer className="mkt-card-footer">
        <span className="mkt-date">{item.date}</span>
        <span className="mkt-source">
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mkt-source-link">
              {item.sourceName}
            </a>
          ) : (
            item.sourceName
          )}
        </span>
      </footer>
    </article>
  );
}

// ── Skeleton Loader ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="mkt-card mkt-card--skeleton" aria-hidden="true">
      <div className="mkt-skel mkt-skel--badge" />
      <div className="mkt-skel mkt-skel--title" />
      <div className="mkt-skel mkt-skel--value" />
      <div className="mkt-skel mkt-skel--chart" style={{ height: '68px' }} />
    </div>
  );
}

// ── Data Categories (Covering News, Articles & Blog Topics) ──────────────────

const PRODUCT_DATA_SETS: Record<ProductFilterCategory, InstrumentCardData[]> = {
  macro: [
    {
      id: 'fomc_rate',
      name: 'Fed Funds Upper Rate',
      badge: '%',
      displayValue: '4.00%',
      currentNumber: 4.00,
      prevNumber: 4.00,
      changeLabel: '90% Hold Implied',
      deltaLabel: 'Flat',
      up: null,
      unitSuffix: '%',
      date: 'Super Week Decision (Oct 28)',
      sourceName: 'Federal Reserve / Desk Wire',
    },
    {
      id: 'us_10y',
      name: 'US 10Y Benchmark Yield',
      badge: '%',
      displayValue: '4.98%',
      currentNumber: 4.98,
      prevNumber: 5.10,
      changeLabel: '-12 bps',
      deltaLabel: '-0.12%',
      up: false,
      unitSuffix: '%',
      date: 'Sub-5% Level (Yields easing)',
      sourceName: 'US Treasury / Macro Desk',
    },
    {
      id: 'brent_crude',
      name: 'Brent Crude Oil',
      badge: '$',
      displayValue: '$113.40',
      currentNumber: 113.40,
      prevNumber: 110.80,
      changeLabel: '+2.35%',
      deltaLabel: '+$2.60',
      up: true,
      unitPrefix: '$',
      date: '5-Month Peak (Hormuz Risk)',
      sourceName: 'EIA / Global Macro Bureau',
    },
    {
      id: 'us_gdp_now',
      name: 'US Q3 GDPNow (SAAR)',
      badge: '%',
      displayValue: '3.50%',
      currentNumber: 3.50,
      prevNumber: 2.20,
      changeLabel: '+130 bps',
      deltaLabel: '+1.30%',
      up: true,
      unitSuffix: '%',
      date: 'Advance Estimate vs 3.0% Cons.',
      sourceName: 'Federal Reserve Bank of Atlanta',
    },
  ],

  'indian-markets': [
    {
      id: 'nifty_50',
      name: 'Nifty 50 Index',
      badge: '📈',
      displayValue: '24,850.00',
      currentNumber: 24850,
      prevNumber: 24680,
      changeLabel: '+0.69%',
      deltaLabel: '+170 pts',
      up: true,
      date: 'Dalal Street Cash Session',
      sourceName: 'NSE India / ISFT Desk',
    },
    {
      id: 'bank_nifty',
      name: 'Bank Nifty Index',
      badge: '🏛️',
      displayValue: '51,280.00',
      currentNumber: 51280,
      prevNumber: 50920,
      changeLabel: '+0.71%',
      deltaLabel: '+360 pts',
      up: true,
      date: 'Banking Syndicate Flow',
      sourceName: 'NSE India / ISFT Desk',
    },
    {
      id: 'india_vix',
      name: 'India VIX Volatility',
      badge: '📊',
      displayValue: '14.80',
      currentNumber: 14.80,
      prevNumber: 15.45,
      changeLabel: '-4.20%',
      deltaLabel: '-0.65 pts',
      up: false,
      date: 'CAS 3:15 PM Benchmark',
      sourceName: 'NSE India / F&O Desk',
    },
    {
      id: 'gift_nifty',
      name: 'GIFT Nifty Spread',
      badge: '⚡',
      displayValue: '+18.5 pts',
      currentNumber: 18.5,
      prevNumber: 5.0,
      changeLabel: '+13.5 pts',
      deltaLabel: '+13.5 pts',
      up: true,
      unitSuffix: ' pts',
      date: 'GIFT City IFSC Session',
      sourceName: 'NSE International Exchange',
    },
  ],

  'central-banks': [
    {
      id: 'fed_fomc',
      name: 'Fed Funds Target',
      badge: '🇺🇸',
      displayValue: '4.00%',
      currentNumber: 4.00,
      prevNumber: 3.75,
      changeLabel: 'Hold Expected',
      deltaLabel: '+25 bps',
      up: true,
      unitSuffix: '%',
      date: 'Next: Oct 28 (90% implied)',
      sourceName: 'Federal Reserve (US)',
    },
    {
      id: 'rbi_repo',
      name: 'RBI Policy Repo Rate',
      badge: '🇮🇳',
      displayValue: '6.50%',
      currentNumber: 6.50,
      prevNumber: 6.50,
      changeLabel: 'Neutral Stance',
      deltaLabel: 'Steady',
      up: null,
      unitSuffix: '%',
      date: 'MPC Liquidity Framework',
      sourceName: 'Reserve Bank of India',
    },
    {
      id: 'boe_rate',
      name: 'BOE Official Bank Rate',
      badge: '🇬🇧',
      displayValue: '4.75%',
      currentNumber: 4.75,
      prevNumber: 4.75,
      changeLabel: 'Hold Expected',
      deltaLabel: 'DMP 3.5%',
      up: null,
      unitSuffix: '%',
      date: 'Next: Nov 05 (Post-Budget)',
      sourceName: 'Bank of England',
    },
    {
      id: 'ecb_refi',
      name: 'ECB Refinancing Rate',
      badge: '🇪🇺',
      displayValue: '2.50%',
      currentNumber: 2.50,
      prevNumber: 2.50,
      changeLabel: 'Hold Expected',
      deltaLabel: 'OAT Watch',
      up: null,
      unitSuffix: '%',
      date: 'Next: Oct 29 (Growth risk)',
      sourceName: 'European Central Bank',
    },
  ],

  commodities: [
    {
      id: 'brent_feed',
      name: 'Brent Crude Oil',
      badge: '$',
      displayValue: '$113.40',
      currentNumber: 113.40,
      prevNumber: 110.80,
      changeLabel: '+2.35%',
      deltaLabel: '+$2.60',
      up: true,
      unitPrefix: '$',
      date: 'Global Benchmark (EIA)',
      sourceName: 'EIA / Intercontinental Exchange',
    },
    {
      id: 'wti_feed',
      name: 'WTI Crude Oil',
      badge: '$',
      displayValue: '$88.60',
      currentNumber: 88.60,
      prevNumber: 86.90,
      changeLabel: '+1.96%',
      deltaLabel: '+$1.70',
      up: true,
      unitPrefix: '$',
      date: 'Cushing Delivery Benchmark',
      sourceName: 'EIA / NYMEX',
    },
    {
      id: 'gold_feed',
      name: 'Gold 24K (IBJA)',
      badge: '₹',
      displayValue: '₹7,845/g',
      currentNumber: 7845,
      prevNumber: 7780,
      changeLabel: '+0.84%',
      deltaLabel: '+₹65/g',
      up: true,
      unitPrefix: '₹',
      date: 'IBJA Domestic Benchmark',
      sourceName: 'IBJA India Benchmarks',
    },
    {
      id: 'nat_gas',
      name: 'Natural Gas (Henry Hub)',
      badge: '$',
      displayValue: '$2.85',
      currentNumber: 2.85,
      prevNumber: 2.74,
      changeLabel: '+4.01%',
      deltaLabel: '+$0.11',
      up: true,
      unitPrefix: '$',
      date: 'Winter Heating Premium',
      sourceName: 'NYMEX / Commodities Desk',
    },
  ],

  currencies: [
    {
      id: 'usd_inr',
      name: 'USD / INR Spot',
      badge: '₹',
      displayValue: '₹84.08',
      currentNumber: 84.08,
      prevNumber: 83.98,
      changeLabel: '+0.12%',
      deltaLabel: '+₹0.10',
      up: true,
      unitPrefix: '₹',
      date: 'RBI Reference Rate Band',
      sourceName: 'Foreign Exchange Bureau',
    },
    {
      id: 'eur_usd',
      name: 'EUR / USD',
      badge: '€',
      displayValue: '1.0820',
      currentNumber: 1.0820,
      prevNumber: 1.0865,
      changeLabel: '-0.41%',
      deltaLabel: '-45 pips',
      up: false,
      date: 'ECB Decision Watch',
      sourceName: 'Interbank Forex Wire',
    },
    {
      id: 'dxy_index',
      name: 'US Dollar Index (DXY)',
      badge: '$',
      displayValue: '104.25',
      currentNumber: 104.25,
      prevNumber: 103.80,
      changeLabel: '+0.43%',
      deltaLabel: '+0.45 pts',
      up: true,
      date: 'Treasury Yield Support',
      sourceName: 'ICE / FX Intelligence',
    },
    {
      id: 'gbp_usd',
      name: 'GBP / USD',
      badge: '£',
      displayValue: '1.2980',
      currentNumber: 1.2980,
      prevNumber: 1.3020,
      changeLabel: '-0.31%',
      deltaLabel: '-40 pips',
      up: false,
      date: 'Autumn Budget Reaction',
      sourceName: 'Bank of England Fix',
    },
  ],
};

const FILTER_BUTTONS: Array<{ key: ProductFilterCategory; label: string }> = [
  { key: 'macro', label: 'Desk Macro' },
  { key: 'indian-markets', label: 'Indian F&O & Equities' },
  { key: 'central-banks', label: 'Central Banks' },
  { key: 'commodities', label: 'Commodities' },
  { key: 'currencies', label: 'Forex & Currencies' },
];

// ── Main Section ─────────────────────────────────────────────────────────────

export default function MarketChartsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductFilterCategory>('macro');
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
    if (!apiUrl) return;

    let cancelled = false;
    async function load() {
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
        // Retain curated sets
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Merge live snapshot into active set when relevant (e.g. Brent, Gold in commodities tab)
  const currentCards = PRODUCT_DATA_SETS[activeCategory].map((card) => {
    if (!snapshot?.instruments) return card;

    if (card.id === 'brent_feed' || card.id === 'brent_crude') {
      const live = snapshot.instruments.find((i) => i.id === 'BRENT' || i.id === 'brent_crude');
      if (live && live.value !== null) {
        return {
          ...card,
          displayValue: `$${live.value.toFixed(2)}`,
          currentNumber: live.value,
          prevNumber: live.previousClose ?? card.prevNumber,
          changeLabel: live.changePercent !== null ? `${live.changePercent > 0 ? '+' : ''}${live.changePercent.toFixed(2)}%` : card.changeLabel,
          up: live.changePercent !== null ? live.changePercent > 0 : card.up,
          date: formatDataDate(live.filledFrom ?? live.dataDate) || card.date,
          sourceName: live.source?.name || card.sourceName,
          sourceUrl: live.source?.url || undefined,
        };
      }
    } else if (card.id === 'gold_feed') {
      const live = snapshot.instruments.find((i) => i.id === 'GOLD_IN_24K' || i.id === 'gold_inr');
      if (live && live.value !== null) {
        return {
          ...card,
          displayValue: `₹${new Intl.NumberFormat('en-IN').format(Math.round(live.value))}/g`,
          currentNumber: Math.round(live.value),
          prevNumber: live.previousClose ? Math.round(live.previousClose) : card.prevNumber,
          changeLabel: live.changePercent !== null ? `${live.changePercent > 0 ? '+' : ''}${live.changePercent.toFixed(2)}%` : card.changeLabel,
          up: live.changePercent !== null ? live.changePercent > 0 : card.up,
          date: formatDataDate(live.filledFrom ?? live.dataDate) || card.date,
          sourceName: live.source?.name || card.sourceName,
          sourceUrl: live.source?.url || undefined,
        };
      }
    } else if (card.id === 'wti_feed') {
      const live = snapshot.instruments.find((i) => i.id === 'WTI' || i.id === 'wti_crude');
      if (live && live.value !== null) {
        return {
          ...card,
          displayValue: `$${live.value.toFixed(2)}`,
          currentNumber: live.value,
          prevNumber: live.previousClose ?? card.prevNumber,
          changeLabel: live.changePercent !== null ? `${live.changePercent > 0 ? '+' : ''}${live.changePercent.toFixed(2)}%` : card.changeLabel,
          up: live.changePercent !== null ? live.changePercent > 0 : card.up,
          date: formatDataDate(live.filledFrom ?? live.dataDate) || card.date,
          sourceName: live.source?.name || card.sourceName,
          sourceUrl: live.source?.url || undefined,
        };
      }
    }
    return card;
  });

  return (
    <section aria-labelledby="mkt-section-title" className="mkt-section">
      <div className="home-section-heading home-dispatches-heading">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <p className="home-eyebrow">DERIVION ACADEMY DESK WIRE &middot; MULTI-ASSET BENCHMARKS</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <h2 id="mkt-section-title" style={{ margin: 0 }}>Market data</h2>
            <div className="mkt-filter-pills" role="group" aria-label="Filter market asset classes">
              {FILTER_BUTTONS.map((btn) => (
                <button
                  key={btn.key}
                  type="button"
                  className={`mkt-filter-pill ${activeCategory === btn.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(btn.key)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {snapshot?.snapshotUpdatedAt && (
          <span className="mkt-updated-at">
            Updated{' '}
            {new Intl.DateTimeFormat('en-IN', {
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'Asia/Kolkata',
            }).format(new Date(snapshot.snapshotUpdatedAt))}{' '}
            IST
          </span>
        )}
      </div>

      <div className="mkt-grid">
        {loading
          ? [0, 1, 2, 3].map((k) => <SkeletonCard key={k} />)
          : currentCards.map((item) => <InstrumentCard key={item.id} item={item} />)}
      </div>

      <p className="mkt-disclaimer">
        End-of-day and benchmark values from Derivion morning dispatches, quantitative research models &amp; SnapData feeds. Not financial advice.
      </p>
    </section>
  );
}
