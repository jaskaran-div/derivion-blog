import Link from 'next/link';
import type { MagazineIssue } from '@/lib/data';

interface Props {
  issue: MagazineIssue;
  variant?: 'hero' | 'cover';
}

export default function MagazineCoverCard({ issue, variant = 'cover' }: Props) {
  const href = `/magazine/${issue.slug}`;

  if (variant === 'hero') {
    return (
      <Link href={href}>
        <div className="featured-hero" style={{ cursor: 'pointer' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: '400px' }}>
            {/* Cover image placeholder */}
            <div style={{
              background: 'linear-gradient(160deg, #1a2338 0%, #0d1526 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '32px', borderRight: '1px solid rgba(255,255,255,0.07)', position: 'relative',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(201,168,76,0.03) 8px, rgba(201,168,76,0.03) 16px)' }} />
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '16px' }}>DERIVION ACADEMY</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 800, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '12px' }}>{issue.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.15em' }}>{issue.issueNumber}</div>
              </div>
            </div>

            {/* Details */}
            <div className="featured-hero-body">
              <div className="featured-label">
                <span className="live-dot" />
                {issue.edition} · {issue.issueNumber}
              </div>
              <h2 className="featured-title">{issue.title}</h2>
              <p className="featured-excerpt">{issue.subtitle}</p>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '10px', color: 'var(--slate)', marginBottom: '8px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Featured Contributors</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {issue.contributors.map(c => (
                    <span key={c} className="tag" style={{ fontSize: '11px' }}>{c}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary">Acquire Print/PDF →</button>
                <button className="btn btn-outline">Download Contents</button>
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .featured-hero > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </Link>
    );
  }

  // Cover card variant
  return (
    <Link href={href}>
      <div className="mag-cover">
        <div className="mag-cover-img" style={{
          background: 'linear-gradient(160deg, var(--navy-600) 0%, var(--navy) 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px', textAlign: 'center', minHeight: '260px',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '12px' }}>DERIVION ACADEMY</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2 }}>{issue.title}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--slate)', marginTop: '8px', letterSpacing: '0.1em' }}>{issue.issueNumber}</div>
        </div>
        <div className="mag-cover-body">
          <div className="mag-cover-edition">{issue.date}</div>
          <h3 className="mag-cover-title">{issue.title}</h3>
          <p style={{ fontSize: '11px', color: 'var(--slate)', lineHeight: '1.65', marginBottom: '12px' }}>{issue.subtitle.substring(0, 80)}...</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--slate)' }}>{issue.pages}pp</span>
            <span className="read-more" style={{ fontSize: '11px' }}>View Issue →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
