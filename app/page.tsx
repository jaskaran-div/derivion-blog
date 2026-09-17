import type { Metadata } from 'next';
import Link from 'next/link';
import { blogs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'DerivionAcademy.in – The Hedge Front & Quantitative Intelligence',
  description: 'The authoritative digital chronicle and research bureau providing institutional analysis, quantitative derivative intelligence, and sovereign market reports.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function HomePage() {
  const blog1 = blogs[0]; // Why Forex Dreams Need a Legal Reality Check
  const allBlogs = blogs;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* ============================================================
          HERO – Two-Column Modern Layout
          Left: Badge + Headline + CTA + SVG Illustration
          Right: Two stacked info cards (no stock photos)
          ============================================================ */}
      <section className="da-hero-v2">
        <div className="da-hero-v2__inner">

          {/* LEFT – Text + Illustration */}
          <div className="da-hero-v2__left">
            {/* Announcement Badge */}
            <div className="da-hero-v2__badge">
              <span className="da-hero-v2__badge-dot" />
              New Dispatch · {blog1.columnName}
            </div>

            {/* Main Headline */}
            <h1 className="da-hero-v2__headline">
              Institutional intelligence,<br />
              <span className="da-hero-v2__headline-accent">decoded for India.</span>
            </h1>

            <p className="da-hero-v2__subtext">
              Peer-reviewed financial analysis, sovereign market intelligence, and quantitative F&O research — from ISFT fellows.
            </p>

            {/* CTA */}
            <div className="da-hero-v2__cta-row">
              <Link href="/blogs" className="da-hero-v2__btn-primary">
                Read The Hedge Front →
              </Link>
              <Link href="/blogs" className="da-hero-v2__btn-ghost">
                Browse all dispatches
              </Link>
            </div>

            {/* SVG Illustration – abstract market/chart graphic */}
            <div className="da-hero-v2__illustration" aria-hidden="true">
              <svg viewBox="0 0 520 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="da-hero-v2__svg">
                {/* Grid lines */}
                <line x1="0" y1="240" x2="520" y2="240" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="180" x2="520" y2="180" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="120" x2="520" y2="120" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="60" x2="520" y2="60" stroke="#e2e8f0" strokeWidth="1" />

                {/* Chart area fill */}
                <path d="M40 210 L100 185 L160 195 L220 155 L280 130 L340 105 L400 80 L460 55 L520 40 L520 240 L40 240 Z"
                  fill="url(#areaGrad)" opacity="0.35" />

                {/* Chart line */}
                <path d="M40 210 L100 185 L160 195 L220 155 L280 130 L340 105 L400 80 L460 55 L520 40"
                  stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />

                {/* Dots on chart line */}
                {[{ x: 40, y: 210 }, { x: 100, y: 185 }, { x: 160, y: 195 }, { x: 220, y: 155 }, { x: 280, y: 130 }, { x: 340, y: 105 }, { x: 400, y: 80 }, { x: 460, y: 55 }, { x: 520, y: 40 }].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                ))}

                {/* Floating stat bubble */}
                <rect x="330" y="62" width="90" height="32" rx="8" fill="#0c1729" />
                <text x="375" y="82" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700">+18.4%</text>

                {/* Bar chart group (right side, secondary) */}
                <rect x="60" y="170" width="18" height="70" rx="4" fill="#bfdbfe" opacity="0.7" />
                <rect x="90" y="145" width="18" height="95" rx="4" fill="#93c5fd" opacity="0.8" />
                <rect x="120" y="155" width="18" height="85" rx="4" fill="#60a5fa" opacity="0.7" />

                {/* Candlestick-style bars */}
                <rect x="380" y="110" width="10" height="50" rx="2" fill="#2563eb" opacity="0.5" />
                <line x1="385" y1="100" x2="385" y2="170" stroke="#2563eb" strokeWidth="1.5" />
                <rect x="400" y="95" width="10" height="60" rx="2" fill="#2563eb" opacity="0.6" />
                <line x1="405" y1="85" x2="405" y2="165" stroke="#2563eb" strokeWidth="1.5" />
                <rect x="420" y="75" width="10" height="70" rx="2" fill="#1d4ed8" opacity="0.7" />
                <line x1="425" y1="60" x2="425" y2="155" stroke="#1d4ed8" strokeWidth="1.5" />

                {/* Gradient def */}
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* RIGHT – Two stacked cards */}
          <div className="da-hero-v2__right">

            {/* Card 1 – Latest Dispatch (Navy accent) */}
            <Link href={`/blogs/${blog1.slug}`} className="da-hero-v2__card da-hero-v2__card--navy">
              <div className="da-hero-v2__card-eyebrow">Latest Dispatch</div>
              <div className="da-hero-v2__card-title-lg">{blog1.title}</div>
              {/* Mini chart SVG */}
              <div className="da-hero-v2__mini-chart" aria-hidden="true">
                <svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%">
                  <path d="M0 55 L30 42 L60 48 L90 30 L120 20 L150 12 L200 5"
                    stroke="rgba(147,197,253,0.9)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0 55 L30 42 L60 48 L90 30 L120 20 L150 12 L200 5 L200 70 L0 70Z"
                    fill="url(#navyGrad)" opacity="0.3" />
                  <circle cx="200" cy="5" r="4" fill="#93c5fd" stroke="#fff" strokeWidth="1.5" />
                  <rect x="155" y="0" width="44" height="18" rx="6" fill="rgba(255,255,255,0.15)" />
                  <text x="177" y="12" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">LIVE</text>
                  <defs>
                    <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="da-hero-v2__card-meta">
                <span className="da-hero-v2__card-avatar">{blog1.author.initials}</span>
                <span>{blog1.author.name}</span>
                <span className="da-hero-v2__card-dot">·</span>
                <span>{blog1.readTime || '8 min'}</span>
              </div>
            </Link>

            {/* Card 2 – Stats/Research card (dark) */}
            <div className="da-hero-v2__card da-hero-v2__card--dark">
              <div className="da-hero-v2__card-eyebrow" style={{ color: '#94a3b8' }}>Research Bureau</div>
              <div className="da-hero-v2__card-title-lg" style={{ fontSize: 'clamp(16px,2vw,20px)' }}>ISFT Dispatch Syndicate</div>
              {/* Author stack */}
              <div className="da-hero-v2__authors-row">
                {blogs.slice(0, 4).map((b, i) => (
                  <div key={b.id} className="da-hero-v2__author-chip" style={{ zIndex: 10 - i, marginLeft: i === 0 ? 0 : '-10px' }}>
                    {b.author.initials}
                  </div>
                ))}
                <span className="da-hero-v2__author-count">+{blogs.length} dispatches</span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.55, marginTop: '8px' }}>
                Quantitative intelligence & regulatory breakdowns from verified ISFT research fellows.
              </p>
              <Link href="/blogs" className="da-hero-v2__card-link">Browse all dispatches →</Link>
            </div>

          </div>
        </div>
      </section>

      <div className="container">
        {/* STATS BAR */}
        <div className="da-stats-bar">
          {[
            { v: `${blogs.length}`, l: 'Active Dispatches' },
            { v: '100%', l: 'Regulatory Verified' },
            { v: 'ISFT', l: 'Research Syndicate' },
            { v: 'Bi-Weekly', l: 'Publication Cadence' },
          ].map((s) => (
            <div key={s.l} className="da-stats-bar__item">
              <div className="da-stats-bar__value">{s.v}</div>
              <div className="da-stats-bar__label">{s.l}</div>
            </div>
          ))}
        </div>

        {/* 2. LEAD THE HEDGE FRONT SECTION */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header-row">
            <div className="section-label-gold">
              <span className="dot-ochre" /> THE HEDGE FRONT · ACTIVE DISPATCHES
            </div>
            <Link href="/blogs" style={{ fontSize: '11px', color: 'var(--ochre-dark)', fontWeight: 700 }}>
              View All {allBlogs.length} Dispatches →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
          }}>
            {allBlogs.map((blog) => (
              <article key={blog.id} className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ padding: '24px 24px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--ochre-dark)',
                      background: 'var(--ochre-bg)',
                      border: '1px solid var(--ochre-border)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}>
                      {blog.columnName}
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>
                      {blog.readTime || '6 min read'}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(17px, 2vw, 20px)',
                    fontWeight: 700,
                    color: 'var(--ink-black)',
                    lineHeight: 1.35,
                    marginBottom: '10px',
                  }}>
                    <Link href={`/blogs/${blog.slug}`} style={{ color: 'inherit' }}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p style={{
                    fontSize: '12.5px',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {blog.excerpt}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} style={{
                        fontSize: '9.5px',
                        color: 'var(--ink-secondary)',
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-xs)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '14px 24px',
                  background: '#fbfbfa',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '10px' }}>
                      {blog.author.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink-black)' }}>
                        {blog.author.name}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>
                        {blog.date}
                      </div>
                    </div>
                  </div>

                  <Link href={`/blogs/${blog.slug}`} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ochre-dark)' }}>
                    Read Dispatch →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. EDITORIAL VERTICALS PIPELINE BANNER */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(24px, 4vw, 36px)',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ochre-dark)',
              marginBottom: '10px',
            }}>
              <span className="dot-ochre" /> CHRONICLE VERTICALS STATUS
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 700,
              color: 'var(--ink-black)',
              lineHeight: 1.3,
              marginBottom: '10px',
            }}>
              We are gathering interesting & latest info for you
            </h3>
            <p style={{
              fontSize: '13.5px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.65,
              maxWidth: '780px',
              marginBottom: '20px',
            }}>
              Our research fellows, economists, and market analysts are actively preparing upcoming peer-reviewed treatises for News & Insights, Longform Treatises, The Magazine, and Special Reports. In the interim, explore our active publications in Creator Blogs.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '14px',
              marginBottom: '20px',
            }}>
              {[
                { title: 'News & Insights', path: '/news', status: 'In Preparation' },
                { title: 'Longform Treatises', path: '/articles', status: 'In Preparation' },
                { title: 'The Magazine', path: '/magazine', status: 'In Preparation' },
                { title: 'Special Reports', path: '/special-reports', status: 'In Preparation' },
              ].map((v) => (
                <Link key={v.title} href={v.path} style={{
                  padding: '14px 16px',
                  background: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-black)' }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 600 }}>
                    ● {v.status} →
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/blogs" className="btn-black" style={{ borderRadius: '9999px', padding: '8px 22px' }}>
              Explore Active Creator Blogs →
            </Link>
          </div>
        </section>

        {/* 4. NEWSLETTER / DISPATCH ALERTS BANNER */}
        <div className="navy-cta-banner">
          <div>
            <div className="navy-cta-eyebrow">
              THE HEDGE FRONT · DISPATCH SYNDICATE
            </div>
            <h2 className="navy-cta-title">
              Stay ahead with verified financial intelligence.
            </h2>
            <p className="navy-cta-desc">
              Receive notifications whenever a new regulatory breakdown, market structure thesis, or F&O dispatch is released by ISFT fellows.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}>
            <Link href="/blogs" className="btn-ochre" style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px' }}>
              Read The Hedge Front
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
