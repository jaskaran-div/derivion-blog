'use client';
import { useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

const reportCategories = [
  'All Reports',
  'Central Bank Policy',
  'Exchange Clearing',
  'Quantitative Telemetry',
  'Regulatory Forensics',
];

export default function SpecialReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Reports');

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
          <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>Special Reports</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow-text">
            INSTITUTIONAL DOSSIERS & CLASSIFIED FORENSICS
          </div>
          <h1 className="page-title">
            Special Reports
          </h1>
          <p className="page-subtitle">
            Deep-dive forensic audits, risk models, and systemic analyses prepared for institutional treasuries and desk practitioners.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-pills-bar">
          {reportCategories.map((cat) => (
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
          sectionName="Special Reports"
          categoryName={selectedCategory !== 'All Reports' ? selectedCategory : undefined}
          title="We are gathering interesting and latest info for you"
          description="Our quantitative risk team and forensic analysts are finalizing institutional dossiers and econometric data suites for this category. Stay tuned or review our latest published blogs."
          actionText="Read Creator Blogs →"
          actionHref="/blogs"
        />
      </div>
    </div>
  );
}
