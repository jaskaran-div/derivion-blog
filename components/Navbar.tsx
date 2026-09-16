'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'News & Insights', href: '/news' },
  { label: 'Longform Articles', href: '/articles' },
  { label: 'Creator Blogs', href: '/blogs' },
  { label: 'Magazine', href: '/magazine' },
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
          <Link href="/" className="da-navbar__brand">
            <span className="da-navbar__brand-text">DerivionAcademy</span>
            <span className="da-navbar__brand-dot">.</span>
          </Link>

          {/* Center Nav */}
          <nav className="da-navbar__nav">
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
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <Link href="/news" id="navbar-market-wire" className="da-navbar__live-badge">
              <span className="da-navbar__live-dot" />
              Market Wire
            </Link>

            <Link href="/magazine" id="navbar-cta" className="da-navbar__cta-btn">
              Vol. XXIV · Issue 4
            </Link>

            {/* Mobile hamburger */}
            <button
              id="navbar-mobile-menu"
              className="da-navbar__hamburger"
              aria-label="Menu"
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
              placeholder="Search creators, columns, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="da-navbar__search-input"
            />
            <button className="da-navbar__icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="da-navbar__mobile-menu container">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`da-navbar__mobile-link${isActive ? ' da-navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
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
          box-shadow: var(--shadow-card);
        }
        .da-navbar__inner {
          display: flex;
          align-items: center;
          height: 60px;
          gap: 32px;
        }
        .da-navbar__brand {
          display: flex;
          align-items: baseline;
          gap: 0;
          flex-shrink: 0;
          text-decoration: none;
        }
        .da-navbar__brand-text {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
        }
        .da-navbar__brand-dot {
          font-size: 20px;
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
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-secondary);
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: color 0.15s ease, background 0.15s ease;
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
          padding: 6px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .da-navbar__icon-btn:hover {
          color: var(--ink-black);
          background: #f8fafc;
        }
        .da-navbar__live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-black);
          padding: 5px 12px;
          border: 1px solid var(--border-light);
          border-radius: 9999px;
          background: #f8fafc;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .da-navbar__live-badge:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        .da-navbar__live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 2px rgba(22,163,74,0.2);
          animation: da-pulse 2s infinite;
          display: inline-block;
          flex-shrink: 0;
        }
        @keyframes da-pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(22,163,74,0.2); }
          50% { box-shadow: 0 0 0 4px rgba(22,163,74,0.1); }
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
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .da-navbar__hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--ink-secondary);
          border-radius: 2px;
          transition: background 0.15s ease;
        }
        .da-navbar__hamburger:hover span {
          background: var(--ink-black);
        }
        .da-navbar__search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 0;
          padding-bottom: 12px;
          color: var(--ink-muted);
          border-top: 1px solid var(--border-light);
        }
        .da-navbar__search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--ink-black);
          font-size: 13px;
          padding: 4px 0;
        }
        .da-navbar__search-input::placeholder {
          color: var(--ink-faint);
        }
        .da-navbar__mobile-menu {
          display: flex;
          flex-direction: column;
          padding-bottom: 12px;
          border-top: 1px solid var(--border-light);
          gap: 2px;
        }
        .da-navbar__mobile-link {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-secondary);
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .da-navbar__mobile-link:hover,
        .da-navbar__mobile-link--active {
          color: var(--ink-black);
          background: #f8fafc;
          font-weight: 600;
        }
        @media (max-width: 900px) {
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
