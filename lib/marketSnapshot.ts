// Reads the backend's stored market snapshot. The backend refreshes it on a fixed schedule;
// this module never calls market data providers directly.

export type MarketSnapshotStatus = 'ok' | 'partial' | 'stale' | 'unavailable';

export type MarketInstrument = {
  id: string;
  name: string;
  value: number | null;
  previousClose: number | null;
  change: number | null;
  changePercent: number | null;
  unit: string;
  currency: string;
  dataDate: string | null;
  filledFrom: string | null;
  sourceStatus: string | null;
  source: { id: string; name: string | null; url: string | null } | null;
  updatedAt: string | null;
  lastAttemptStatus: 'ok' | 'error' | null;
  status: 'ok' | 'stale' | 'unavailable';
};

export type MarketSnapshot = {
  status: MarketSnapshotStatus;
  snapshotUpdatedAt: string | null;
  instruments: MarketInstrument[];
};

export type MarketLevel = {
  id: string;
  label: string;
  value: string;
  change: string;
  up: boolean | null;
  dataDate: string | null;
  sourceStatus: string | null;
  stale: boolean;
  numericValue: number | null;
  numericPrevious: number | null;
  previousValue: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
};

// Instruments the backend stores, in display order. Labels are shown before the backend has
// stored a snapshot, so the page never invents figures.
export const MARKET_LABELS: Record<string, string> = {
  UST2Y: '2Y Treasury Yield',
  UST10Y: '10Y Treasury Yield',
  BRENT: 'Brent Spot (EIA)',
  WTI: 'WTI Spot (EIA)',
  USDINR: 'USD / INR',
  EURUSD: 'EUR / USD',
  GBPUSD: 'GBP / USD',
  USDJPY: 'USD / JPY',
};

export const SIDEBAR_MARKET_IDS = ['UST2Y', 'BRENT', 'WTI', 'USDINR'];

const SOURCE_LABELS: Record<string, string> = {
  treasury: 'US Treasury',
  eia: 'EIA',
  ecb: 'ECB reference rates',
};

function finite(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function isSnapshot(body: unknown): body is MarketSnapshot {
  if (!body || typeof body !== 'object') return false;
  const candidate = body as Partial<MarketSnapshot>;
  return typeof candidate.status === 'string'
    && Array.isArray(candidate.instruments)
    && candidate.instruments.every((item) => item && typeof item.id === 'string' && typeof item.name === 'string');
}

export async function fetchMarketSnapshot(): Promise<MarketSnapshot | null> {
  const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
  if (!apiUrl) return null;
  try {
    // Short revalidation keeps the page within minutes of the backend's scheduled snapshot
    // without contacting market data providers; the backend endpoint only reads PostgreSQL.
    const response = await fetch(`${apiUrl}/api/market/snapshot`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const body: unknown = await response.json();
    return isSnapshot(body) ? body : null;
  } catch {
    return null;
  }
}

function formatValue(item: MarketInstrument, value: number): string {
  if (item.unit === 'percent') return `${value.toFixed(2)}%`;
  // FX pairs: USD-quoted majors to 4 decimals, INR and JPY quotes to 2.
  if (item.unit === 'rate') return value.toFixed(item.currency === 'USD' ? 4 : 2);
  if (item.currency === 'INR') {
    const amount = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
    return `₹${amount}${item.unit === 'gram' ? '/g' : ''}`;
  }
  if (item.currency === 'USD') return `${value < 0 ? '-' : ''}$${Math.abs(value).toFixed(2)}`;
  return value.toFixed(2);
}

function formatChange(item: MarketInstrument): string {
  const change = finite(item.change);
  if (change === null) return 'Change unavailable';
  if (item.unit === 'percent') {
    const bps = Math.round(change * 100);
    return `${bps > 0 ? '+' : ''}${bps} bps vs previous close`;
  }
  const percent = finite(item.changePercent);
  if (percent === null) return 'Change unavailable';
  return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}% vs previous close`;
}

export function formatDataDate(value: string | null): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}T00:00:00Z`));
}

export function formatSnapshotTime(value: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return `${new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  }).format(parsed)} IST`;
}

export function toMarketLevels(
  snapshot: MarketSnapshot | null,
  ids: string[] = Object.keys(MARKET_LABELS),
): MarketLevel[] {
  const byId = new Map((snapshot?.instruments ?? []).map((item) => [item.id, item]));
  return ids.map((id) => {
    const item = byId.get(id);
    const value = !item || item.status === 'unavailable' ? null : finite(item.value);
    if (!item || value === null) {
      return {
        id,
        label: item?.name ?? MARKET_LABELS[id] ?? id,
        value: 'Data unavailable',
        change: 'Awaiting data',
        up: null,
        dataDate: null,
        sourceStatus: null,
        stale: false,
        numericValue: null,
        numericPrevious: null,
        previousValue: null,
        sourceName: null,
        sourceUrl: null,
      };
    }
    const change = finite(item.change);
    const previous = finite(item.previousClose);
    return {
      id,
      label: item.name,
      value: formatValue(item, value),
      change: formatChange(item),
      up: change === null || change === 0 ? null : change > 0,
      // A gap-filled value is shown with the date it was originally observed.
      dataDate: formatDataDate(item.filledFrom ?? item.dataDate),
      sourceStatus: item.sourceStatus,
      stale: item.status === 'stale',
      numericValue: value,
      numericPrevious: previous,
      previousValue: previous === null ? null : formatValue(item, previous),
      sourceName: item.source ? SOURCE_LABELS[item.source.id] ?? item.source.name ?? item.source.id : null,
      sourceUrl: item.source?.url ?? null,
    };
  });
}

export function sourceSummary(snapshot: MarketSnapshot | null, instrumentIds?: string[]): string {
  const ids = [...new Set((snapshot?.instruments ?? [])
    .filter((item) => !instrumentIds || instrumentIds.includes(item.id))
    .map((item) => item.source?.id)
    .filter((id): id is string => Boolean(id)))];
  const labels = ids.map((id) => SOURCE_LABELS[id] ?? id);
  return labels.length ? ` (${labels.join(', ')})` : '';
}
