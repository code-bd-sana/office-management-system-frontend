"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeavePaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export function LeavePagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalRecords,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: LeavePaginationProps) {
  const startRecord = (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, totalRecords);

  return (
    <div className="flex items-center justify-between bg-[#E8EAEE] px-5 py-3 backdrop-blur-sm">
      {/* Left: record range */}
      <p className="text-sm font-medium text-brand-navy">
        {startRecord}-{endRecord} of {totalRecords}
      </p>

      {/* Right: rows per page + page nav */}
      <div className="flex items-center gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="rounded-sm border border-border/60 bg-white px-1.5 py-0.5 text-sm outline-none focus:ring-1 focus:ring-brand-navy/30"
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

          <span className="min-w-12 text-center text-sm font-medium text-foreground/70">
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
