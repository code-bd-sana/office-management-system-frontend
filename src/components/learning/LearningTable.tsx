"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LearningTableRow } from "./LearningTableRow";
import { LearningPagination } from "./LearningPagination";
import {
  DEMO_LEARNING_RECORDS,
  LEARNING_TABLE_COLUMNS,
  LEARNING_ROWS_PER_PAGE_OPTIONS,
  LEARNING_TOTAL_RECORDS,
} from "@/constants/learning";

export function LearningTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(LEARNING_TOTAL_RECORDS / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden rounded-sm">
      {/* Table with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 bg-[#E7EFFF]">
              {LEARNING_TABLE_COLUMNS.map((col) => (
                <TableHead
                  key={col}
                  className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400 first:pl-5"
                >
                  <span className="flex items-center gap-1.5">
                    {col}
                    {col === "#" && (
                      <ArrowUpDown className="h-3 w-3 text-brand-navy/40" />
                    )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO_LEARNING_RECORDS.map((record) => (
              <LearningTableRow key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <LearningPagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRecords={LEARNING_TOTAL_RECORDS}
        rowsPerPageOptions={LEARNING_ROWS_PER_PAGE_OPTIONS}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
