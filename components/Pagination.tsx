'use client';

import Link from 'next/link';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  scrollTargetId: string;
  /** Client-side paging (used while a filter is active). */
  onPageChange?: (page: number) => void;
  /** Crawlable paging: each page is a real URL such as /news/page/2. Takes precedence over onPageChange. */
  hrefForPage?: (page: number) => string;
}

export default function Pagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  hrefForPage,
  scrollTargetId,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems === 0) return null;

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  function changePage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;

    onPageChange?.(page);
    document.getElementById(scrollTargetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function control(page: number, label: string, ariaLabel: string, extra: { active?: boolean } = {}) {
    const disabled = page < 1 || page > totalPages || (page === currentPage && !extra.active);
    const className = `page-btn${extra.active ? ' active' : ''}`;
    const ariaCurrent = extra.active ? 'page' as const : undefined;

    if (hrefForPage) {
      if (disabled || extra.active) {
        return (
          <span key={`${label}-${page}`} className={className} aria-current={ariaCurrent} aria-disabled={disabled || undefined}>
            {label}
          </span>
        );
      }
      return (
        <Link
          key={`${label}-${page}`}
          href={hrefForPage(page)}
          className={className}
          aria-label={ariaLabel}
          rel={page === currentPage - 1 ? 'prev' : page === currentPage + 1 ? 'next' : undefined}
        >
          {label}
        </Link>
      );
    }

    return (
      <button
        key={`${label}-${page}`}
        type="button"
        className={className}
        onClick={() => changePage(page)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {label}
      </button>
    );
  }

  return (
    <nav className="pagination-bar" aria-label="Pagination">
      <span style={{ color: 'var(--ink-muted)' }}>
        Showing {firstItem}–{lastItem} of {totalItems}
      </span>
      <div className="pagination-pages">
        {control(currentPage - 1, 'Previous', 'Go to previous page')}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return control(page, String(page), `Go to page ${page}`, { active: page === currentPage });
        })}
        {control(currentPage + 1, 'Next', 'Go to next page')}
      </div>
    </nav>
  );
}
