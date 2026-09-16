'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Creator Blogs', href: '/blogs' },
  { label: 'News & Insights', href: '/news' },
  { label: 'Longform Articles', href: '/articles' },
  { label: 'The Magazine', href: '/magazine' },
  { label: 'Special Reports', href: '/special-reports' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <>
      <header className="da-navbar">
        <div className="da-navbar__inner container">
          {/* Brand */}
          <Link href="/" className="da-navbar__brand" onClick={() => setMobileOpen(false)}>
            <span className="da-navbar__brand-text">DerivionAcademy</span>
            <span className="da-navbar__brand-dot">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="da-navbar__nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`da-navbar__link${isActive ? ' da-navbar__link--active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="da-navbar__actions">
            {/* Search toggle */}
            <button
              id="navbar-search-toggle"
              className="da-navbar__icon-btn"
              aria-label="Toggle Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <Link href="/blogs" id="navbar-live-badge" className="da-navbar__live-badge">
              <span className="da-navbar__live-dot" />
              The Hedge Front
            </Link>

            <Link href="/blogs/why-forex-dreams-need-a-legal-reality-check" id="navbar-cta" className="da-navbar__cta-btn">
              Latest Dispatch →
            </Link>

            {/* Mobile hamburger */}
            <button
              id="navbar-mobile-menu"
              className={`da-navbar__hamburger${mobileOpen ? ' open' : ''}`}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Search bar (expandable) */}
        {searchOpen && (
          <div className="da-navbar__search-bar container">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Search blogs, topics, regulatory circulars..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="da-navbar__search-input"
            />
            {query && (
              <Link
                href={`/blogs?q=${encodeURIComponent(query)}`}
                onClick={() => setSearchOpen(false)}
                className="da-navbar__search-submit"
              >
                Go
              </Link>
            )}
            <button className="da-navbar__icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <nav className="da-navbar__mobile-menu container" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`da-navbar__mobile-link${isActive ? ' da-navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.href === '/blogs' && (
                    <span className="da-navbar__mobile-badge">5 Dispatches</span>
                  )}
                </Link>
              );
            })}
            <div className="da-navbar__mobile-footer">
              <Link
                href="/blogs/why-forex-dreams-need-a-legal-reality-check"
                className="da-navbar__mobile-cta"
                onClick={() => setMobileOpen(false)}
              >
                Read Featured Dispatch →
              </Link>
            </div>
          </nav>
        )}
      </header>

      <style>{`
        .da-navbar {
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border-light);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .da-navbar__inner {
          display: flex;
          align-items: center;
          height: 62px;
          gap: 20px;
          justify-content: space-between;
        }

        .da-navbar__brand {
          display: flex;
          align-items: baseline;
          text-decoration: none;
          flex-shrink: 0;
        }

        .da-navbar__brand-text {
          font-size: clamp(17px, 2.5vw, 20px);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .da-navbar__brand-dot {
          font-size: clamp(17px, 2.5vw, 20px);
          font-weight: 800;
          color: var(--ochre);
        }

        .da-navbar__nav {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }

        .da-navbar__link {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-secondary);
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .da-navbar__link:hover {
          color: var(--ink-black);
          background: #f8fafc;
        }

        .da-navbar__link--active {
          color: var(--ink-black);
          font-weight: 700;
          background: #f1f5f9;
        }

        .da-navbar__actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .da-navbar__icon-btn {
          background: none;
          border: none;
          color: var(--ink-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .da-navbar__icon-btn:hover {
          background: #f1f5f9;
          color: var(--ink-black);
        }

        .da-navbar__live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #1d4ed8;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 5px 12px;
          border-radius: 9999px;
          text-decoration: none;
          white-space: nowrap;
        }

        .da-navbar__live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
          animation: da-pulse 1.5s infinite;
        }

        @keyframes da-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .da-navbar__cta-btn {
          display: inline-flex;
          align-items: center;
          background: #0f172a;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 7px 16px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .da-navbar__cta-btn:hover {
          background: #1e293b;
          transform: translateY(-1px);
        }

        .da-navbar__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          width: 36px;
          height: 36px;
        }

        .da-navbar__hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--ink-black);
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        .da-navbar__hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .da-navbar__hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .da-navbar__hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .da-navbar__search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          color: var(--ink-muted);
          border-top: 1px solid var(--border-light);
          background: #ffffff;
        }

        .da-navbar__search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--ink-black);
          font-size: 13px;
        }

        .da-navbar__search-submit {
          font-size: 11px;
          font-weight: 700;
          background: #0f172a;
          color: #ffffff;
          padding: 3px 10px;
          border-radius: 4px;
        }

        .da-navbar__mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 12px 16px 20px;
          border-top: 1px solid var(--border-light);
          background: #ffffff;
          gap: 4px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .da-navbar__mobile-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-secondary);
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.15s ease;
        }

        .da-navbar__mobile-link:hover,
        .da-navbar__mobile-link--active {
          color: var(--ink-black);
          background: #f1f5f9;
          font-weight: 700;
        }

        .da-navbar__mobile-badge {
          font-size: 9.5px;
          font-weight: 700;
          color: #2563eb;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .da-navbar__mobile-footer {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }

        .da-navbar__mobile-cta {
          display: block;
          text-align: center;
          background: #0f172a;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 10px;
          border-radius: 8px;
          text-decoration: none;
        }

        @media (max-width: 992px) {
          .da-navbar__nav {
            display: none;
          }
          .da-navbar__live-badge {
            display: none;
          }
          .da-navbar__hamburger {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .da-navbar__cta-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
