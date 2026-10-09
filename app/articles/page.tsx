'use client';
import { useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

const categories = [
  'All Treatises',
  'Monetary Philosophy',
  'Market Structure',
  'Systemic Risk',
  'Quantitative Models',
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Treatises');

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
          <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>Longform Treatises</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow-text">
            PEER-REVIEWED MONOGRAPHS & RESEARCH TREATISES
          </div>
          <h1 className="page-title">
            Longform Articles & Treatises
          </h1>
          <p className="page-subtitle">
            Rigorous, citation-backed treatises examining global macro trends, systemic debt cycles, and financial infrastructure.
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

        {/* Empty State */}
        <EmptyState
          sectionName="Longform Articles"
          categoryName={selectedCategory !== 'All Treatises' ? selectedCategory : undefined}
          title="We are gathering interesting and latest info for you"
          description="Our academic research fellows and senior economists are presently drafting and peer-reviewing comprehensive monographs for this vertical. Meanwhile, explore our latest published blogs."
          actionText="Read The Hedge Front Blogs →"
          actionHref="/blogs"
        />
      </div>
    </div>
  );
}
