'use client';

import { useState } from 'react';
import type { MarketLevel, MarketSnapshot } from '@/lib/marketSnapshot';
import { formatSnapshotTime, toMarketLevels } from '@/lib/marketSnapshot';

// Every figure on this section comes from the backend's stored snapshot (fetched on the server).
// Instruments without a verified, redistributable source are deliberately not shown.

type MarketCategory = 'rates' | 'commodities' | 'currencies';

const CATEGORIES: Array<{ key: MarketCategory; label: string; ids: string[] }> = [
  { key: 'rates', label: 'US Treasury Yields', ids: ['UST2Y', 'UST10Y'] },
  { key: 'commodities', label: 'Crude Oil', ids: ['BRENT', 'WTI'] },
  { key: 'currencies', label: 'Forex & Currencies', ids: ['USDINR', 'EURUSD', 'GBPUSD', 'USDJPY'] },
];

const BADGES: Record<string, string> = {
  UST2Y: '%',
  UST10Y: '%',
  BRENT: '$',
  WTI: '$',
  USDINR: '₹',
  EURUSD: '€',
  GBPUSD: '£',
  USDJPY: '¥',
};

// ── Previous vs current bar chart ────────────────────────────────────────────

interface DetailedBarChartProps {
  value: number;
  prevClose: number;
  up: boolean | null;
  valueLabel: string;
  prevLabel: string;
}

function DetailedBarChart({ value, prevClose, up, valueLabel, prevLabel }: DetailedBarChartProps) {
  const W = 200;
  const H = 68;
  const bottomPad = 16;
  const topPad = 16;
  const usableH = H - bottomPad - topPad;

  const hi = Math.max(value, prevClose);
  const lo = Math.min(value, prevClose);
  const range = hi - lo || Math.abs(hi) * 0.05 || 1;
  const padFrac = 0.2;
  const totalRange = range * (1 + 2 * padFrac);
  const baseVal = lo - range * padFrac;

  function calcBarH(v: number): number {
    return Math.max(6, Math.min(usableH, ((v - baseVal) / totalRange) * usableH));
  }

  const curH = calcBarH(value);
  const prevH = calcBarH(prevClose);

  const curFillColor = up === true ? '#16a34a' : up === false ? '#dc2626' : '#2563eb';

  const prevX = 26;
  const curX = 126;
  const barW = 48;
  const prevCenter = prevX + barW / 2;
  const curCenter = curX + barW / 2;
  const prevY = H - bottomPad - prevH;
  const curY = H - bottomPad - curH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} aria-hidden="true" className="mkt-bar-svg">
      <line x1={14} y1={H - bottomPad + 1} x2={W - 14} y2={H - bottomPad + 1} stroke="#e2e8f0" strokeWidth="1" />
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

      <text x={prevCenter} y={Math.max(11, prevY - 4)} fill="#64748b" fontSize="9.5" fontWeight="700" textAnchor="middle">
        {prevLabel}
      </text>
      <rect x={prevX} y={prevY} width={barW} height={prevH} rx={4} fill="#cbd5e1" />
      <text x={prevCenter} y={H - 4} fill="#94a3b8" fontSize="8.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
        PREV
      </text>

      <text x={curCenter} y={Math.max(11, curY - 4)} fill="#0f172a" fontSize="10.5" fontWeight="800" textAnchor="middle">
        {valueLabel}
      </text>
      <rect x={curX} y={curY} width={barW} height={curH} rx={4} fill={curFillColor} />
      <text x={curCenter} y={H - 4} fill="#334155" fontSize="8.5" fontWeight="800" letterSpacing="0.04em" textAnchor="middle">
        LATEST
      </text>
    </svg>
  );
}

// ── Instrument Card ──────────────────────────────────────────────────────────

