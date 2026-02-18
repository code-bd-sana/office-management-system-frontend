"use client";

import { useState } from "react";
import { ArrowUpDown, Funnel, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PerformanceMemberRow } from "./PerformanceMemberRow";
import { LearningPagination } from "@/components/learning/LearningPagination";
import {
  DEMO_PERFORMANCE_MEMBERS,
  PERFORMANCE_TABLE_COLUMNS,
  PERFORMANCE_ROWS_PER_PAGE_OPTIONS,
  PERFORMANCE_TOTAL_RECORDS,
  PERFORMANCE_ROLE_OPTIONS,
} from "@/constants/performance";

export function PerformanceMembersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const totalPages = Math.ceil(PERFORMANCE_TOTAL_RECORDS / rowsPerPage);

  const filteredMembers = DEMO_PERFORMANCE_MEMBERS.filter((m) => {
    const matchesSearch =
      !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "All Roles" || m.designation === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="mt-4 overflow-hidden rounded-sm sm:mt-6">
      <h3 className="mb-3 text-base font-semibold text-foreground sm:text-lg">
        Team Members Performance
      </h3>

      <div className="overflow-hidden rounded-sm border border-border/40">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 sm:px-5 sm:py-4">
          {/* Left: filter + search */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-sm border border-gray-400 bg-white p-2">
              <Funnel className="h-4 w-4 text-muted-foreground" />
            </span>
            <div className="relative w-36 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm border border-gray-300 bg-white pl-9 pr-3 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Right: role dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm text-foreground/70 outline-none focus:ring-1 focus:ring-brand-navy/30"
            >
              {PERFORMANCE_ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  Role : {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0 bg-[#E7EFFF]">
                {PERFORMANCE_TABLE_COLUMNS.map((col) => (
                  <TableHead
                    key={col}
                    className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400 first:pl-5"
                  >
                    <span className="flex items-center gap-1">
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
              {filteredMembers.map((member, idx) => (
                <PerformanceMemberRow
                  key={member.id}
                  member={member}
                  rowNumber={(currentPage - 1) * rowsPerPage + idx + 1}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <LearningPagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRecords={PERFORMANCE_TOTAL_RECORDS}
          rowsPerPageOptions={PERFORMANCE_ROWS_PER_PAGE_OPTIONS}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
