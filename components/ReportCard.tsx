import Link from 'next/link';
import type { SpecialReport } from '@/lib/data';

interface Props {
  report: SpecialReport;
  variant?: 'hero' | 'dossier';
}

export default function ReportCard({ report, variant = 'dossier' }: Props) {
  const href = `/special-reports/${report.slug}`;

  const accessLabel = {
    institutional: 'Institutional Access',
    open: 'Open Access',
    classified: 'Declassified',
  }[report.accessLevel];

  if (variant === 'hero') {
    return (
      <Link href={href}>
        <div className="featured-hero" style={{ cursor: 'pointer' }}>
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span className="featured-label">
                <span className="live-dot" style={{ background: report.accessLevel === 'classified' ? '#f87171' : '#4ade80' }} />
                SUMMARY ANNUAL REPORT · {report.date.toUpperCase()}
              </span>
              <span className={`access-badge ${report.accessLevel}`}>{accessLabel}</span>
            </div>

            <h2 className="featured-title" style={{ fontSize: '26px', maxWidth: '700px' }}>{report.title}</h2>
            <p className="featured-excerpt" style={{ maxWidth: '680px' }}>{report.excerpt.substring(0, 300)}...</p>

            {/* Stats row */}
            {(report.centralBanks || report.transfers) && (
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {report.centralBanks && (
                  <div className="stat-box" style={{ minWidth: '130px' }}>
                    <span className="stat-value">{report.centralBanks}</span>
                    <span className="stat-label">Central Banks</span>
                  </div>
                )}
                {report.transfers && (
                  <div className="stat-box" style={{ minWidth: '140px' }}>
                    <span className="stat-value" style={{ fontSize: '18px' }}>{report.transfers}</span>
                    <span className="stat-label">Total Transfers</span>
                  </div>
                )}
                <div className="stat-box" style={{ minWidth: '110px' }}>
                  <span className="stat-value">{report.pages}</span>
                  <span className="stat-label">Pages</span>
                </div>
                <div className="stat-box" style={{ minWidth: '140px' }}>
                  <span className="stat-value" style={{ fontSize: '16px', color: report.accessLevel === 'classified' ? '#f87171' : 'var(--gold)' }}>
                    {accessLabel.toUpperCase()}
                  </span>
                  <span className="stat-label">Access Status</span>
                </div>
              </div>
            )}

            {/* Authors */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {report.authors.map(a => (
                  <div key={a.name} className="author-row">
                    <div className="author-avatar">{a.initials}</div>
                    <div>
                      <div className="author-name">{a.name}</div>
                      <div className="author-role">{a.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Access Executive Dossier (PDF)</button>
              <button className="btn btn-outline">Interactive Telemetry Model</button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Dossier card variant
  return (
    <Link href={href}>
      <div className="report-card fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div className="report-category">REPORT NO. · {report.category.toUpperCase()}</div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--slate)' }}>{report.date}</span>
          </div>
          <span className={`access-badge ${report.accessLevel}`}>{accessLabel}</span>
        </div>

        <h3 className="report-title">{report.title}</h3>
        <p className="report-desc">{report.excerpt.substring(0, 150)}...</p>

        <div className="report-meta-grid">
          <div className="report-meta-item">
            <strong>{report.pages} Pages</strong>
            Regulated Format
          </div>
          <div className="report-meta-item">
            <strong>{report.format.split(' + ')[0]}</strong>
            Format
          </div>
          {report.authors.map(a => (
            <div key={a.name} className="report-meta-item" style={{ gridColumn: '1 / -1' }}>
              <strong>
                {report.authors.map(a => a.name).join(', ')}
              </strong>
              Authors
            </div>
          )).slice(0, 1)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="read-more" style={{ fontSize: '12px' }}>Download Dossier →</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--slate)' }}>{report.pages}pp</span>
        </div>
      </div>
    </Link>
  );
}