function InstrumentCard({ item }: { item: MarketLevel }) {
  const available = item.numericValue !== null;
  const changeClass =
    item.up === true ? 'mkt-change--up' : item.up === false ? 'mkt-change--down' : 'mkt-change--neutral';
  const shortChange = item.change.replace(' vs previous close', '');

  return (
    <article className="mkt-card" aria-label={item.label}>
      <header className="mkt-card-header">
        <span className="mkt-badge">{BADGES[item.id] ?? '•'}</span>
        <div className="mkt-card-title-wrap">
          <span className="mkt-card-name">{item.label}</span>
          {item.stale && <span className="mkt-stale-pill">STALE</span>}
        </div>
      </header>

      <div className="mkt-card-body">
        <div className="mkt-value-row">
          <span className="mkt-value">{item.value}</span>
          {available && (
            <span className={`mkt-change ${changeClass}`}>
              {item.up === true ? '▲ ' : item.up === false ? '▼ ' : ''}
              {shortChange}
            </span>
          )}
        </div>

        <div className="mkt-chart-wrap" aria-hidden="true">
          {available && item.numericPrevious !== null && item.previousValue !== null ? (
            <DetailedBarChart
              value={item.numericValue!}
              prevClose={item.numericPrevious}
              up={item.up}
              valueLabel={item.value}
              prevLabel={item.previousValue}
            />
          ) : (
            <div className="mkt-chart-placeholder" />
          )}
        </div>
      </div>

      <footer className="mkt-card-footer">
        {item.dataDate ? (
          <span className="mkt-date">
            Data date: {item.dataDate}
            {item.sourceStatus === 'provisional' ? ' · provisional' : ''}
          </span>
        ) : (
          <span className="mkt-date mkt-date--unavail">Awaiting data</span>
        )}
        {item.sourceName && (
          <span className="mkt-source">
            {item.sourceUrl ? (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mkt-source-link">
                {item.sourceName}
              </a>
            ) : (
              item.sourceName
            )}
          </span>
        )}
      </footer>
    </article>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────

export default function MarketChartsSection({ snapshot }: { snapshot: MarketSnapshot | null }) {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('currencies');
  const category = CATEGORIES.find((candidate) => candidate.key === activeCategory) ?? CATEGORIES[0];
  const cards = toMarketLevels(snapshot, category.ids);
  const updatedAt = formatSnapshotTime(snapshot?.snapshotUpdatedAt ?? null);
  const status = snapshot?.status ?? 'unavailable';

  return (
    <section aria-labelledby="mkt-section-title" className="mkt-section">
      <div className="home-section-heading home-dispatches-heading">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <p className="home-eyebrow">DERIVION ACADEMY DESK WIRE &middot; DAILY REFERENCE RATES</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <h2 id="mkt-section-title" style={{ margin: 0 }}>Market data</h2>
            <div className="mkt-filter-pills" role="group" aria-label="Filter market asset classes">
              {CATEGORIES.map((btn) => (
                <button
                  key={btn.key}
                  type="button"
                  className={`mkt-filter-pill ${activeCategory === btn.key ? 'active' : ''}`}
                  aria-pressed={activeCategory === btn.key}
                  onClick={() => setActiveCategory(btn.key)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {updatedAt && <span className="mkt-updated-at">Snapshot updated {updatedAt}</span>}
      </div>

      {status === 'unavailable' && (
        <p className="mkt-error-note">Market data is currently unavailable. No figures are shown until the next successful update.</p>
      )}
      {status === 'stale' && (
        <p className="mkt-error-note">Stale: the scheduled update has not succeeded recently. Values below are from the last successful snapshot.</p>
      )}

      <div className="mkt-grid">
        {cards.map((item) => <InstrumentCard key={item.id} item={item} />)}
      </div>

      <p className="mkt-disclaimer">
        Daily reference values, not live quotes: US Treasury par yields, EIA physical spot crude (published several
        days late, so it can differ from Brent/WTI futures), and ECB euro reference rates cross-rated to USD pairs.
        Collected via SnapData. Not financial advice.
      </p>
    </section>
  );
}
