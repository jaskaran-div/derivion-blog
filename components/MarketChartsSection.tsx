'use client';

import { useEffect, useState } from 'react';
import type { MarketSnapshot, MarketInstrument } from '@/lib/marketSnapshot';
import { formatDataDate } from '@/lib/marketSnapshot';

// ── helpers ──────────────────────────────────────────────────────────────────

function finite(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

function formatValue(item: MarketInstrument, value: number): string {
  if (item.unit === 'percent') return `${value.toFixed(2)}%`;
  if (item.currency === 'INR') {
    const amount = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
    return `\u20B9${amount}${item.unit === 'gram' ? '/g' : ''}`;
  }
  if (item.currency === 'USD') return `${value < 0 ? '-' : ''}$${Math.abs(value).toFixed(2)}`;
  return value.toFixed(2);
}

function formatChange(item: MarketInstrument): { label: string; up: boolean | null } {
  const change = finite(item.change);
  if (change === null) return { label: 'n/a', up: null };
  if (item.unit === 'percent') {
    const bps = Math.round(change * 100);
    return { label: `${bps > 0 ? '+' : ''}${bps} bps`, up: bps > 0 ? true : bps < 0 ? false : null };
  }
  const pct = finite(item.changePercent);
  if (pct === null) return { label: 'n/a', up: null };
  return { label: `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`, up: pct > 0 ? true : pct < 0 ? false : null };
}

// ── SVG bar chart ─────────────────────────────────────────────────────────────

interface BarChartProps {
  value: number;
  prevClose: number | null;
  up: boolean | null;
}

function BarChart({ value, prevClose, up }: BarChartProps) {
  const W = 120;
  const H = 52;
  const gap = 6;
  const barW = (W - gap) / 2;

  const hi = prevClose !== null ? Math.max(value, prevClose) : value;
  const lo = prevClose !== null ? Math.min(value, prevClose) : value * 0.97;
  const range = hi - lo || Math.abs(hi) * 0.05 || 1;
  const padFrac = 0.14;
  const total = range * (1 + 2 * padFrac);
  const base = lo - range * padFrac;

  function barH(v: number) {
    return Math.max(4, ((v - base) / total) * H);
  }

  const upColor = '#16a34a';
  const downColor = '#dc2626';
  const neutralColor = '#2563eb';
  const prevColor = '#cbd5e1';

  const currentH = barH(value);
  const prevH = prevClose !== null ? barH(prevClose) : 0;
  const fillColor = up === true ? upColor : up === false ? downColor : neutralColor;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      aria-hidden="true"
      className="mkt-bar-svg"
    >
      {prevClose !== null && (
        <rect
          x={0}
          y={H - prevH}
          width={barW}
          height={prevH}
          rx={3}
          fill={prevColor}
        />
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

// ── Instrument card ───────────────────────────────────────────────────────────

interface CardProps {
  item: MarketInstrument;
}

function InstrumentCard({ item }: CardProps) {
  const value = item.status !== 'unavailable' ? finite(item.value) : null;
  const prev = value !== null ? finite(item.previousClose) : null;
  const { label: changeLabel, up } = value !== null ? formatChange(item) : { label: 'Awaiting data', up: null as null };
  const displayDate = formatDataDate(item.filledFrom ?? item.dataDate);
  const changeClass = up === true ? 'mkt-change--up' : up === false ? 'mkt-change--down' : 'mkt-change--neutral';
  const badge = item.unit === 'percent' ? '%' : item.currency === 'INR' ? '\u20B9' : '$';

  return (
    <article className="mkt-card" aria-label={item.name}>
      <header className="mkt-card-header">
        <span className="mkt-badge">{badge}</span>
        <div className="mkt-card-title-wrap">
          <span className="mkt-card-name">{item.name}</span>
          {item.status === 'stale' && <span className="mkt-stale-pill">STALE</span>}
        </div>
      </header>

      <div className="mkt-card-body">
        <div className="mkt-value-row">
          <span className="mkt-value">
            {value !== null ? formatValue(item, value) : '\u2014'}
          </span>
          <span className={`mkt-change ${changeClass}`}>
            {up === true ? '\u25B2' : up === false ? '\u25BC' : ''}{up !== null ? ' ' : ''}{changeLabel}
          </span>
        </div>

        <div className="mkt-chart-wrap" aria-hidden="true">
          {value !== null ? (
            <BarChart value={value} prevClose={prev} up={up} />
          ) : (
            <div className="mkt-chart-placeholder" />
          )}
          {prev !== null && (
            <div className="mkt-chart-legend">
              <span className="mkt-legend-prev">Prev close</span>
              <span className="mkt-legend-cur">Current</span>
            </div>
          )}
        </div>
      </div>

      <footer className="mkt-card-footer">
        {displayDate ? (
          <span className="mkt-date">As of {displayDate}</span>
        ) : (
          <span className="mkt-date mkt-date--unavail">Data unavailable</span>
        )}
        {item.source?.name && (
          <span className="mkt-source">
            {item.source.url ? (
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mkt-source-link"
              >
                {item.source.name}
              </a>
            ) : (
              item.source.name
            )}
          </span>
        )}
      </footer>
    </article>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────

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

// ── Section ───────────────────────────────────────────────────────────────────

export default function MarketChartsSection() {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
    if (!apiUrl) {
      setLoading(false);
      setError(true);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${apiUrl}/api/market/snapshot`, {
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error('non-ok');
        const body = await res.json() as MarketSnapshot;
        if (!cancelled) {
          setSnapshot(body);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setError(true);
        }
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  const instruments = snapshot?.instruments ?? [];

  return (
    <section aria-labelledby="mkt-section-title" className="mkt-section">
      <div className="home-section-heading home-dispatches-heading">
        <div>
          <p className="home-eyebrow">LIVE MARKET SNAPSHOT</p>
          <h2 id="mkt-section-title">Market data</h2>
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

      {error && !loading && (
        <p className="mkt-error-note">
          Market data is temporarily unavailable. Please check back shortly.
        </p>
      )}

      <div className="mkt-grid">
        {loading
          ? [0, 1, 2, 3].map((k) => <SkeletonCard key={k} />)
          : instruments.map((item) => (
              <InstrumentCard key={item.id} item={item} />
            ))}
      </div>

      <p className="mkt-disclaimer">
        End-of-day / benchmark values. Not financial advice.{' '}
        Sources: US Treasury &middot; EIA &middot; IBJA.
      </p>
    </section>
  );
}
