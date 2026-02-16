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
import { ATTENDANCE_TABLE_COLUMNS, ATTENDANCE_TOTAL_RECORDS, ATTENDANCE_ROWS_PER_PAGE_OPTIONS, DEMO_ATTENDANCE_RECORDS } from "@/constants/attendance";
import { AttendanceTableRow } from "./AttendanceTableRow";
import { AttendancePagination } from "./AttendancePagination";

export function AttendanceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(ATTENDANCE_TOTAL_RECORDS / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden rounded-sm ">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-b-0 bg-[#E7EFFF]">
            {ATTENDANCE_TABLE_COLUMNS.map((col) => (
              <TableHead
                key={col}
                className="py-3 text-xs font-bold uppercase tracking-wider text-gray-400 first:pl-5"
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
          {DEMO_ATTENDANCE_RECORDS.map((record) => (
            <AttendanceTableRow key={record.id} record={record} />
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <AttendancePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRecords={ATTENDANCE_TOTAL_RECORDS}
        rowsPerPageOptions={ATTENDANCE_ROWS_PER_PAGE_OPTIONS}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
