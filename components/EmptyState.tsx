'use client';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  categoryName?: string;
  sectionName?: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = 'We are gathering interesting and latest info for you',
  description = 'Our research fellows, economists, and market analysts are actively curating and validating comprehensive treatises, dispatches, and quantitative models for this vertical. Check back shortly or explore our live publications.',
  categoryName,
  sectionName,
  actionText = 'Explore Latest Blogs →',
  actionHref = '/blogs',
}: EmptyStateProps) {
  return (
    <div className="da-empty-state">
      <div className="da-empty-state__icon-wrapper">
        <svg
          className="da-empty-state__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </div>

      <div className="da-empty-state__badge">
        <span className="da-empty-state__badge-dot" />
        {sectionName ? `${sectionName.toUpperCase()} · ` : ''}EDITORIAL DESK IN PROGRESS
      </div>

      <h2 className="da-empty-state__title">
        {categoryName ? `Gathering dispatches for "${categoryName}"` : title}
      </h2>

      <p className="da-empty-state__desc">
        {description}
      </p>

      <div className="da-empty-state__actions">
        <Link href={actionHref} className="da-empty-state__btn-primary">
          {actionText}
        </Link>
        <Link href="/" className="da-empty-state__btn-secondary">
          Return to Home
        </Link>
      </div>

      <div className="da-empty-state__footer">
        <span>Verified Editorial Dispatch Pipeline</span>
        <span>•</span>
        <span>ISSN 2841-9042</span>
      </div>

      <style jsx>{`
        .da-empty-state {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: clamp(32px, 6vw, 64px) clamp(20px, 4vw, 48px);
          text-align: center;
          margin: 32px 0 48px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .da-empty-state::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa);
        }

        .da-empty-state__icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          margin-bottom: 20px;
        }

        .da-empty-state__icon {
          width: 26px;
          height: 26px;
          animation: spin-slow 20s linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .da-empty-state__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
          background: #eff6ff;
          padding: 4px 12px;
          border-radius: 9999px;
          border: 1px solid #bfdbfe;
          margin-bottom: 16px;
        }

        .da-empty-state__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .da-empty-state__title {
          font-family: var(--font-serif);
          font-size: clamp(20px, 3.2vw, 28px);
          font-weight: 700;
          color: var(--ink-black);
          line-height: 1.25;
          max-width: 620px;
          margin-bottom: 12px;
        }

        .da-empty-state__desc {
          font-size: clamp(12.5px, 1.6vw, 14px);
          color: var(--ink-secondary);
          line-height: 1.65;
          max-width: 580px;
          margin-bottom: 28px;
        }

        .da-empty-state__actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .da-empty-state__btn-primary {
          background: #0f172a;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
        }

        .da-empty-state__btn-primary:hover {
          background: #1e293b;
          transform: translateY(-1px);
        }

        .da-empty-state__btn-secondary {
          background: #ffffff;
          color: var(--ink-secondary);
          border: 1px solid var(--border-light);
          font-size: 12px;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .da-empty-state__btn-secondary:hover {
          background: #f8fafc;
          color: var(--ink-black);
          border-color: #cbd5e1;
        }

        .da-empty-state__footer {
          margin-top: 36px;
          padding-top: 20px;
          border-top: 1px solid var(--border-faint);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          color: var(--ink-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
