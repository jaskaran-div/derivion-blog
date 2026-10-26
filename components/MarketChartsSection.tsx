'use client';

import { useEffect, useState } from 'react';
import type { MarketSnapshot } from '@/lib/marketSnapshot';
import { formatDataDate } from '@/lib/marketSnapshot';

// ── Types & Helpers ──────────────────────────────────────────────────────────

interface InstrumentCardData {
  id: string;
  name: string;
  badge: string;
  displayValue: string;
  currentNumber: number;
  prevNumber: number | null;
  changeLabel: string;
  up: boolean | null;
  date: string;
  sourceName: string;
  sourceUrl?: string;
  isStale?: boolean;
}

function finite(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

// ── SVG Bar Chart (from minimal design) ──────────────────────────────────────

interface BarChartProps {
  value: number;
  prevClose: number | null;
  up: boolean | null;
}

function BarChart({ value, prevClose, up }: BarChartProps) {
  const W = 120;
  const H = 50;
  const gap = 6;
  const barW = (W - gap) / 2;

  const hi = prevClose !== null ? Math.max(value, prevClose) : value;
  const lo = prevClose !== null ? Math.min(value, prevClose) : value * 0.97;
  const range = hi - lo || Math.abs(hi) * 0.05 || 1;
  const padFrac = 0.15;
  const total = range * (1 + 2 * padFrac);
  const base = lo - range * padFrac;

  function barH(v: number) {
    return Math.max(5, ((v - base) / total) * H);
  }

  const upColor = '#16a34a';
  const downColor = '#dc2626';
  const neutralColor = '#2563eb';
  const prevColor = '#cbd5e1';

  const currentH = barH(value);
  const prevH = prevClose !== null ? barH(prevClose) : 0;
  const fillColor = up === true ? upColor : up === false ? downColor : neutralColor;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true" className="mkt-bar-svg">
      {prevClose !== null && (
        <rect x={0} y={H - prevH} width={barW} height={prevH} rx={3} fill={prevColor} />
      )}
      <rect
        x={prevClose !== null ? barW + gap : (W - barW) / 2}
        y={H - currentH}
        width={barW}
        height={currentH}
        rx={3}
        fill={fillColor}
      />
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
          <BarChart value={item.currentNumber} prevClose={item.prevNumber} up={item.up} />
          {item.prevNumber !== null && (
            <div className="mkt-chart-legend">
              <span className="mkt-legend-prev">Prev ref</span>
              <span className="mkt-legend-cur">Current</span>
            </div>
          )}
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
      <div className="mkt-skel mkt-skel--chart" />
    </div>
  );
}

// ── Data Sets: Curated from Derivion News & Blog Archives ────────────────────

const DESK_FOCUS_INSTRUMENTS: InstrumentCardData[] = [
  {
    id: 'fomc_rate',
    name: 'Fed Funds Rate (FOMC)',
    badge: '%',
    displayValue: '4.00%',
    currentNumber: 4.00,
    prevNumber: 4.00,
    changeLabel: '90% Hold Implied',
    up: null,
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
    up: false,
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
    up: true,
    date: '5-Month Peak (Hormuz Risk)',
    sourceName: 'EIA / Global Macro Bureau',
  },
  {
    id: 'india_vix',
    name: 'India VIX Volatility',
    badge: '📈',
    displayValue: '14.80',
    currentNumber: 14.80,
    prevNumber: 15.45,
    changeLabel: '-4.20%',
    up: false,
    date: 'Rangebound (CAS 3:15 Desk)',
    sourceName: 'NSE India / ISFT F&O Desk',
  },
];

// ── Main Minimal Section ─────────────────────────────────────────────────────

