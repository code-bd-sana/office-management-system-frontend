"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
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
import { TeamMembersRow } from "./TeamMembersRow";
import {
  DEMO_TEAM_MEMBERS,
  TEAM_MEMBER_TABLE_COLUMNS,
  TEAM_MEMBER_ROLES,
  TEAM_MEMBERS_TOTAL_RECORDS,
} from "@/constants/team";
import type { TeamMember } from "@/types/team";

export function TeamMembersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedMembers = DEMO_TEAM_MEMBERS.slice(startIndex, endIndex);
  const totalPages = Math.ceil(TEAM_MEMBERS_TOTAL_RECORDS / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="rounded-sm bg-white shadow-sm">
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border/40 p-4">
        {/* Left: Filter Icon + Search */}
        <div className="flex items-center gap-3">
          <Image
            src="/icons/filter-icons.png"
            alt="Filter"
            width={20}
            height={20}
          />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-sm border-border/60 pl-9 pr-3 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right: Role Dropdown */}
        <div className="flex items-center gap-2 border-border/60 rounded-sm border px-3 py-1">
          <span className="text-sm font-medium text-foreground/70">Role :</span>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="h-9 w-35 border-none bg-none text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAM_MEMBER_ROLES.map((role) => (
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
              <TableHead className="h-11 pl-5 font-semibold text-foreground/80">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  aria-label="Select all"
                />
              </TableHead>
              {TEAM_MEMBER_TABLE_COLUMNS.map((column) => (
                <TableHead
                  key={column}
                  className={`h-11 whitespace-nowrap font-semibold text-foreground/80 ${
                    column === "TOTAL PROJECTS" || column === "COMPLETED PROJECTS"
                      ? "text-center"
                      : ""
                  } ${column === "ACTION" ? "pr-5" : ""}`}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedMembers.map((member: TeamMember, index: number) => (
              <TeamMembersRow
                key={member.id}
                member={member}
                rowNumber={startIndex + index + 1}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between rounded-b-sm bg-[#E8EAEE] px-5 py-3">
        {/* Left: Rows count display */}
        <div className="text-sm text-foreground/70">
          {startIndex + 1}-{Math.min(endIndex, TEAM_MEMBERS_TOTAL_RECORDS)} of{" "}
          {TEAM_MEMBERS_TOTAL_RECORDS}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-4">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/70">Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-17.5 rounded-sm border-border/60 bg-white text-sm">
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

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
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
  );
}
