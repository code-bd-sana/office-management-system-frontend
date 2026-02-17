"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface LearningPaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export function LearningPagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalRecords,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: LearningPaginationProps) {
  const startRecord = (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, totalRecords);

  return (
    <div className="flex items-center justify-between bg-[#E8EAEE] px-4 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3">
      {/* Left: record range */}
      <p className="text-xs font-medium text-brand-navy sm:text-sm">
        {startRecord}-{endRecord} of {totalRecords}
      </p>

      {/* Right: rows per page + page nav */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-1.5 text-xs text-foreground/70 sm:gap-2 sm:text-sm">
          <span className="hidden xs:inline">Rows per page:</span>
          <span className="xs:hidden">Per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="rounded-sm border border-border/60 bg-white px-1.5 py-0.5 text-xs outline-none focus:ring-1 focus:ring-brand-navy/30 sm:text-sm"
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-border/60 text-foreground/60 transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="min-w-10 text-center text-xs font-medium text-foreground/70 sm:min-w-12 sm:text-sm">
            {currentPage}/{totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-border/60 text-foreground/60 transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
