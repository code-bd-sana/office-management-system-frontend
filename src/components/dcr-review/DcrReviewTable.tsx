"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DcrReviewRow } from "./DcrReviewRow";
import {
  DEMO_DCR_REVIEW_MEMBERS,
  DCR_REVIEW_TABLE_COLUMNS,
  DCR_REVIEW_ROLES,
  DCR_REVIEW_TOTAL_RECORDS,
} from "@/constants/dcr-review";
import type { DcrReviewMember } from "@/types/dcr-review";

export function DcrReviewTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Calculate pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedMembers = DEMO_DCR_REVIEW_MEMBERS.slice(startIndex, endIndex);
  const totalPages = Math.ceil(DCR_REVIEW_TOTAL_RECORDS / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(displayedMembers.map((m) => m.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowCheck = (id: string, checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const allChecked = displayedMembers.length > 0 && displayedMembers.every((m) => selectedRows.has(m.id));

  return (
    <div>
      <div className="rounded-sm bg-white shadow-sm">
        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border/40 p-3 sm:gap-4 sm:p-4">
          {/* Left: Filter Icon + Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/icons/filter-icons.png"
              alt="Filter"
              width={20}
              height={20}
              className="hidden sm:block"
            />
            <div className="relative w-32 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm border-border/60 pl-9 pr-3 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Right: Role Dropdown */}
          <div className="flex items-center gap-2 rounded-sm border border-border/60 px-2 py-1 sm:px-3">
            <span className="text-xs font-medium text-foreground/70 sm:text-sm">Role :</span>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="h-9 w-24 border-none bg-none text-xs sm:w-35 sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DCR_REVIEW_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/40 bg-[#E7EFFF] hover:bg-[#E7EFFF]">
                {DCR_REVIEW_TABLE_COLUMNS.map((column, idx) => (
                  <TableHead
                    key={column}
                    className={`h-11 whitespace-nowrap text-xs font-semibold text-foreground/80 sm:text-sm ${
                      idx === 0 ? "pl-3 sm:pl-5" : ""
                    } ${column === "ACTION" ? "pr-3 sm:pr-5" : ""}`}
                  >
                    {idx === 0 ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 accent-[#044192]"
                          aria-label="Select all rows"
                        />
                        <span>{column}</span>
                      </div>
                    ) : (
                      column
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedMembers.map((member: DcrReviewMember, index: number) => (
                <DcrReviewRow
                  key={member.id}
                  member={member}
                  rowNumber={startIndex + index + 1}
                  checked={selectedRows.has(member.id)}
                  onCheckChange={(checked) => handleRowCheck(member.id, checked)}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between rounded-b-sm bg-[#E8EAEE] px-3 py-3 sm:px-5">
          {/* Left: Rows count display */}
          <div className="text-xs text-foreground/70 sm:text-sm">
            {startIndex + 1}-{Math.min(endIndex, DCR_REVIEW_TOTAL_RECORDS)} of{" "}
            {DCR_REVIEW_TOTAL_RECORDS}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Rows per page selector */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="hidden text-sm text-foreground/70 sm:inline">Rows per page:</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-14 rounded-sm border-border/60 bg-white text-xs sm:w-17.5 sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page indicator */}
            <span className="text-xs text-foreground/70 sm:text-sm">
              {currentPage}/{totalPages}
            </span>

            {/* Navigation buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-sm hover:bg-white/50 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-sm hover:bg-white/50 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