export default function MarketChartsSection() {
  const [activeSet, setActiveSet] = useState<'desk' | 'commodities'>('desk');
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
        // Retain curated desk levels
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Live snapshot commodities fallback / live set
  const commodityInstruments: InstrumentCardData[] = snapshot?.instruments?.length
    ? snapshot.instruments.map((inst) => {
        const val = finite(inst.value);
        const prev = val !== null ? finite(inst.previousClose) : null;
        let changeLabel = 'n/a';
        let up: boolean | null = null;

        if (inst.unit === 'percent') {
          const bps = inst.change !== null ? Math.round(inst.change * 100) : 0;
          changeLabel = `${bps > 0 ? '+' : ''}${bps} bps`;
          up = bps > 0 ? true : bps < 0 ? false : null;
        } else if (inst.changePercent !== null) {
          changeLabel = `${inst.changePercent > 0 ? '+' : ''}${inst.changePercent.toFixed(2)}%`;
          up = inst.changePercent > 0 ? true : inst.changePercent < 0 ? false : null;
        }

        let displayValue = '—';
        if (val !== null) {
          if (inst.unit === 'percent') displayValue = `${val.toFixed(2)}%`;
          else if (inst.currency === 'INR') displayValue = `₹${new Intl.NumberFormat('en-IN').format(val)}`;
          else if (inst.currency === 'USD') displayValue = `$${val.toFixed(2)}`;
          else displayValue = val.toFixed(2);
        }

        return {
          id: inst.id,
          name: inst.name,
          badge: inst.unit === 'percent' ? '%' : inst.currency === 'INR' ? '₹' : '$',
          displayValue,
          currentNumber: val ?? 0,
          prevNumber: prev,
          changeLabel,
          up,
          date: formatDataDate(inst.filledFrom ?? inst.dataDate) || 'Benchmark feed',
          sourceName: inst.source?.name || 'SnapData Feed',
          sourceUrl: inst.source?.url || undefined,
          isStale: inst.status === 'stale',
        };
      })
    : [
        {
          id: 'UST2Y',
          name: '2Y Treasury Yield',
          badge: '%',
          displayValue: '4.15%',
          currentNumber: 4.15,
          prevNumber: 4.22,
          changeLabel: '-7 bps',
          up: false,
          date: 'US Benchmark Feed',
          sourceName: 'US Treasury',
        },
        {
          id: 'BRENT',
          name: 'Brent Crude',
          badge: '$',
          displayValue: '$113.40',
          currentNumber: 113.40,
          prevNumber: 110.80,
          changeLabel: '+2.35%',
          up: true,
          date: 'Daily Benchmark',
          sourceName: 'EIA',
        },
        {
          id: 'WTI',
          name: 'WTI Crude',
          badge: '$',
          displayValue: '$88.60',
          currentNumber: 88.60,
          prevNumber: 86.90,
          changeLabel: '+1.96%',
          up: true,
          date: 'Daily Benchmark',
          sourceName: 'EIA',
        },
        {
          id: 'GOLD_IN_24K',
          name: 'Gold 24K (IBJA)',
          badge: '₹',
          displayValue: '₹7,845/g',
          currentNumber: 7845,
          prevNumber: 7780,
          changeLabel: '+0.84%',
          up: true,
          date: 'IBJA India Benchmark',
          sourceName: 'IBJA',
        },
      ];

  const currentCards = activeSet === 'desk' ? DESK_FOCUS_INSTRUMENTS : commodityInstruments;

  return (
    <section aria-labelledby="mkt-section-title" className="mkt-section">
      <div className="home-section-heading home-dispatches-heading">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <p className="home-eyebrow">DERIVION DESK WIRE &middot; KEY BENCHMARKS</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <h2 id="mkt-section-title" style={{ margin: 0 }}>Market data</h2>
            <div className="mkt-filter-pills" role="group" aria-label="Filter benchmark data">
              <button
                type="button"
                className={`mkt-filter-pill ${activeSet === 'desk' ? 'active' : ''}`}
                onClick={() => setActiveSet('desk')}
              >
                Desk Focus (News &amp; F&amp;O)
              </button>
              <button
                type="button"
                className={`mkt-filter-pill ${activeSet === 'commodities' ? 'active' : ''}`}
                onClick={() => setActiveSet('commodities')}
              >
                Commodities &amp; FX
              </button>
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
          : currentCards.slice(0, 4).map((item) => <InstrumentCard key={item.id} item={item} />)}
      </div>

      <p className="mkt-disclaimer">
        End-of-day / benchmark values referenced in Derivion morning briefings &amp; blog investigations. Not financial advice.
      </p>
    </section>
  );
}
