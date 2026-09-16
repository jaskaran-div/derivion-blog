'use client';
import Link from 'next/link';

const departments = [
  { name: 'The Hedge Front', href: '/blogs' },
  { name: 'Regulatory Intelligence', href: '/blogs/why-forex-dreams-need-a-legal-reality-check' },
  { name: 'Exchange Infrastructure', href: '/blogs/how-to-resurrect-a-stock-exchange-the-kolkata-way' },
  { name: 'Risk & Clearing Desks', href: '/blogs/why-the-calcutta-stock-exchange-died-so-gift-city-could-fly' },
  { name: 'Quantitative Education', href: '/blogs/the-great-employability-reset-bridging-the-experience-paradox-in-financial-education' },
];

const quickLinks = [
  { name: 'Creator Blogs', href: '/blogs' },
  { name: 'News & Insights', href: '/news' },
  { name: 'Longform Treatises', href: '/articles' },
  { name: 'The Magazine', href: '/magazine' },
  { name: 'Special Reports', href: '/special-reports' },
];

export default function Footer() {
  return (
    <footer className="da-footer">
      <div className="container">
        <div className="da-footer__grid">
          {/* Col 1: Brand */}
          <div className="da-footer__col-brand">
            <Link href="/" className="da-footer__brand-title">
              DERIVIONACADEMY.IN
            </Link>
            <p className="da-footer__brand-desc">
              An authoritative digital chronicle and research bureau providing institutional analysis, quantitative derivative intelligence, and sovereign market reports.
            </p>
            <div className="da-footer__brand-badge">
              <span className="dot-ochre" style={{ width: '6px', height: '6px' }} />
              Verified Independent Intelligence
            </div>
          </div>

          {/* Col 2: The Hedge Front Desks */}
          <div className="da-footer__col">
            <div className="da-footer__heading">
              Active Desks
            </div>
            <ul className="da-footer__list">
              {departments.map((d) => (
                <li key={d.name}>
                  <Link href={d.href} className="da-footer__link">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sections */}
          <div className="da-footer__col">
            <div className="da-footer__heading">
              Chronicle Verticals
            </div>
            <ul className="da-footer__list">
              {quickLinks.map((q) => (
                <li key={q.name}>
                  <Link href={q.href} className="da-footer__link">
                    {q.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Institutional Registry */}
          <div className="da-footer__col">
            <div className="da-footer__heading">
              Institutional Registry
            </div>
            <p className="da-footer__reg-desc">
              Official repository of sovereign risk treatises, peer-reviewed econometric models, and market infrastructure studies.
            </p>
            <div className="da-footer__card">
              <div className="da-footer__card-title">
                The Hedge Front / ISFT Desk
              </div>
              <div className="da-footer__card-email">
                info@derivion.in
              </div>
              <div className="da-footer__card-meta">
                Ref: ISSN 2841-9042 · Global Edition
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="da-footer__bottom">
          <div>
            © {new Date().getFullYear()} DERIVIONACADEMY.IN. All editorial rights reserved. ISSN 2841-9042.
          </div>
          <div>
            THE HEDGE FRONT · POWERED BY ISFT
          </div>
        </div>
      </div>

      <style jsx>{`
        .da-footer {
          background: #ffffff;
          border-top: 1px solid var(--border-light);
          margin-top: 60px;
          padding: clamp(36px, 5vw, 56px) 0 24px;
        }

        .da-footer__grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: clamp(24px, 3.5vw, 44px);
          padding-bottom: clamp(24px, 4vw, 40px);
          border-bottom: 1px solid var(--border-light);
        }

        .da-footer__brand-title {
          font-size: clamp(16px, 2vw, 18px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.02em;
          display: inline-block;
          margin-bottom: 12px;
        }

        .da-footer__brand-desc {
          font-size: 12px;
          color: var(--ink-secondary);
          line-height: 1.65;
          max-width: 320px;
          margin-bottom: 16px;
        }

        .da-footer__brand-badge {
          font-size: 10px;
          color: var(--ochre-dark);
          letter-spacing: 0.06em;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .da-footer__heading {
          font-size: 10px;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: var(--ink-muted);
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .da-footer__list {
          display: flex;
          flex-direction: column;
          gap: 9px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .da-footer__link {
          font-size: 12px;
          color: var(--ink-secondary);
          transition: color 0.15s ease;
        }

        .da-footer__link:hover {
          color: var(--ink-black);
        }

        .da-footer__reg-desc {
          font-size: 12px;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .da-footer__card {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .da-footer__card-title {
          font-size: 10.5px;
          font-weight: 700;
          color: #0f172a;
        }

        .da-footer__card-email {
          font-size: 11px;
          color: var(--ochre-dark);
          font-weight: 600;
        }

        .da-footer__card-meta {
          font-size: 9.5px;
          color: var(--ink-muted);
          margin-top: 2px;
        }

        .da-footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          font-size: 10.5px;
          color: var(--ink-muted);
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 992px) {
          .da-footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 580px) {
          .da-footer__grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .da-footer__bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
