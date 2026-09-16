'use client';
import { useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

const categories = [
  'All Feeds',
  'Macro Policy',
  'Regulatory Briefs',
  'Risk Infrastructure',
  'Market Watch',
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Feeds');

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: 'var(--ink-muted)',
          marginBottom: '20px',
        }}>
          <Link href="/">Home</Link> <span>›</span>
          <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>News & Insights</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow-text">
            REAL-TIME DISPATCHES & EDITORIAL WIRE
          </div>
          <h1 className="page-title">
            News & Insights
          </h1>
          <p className="page-subtitle">
            Fast-moving regulatory developments, central bank communications, and systemic market infrastructure intelligence.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-pills-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State: Gathering Latest Info */}
        <EmptyState
          sectionName="News & Insights"
          categoryName={selectedCategory !== 'All Feeds' ? selectedCategory : undefined}
          title="We are gathering interesting and latest info for you"
          description="Our market intelligence desk and regulatory analysts are continuously tracking real-time circulars, SEBI/RBI updates, and exchange telemetry. New dispatches will appear here once verified."
          actionText="Explore Live Creator Blogs →"
          actionHref="/blogs"
        />
      </div>
    </div>
  );
}
