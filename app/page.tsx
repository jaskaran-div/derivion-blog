import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'DerivionAcademy.in – The Hedge Front & Quantitative Intelligence',
  description: 'The authoritative digital chronicle and research bureau providing institutional analysis, quantitative derivative intelligence, and sovereign market reports.',
};

export default function HomePage() {
  const blog1 = blogs[0]; // Why Forex Dreams Need a Legal Reality Check
  const blog2 = blogs[1]; // How to resurrect a Stock Exchange; the Kolkata way
  const blog3 = blogs[2]; // Why the Calcutta Stock Exchange Died so GIFT City Could Fly
  const allBlogs = blogs;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* ============================================================
          HERO – Magazine Grid (Inspired by Indise Editorial)
          Left: 2 stacked story cards | Right: 1 large featured story
          Fully Responsive for Mobile & Desktop
          ============================================================ */}
      <section className="da-hero">
        <div className="da-hero__grid">

          {/* LEFT COLUMN – 2 stacked cards */}
          <div className="da-hero__left">
            {/* Card 1: Blog 2 */}
            <Link href={`/blogs/${blog2.slug}`} className="da-hero__card da-hero__card--sm">
              <Image
                src="/hero-card1.jpg"
                alt="Calcutta Stock Exchange Revival Analysis"
                fill
                className="da-hero__card-img"
                priority
              />
              <div className="da-hero__card-overlay" />
              <div className="da-hero__card-body">
                <span className="da-hero__card-tag">EXCHANGE INFRASTRUCTURE</span>
                <h3 className="da-hero__card-title">
                  {blog2.title}
                </h3>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: '4px', display: 'block' }}>
                  By {blog2.author.name} • {blog2.readTime || '8 min read'}
                </span>
              </div>
            </Link>

            {/* Card 2: Blog 3 */}
            <Link href={`/blogs/${blog3.slug}`} className="da-hero__card da-hero__card--sm">
              <Image
                src="/hero-card2.jpg"
                alt="GIFT City vs Lyons Range Risk Analysis"
                fill
                className="da-hero__card-img"
              />
              <div className="da-hero__card-overlay" />
              <div className="da-hero__card-body">
                <span className="da-hero__card-tag">SYSTEMIC RISK & CLEARING</span>
                <h3 className="da-hero__card-title">
                  {blog3.title}
                </h3>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: '4px', display: 'block' }}>
                  By {blog3.author.name} • {blog3.readTime || '9 min read'}
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT COLUMN – Large featured card (Blog 1) */}
          <div className="da-hero__card da-hero__card--featured">
            <Image
              src="/hero-featured.jpg"
              alt="Forex Legal Reality Check"
              fill
              className="da-hero__card-img"
              priority
            />
            <div className="da-hero__card-overlay da-hero__card-overlay--featured" />
            <div className="da-hero__card-body da-hero__card-body--featured">
              <span className="da-hero__card-tag">THE HEDGE FRONT · COVER STORY</span>
              <h2 className="da-hero__featured-title">
                {blog1.title}
              </h2>
              <p style={{
                color: 'rgba(248, 250, 252, 0.88)',
                fontSize: 'clamp(12.5px, 1.4vw, 14.5px)',
                lineHeight: 1.6,
                marginBottom: '18px',
                maxWidth: '680px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {blog1.excerpt}
              </p>
              <div className="da-hero__featured-meta">
                <Link href={`/blogs/${blog1.slug}`} className="da-hero__read-btn">
                  Read Dispatch →
                </Link>
                <span className="da-hero__author">
                  <span className="da-hero__author-avatar">HF</span>
                  by {blog1.author.name}
                </span>
              </div>
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
