"use client";

import { useState } from "react";
import { Search, Upload, ChevronLeft, ChevronRight } from "lucide-react";
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
import { LearningTableRow } from "./LearningTableRow";
import {
  DEMO_LEARNING_RECORDS,
  LEARNING_TABLE_COLUMNS,
  LEARNING_TOTAL_RECORDS,
} from "@/constants/learning";
import { AddTrainingResourceModal } from "./TrainingResourceModal";
import Image from "next/image";

export function LearningTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const totalPages = Math.ceil(LEARNING_TOTAL_RECORDS / rowsPerPage);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="rounded-sm bg-white shadow-sm">
      {/* Filter Bar — matches TeamMembersTable */}
      <div className="flex gap-2 border-b border-border/40 p-3 flex-row items-center justify-between sm:p-4">
        {/* Left: Filter icon + Search */}
        <div className="flex flex-1 items-center gap-2 sm:gap-3">
          <Image
            src="/icons/filter-icons.png"
            alt="Filter"
            width={20}
            height={20}
            className="hidden sm:block"
          />
          <div className="relative flex-1 sm:max-w-64">
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

        {/* Right: Upload Resources button */}
        <Button
          onClick={() => setIsResourceDialogOpen(true)}
          className="w-40 gap-2 rounded-sm bg-green-700 px-5 text-sm text-white hover:bg-green-800 sm:w-auto sm:px-8"
        >
          <Upload className="h-4 w-4" />
          Upload Resources
        </Button>
      </div>

      <AddTrainingResourceModal
        open={isResourceDialogOpen}
        onOpenChange={setIsResourceDialogOpen}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40 bg-[#E7EFFF] hover:bg-[#E7EFFF]">
              {LEARNING_TABLE_COLUMNS.map((col) => (
                <TableHead
                  key={col}
                  className={`h-11 whitespace-nowrap font-semibold text-foreground/80 ${
                    col === "#" ? "pl-3 sm:pl-5" : ""
                  }`}
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO_LEARNING_RECORDS.slice(startIndex, endIndex).map((record) => (
              <LearningTableRow key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination — matches TeamMembersTable */}
      <div className="flex items-center justify-between rounded-b-sm bg-[#E8EAEE] px-3 py-3 sm:px-5">
        {/* Left: record range */}
        <div className="text-xs text-foreground/70 sm:text-sm">
          {startIndex + 1}-{Math.min(endIndex, LEARNING_TOTAL_RECORDS)} of{" "}
          {LEARNING_TOTAL_RECORDS}
        </div>

        {/* Right: rows per page + navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Rows per page */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden text-sm text-foreground/70 sm:inline">
              Rows per page:
            </span>
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
  );
}
