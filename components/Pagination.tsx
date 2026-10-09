'use client';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  scrollTargetId: string;
}

export default function Pagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  scrollTargetId,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems === 0) return null;

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  function changePage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;

    onPageChange(page);
    document.getElementById(scrollTargetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <nav className="pagination-bar" aria-label="Pagination">
      <span style={{ color: 'var(--ink-muted)' }}>
        Showing {firstItem}–{lastItem} of {totalItems}
      </span>
      <div className="pagination-pages">
        <button
          type="button"
          className="page-btn"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              type="button"
              className={`page-btn${currentPage === page ? ' active' : ''}`}
              onClick={() => changePage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          className="page-btn"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
