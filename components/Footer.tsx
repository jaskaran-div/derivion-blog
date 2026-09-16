'use client';
import Link from 'next/link';

const departments = [
  'Macro Strategy',
  'Quantitative Assets',
  'Equities & Rates',
  'Energy & Freight',
  'Sovereign Debt',
];

const bureaus = [
  'Editorial Board',
  'Research Fellows',
  'Ethics Charter',
  'London Desk',
  'Mumbai Desk',
];

export default function Footer() {
  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid var(--border-light)', marginTop: '60px', padding: '52px 0 28px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr',
          gap: '44px',
          paddingBottom: '44px',
          borderBottom: '1px solid var(--border-light)',
        }}>
          {/* Col 1: Brand */}
          <div>
            <Link href="/" style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '0.02em',
              display: 'inline-block',
              marginBottom: '14px',
            }}>
              DERIVIONACADEMY.IN
            </Link>
            <p style={{
              fontSize: '12px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.65,
              maxWidth: '300px',
              marginBottom: '16px',
            }}>
              An authoritative digital chronicle and research bureau providing institutional analysis, quantitative derivative intelligence, and sovereign market reports.
            </p>
            <div style={{
              fontSize: '9.5px',
              color: 'var(--ochre-dark)',
              letterSpacing: '0.06em',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span className="dot-ochre" style={{ width: '5px', height: '5px' }} /> Verified Independent Intelligence
            </div>
          </div>

          {/* Col 2: Departments */}
          <div>
            <div style={{
              fontSize: '9.5px',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Departments
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px', listStyle: 'none' }}>
              {departments.map(d => (
                <li key={d}>
                  <Link href="#" style={{ fontSize: '12px', color: 'var(--ink-secondary)', transition: 'color 0.15s' }}>
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Masthead & Bureau */}
          <div>
            <div style={{
              fontSize: '9.5px',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Masthead & Bureau
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px', listStyle: 'none' }}>
              {bureaus.map(b => (
                <li key={b}>
                  <Link href="#" style={{ fontSize: '12px', color: 'var(--ink-secondary)', transition: 'color 0.15s' }}>
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Institutional Registry & Bureau Desk */}
          <div>
            <div style={{
              fontSize: '9.5px',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Institutional Registry
            </div>
            <p style={{
              fontSize: '12px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.6,
              marginBottom: '14px',
            }}>
              Official repository of sovereign risk treatises, peer-reviewed econometric models, and print folios.
            </p>
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a' }}>
                Editorial & Syndicate Desk
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 600 }}>
                desk@derivionacademy.in
              </div>
              <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                Ref: ISSN 2841-9042 · Global Edition
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '20px',
          fontSize: '10.5px',
          color: 'var(--ink-muted)',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div>
            © 2024 DERIVIONACADEMY.IN. All editorial rights reserved. ISSN 2841-9042.
          </div>
          <div>
            DELIVERED VIA ENCRYPTED HIGH-YIELD FEEDS
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div[style*='grid-template-columns'] {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 580px) {
          footer .container > div[style*='grid-template-columns'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
