'use client';
import { useState } from 'react';

interface Props {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryPills({ categories, active, onChange }: Props) {
  return (
    <div className="category-pills">
      {categories.map(cat => (
        <button
          key={cat}
          className={`pill ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
