'use client';
import { useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

const editions = [
  'Current Edition',
  'Archival Editions',
  'Special Folios',
  'Print Monographs',
];

export default function MagazinePage() {
  const [selectedEdition, setSelectedEdition] = useState('Current Edition');

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
          <span style={{ color: 'var(--ink-black)', fontWeight: 600 }}>The Magazine</span>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '28px' }}>
          <div className="eyebrow-text">
            PRINT & DIGITAL VOLUMES · DERIVION CHRONICLE
          </div>
          <h1 className="page-title">
            The Magazine
          </h1>
          <p className="page-subtitle">
            Curated physical and digital quarterly editions synthesizing macro architecture, market design, and systemic regulatory investigations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-bar">
          {editions.map((ed) => (
            <button
              key={ed}
              onClick={() => setSelectedEdition(ed)}
              className={`filter-pill ${selectedEdition === ed ? 'active' : ''}`}
            >
              {ed}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <EmptyState
          sectionName="The Magazine"
          categoryName={selectedEdition !== 'Current Edition' ? selectedEdition : undefined}
          title="We are gathering interesting and latest info for you"
          description="The upcoming print volume is currently being bound by our editorial syndicate. In the meantime, read our active digital blog dispatches on market structures and regulatory insights."
          actionText="Explore Published Blogs →"
          actionHref="/blogs"
        />
      </div>
    </div>
  );
}
