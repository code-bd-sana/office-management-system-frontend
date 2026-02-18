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
import { LeaveTableRow } from "./LeaveTableRow";
import { LeavePagination } from "./LeavePagination";
import {
  DEMO_LEAVE_RECORDS,
  LEAVE_ROWS_PER_PAGE_OPTIONS,
  LEAVE_TABLE_COLUMNS,
  LEAVE_TOTAL_RECORDS,
} from "@/constants/leave";

export function LeaveTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(LEAVE_TOTAL_RECORDS / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden rounded-sm">
      {/* Table */}
      <div className="overflow-x-auto rounded-t-sm border border-b-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0 bg-[#E7EFFF]">
              {LEAVE_TABLE_COLUMNS.map((col) => (
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
            {DEMO_LEAVE_RECORDS.map((record) => (
              <LeaveTableRow key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </div>

      <LeavePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRecords={LEAVE_TOTAL_RECORDS}
        rowsPerPageOptions={LEAVE_ROWS_PER_PAGE_OPTIONS}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
