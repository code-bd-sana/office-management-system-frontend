"use client";

import { useState } from "react";
import { ArrowUpDown, Funnel, Search, Upload } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddTrainingResourceModal } from "./TrainingResourceModal";


export function LearningTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const totalPages = Math.ceil(LEARNING_TOTAL_RECORDS / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const onAddTrainingResource = () => {
    setIsResourceDialogOpen(true);
  };

  return (
    <div className="overflow-hidden rounded-sm">
      <div className="overflow-x-auto">
        <div className="table-header flex justify-between items-center bg-[#E7EFFF] px-5">
          {/* Left: Filter Icon + Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="bg-white border border-gray-400 p-2 rounded-xs">
              <Funnel className="h-4 w-4 text-muted-foreground " />
            </span>
            <div className="relative w-32 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-sm border-border/60 pl-9 pr-3 bg-white border border-gray-400 text-sm  focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="actions py-6">
            <Button 
              onClick={onAddTrainingResource}
              className="bg-green-700 hover:bg-green-800 text-white  flex items-center gap-2 py-4 px-10 rounded-xs">
              <Upload />
              Upload Resources
            </Button>
          </div>
        </div>

        <AddTrainingResourceModal open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen} />

        {/* Table with horizontal scroll on mobile */}
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
