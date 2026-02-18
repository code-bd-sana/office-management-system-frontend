"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DCR_VIEW_DETAILS_TABLE_COLUMNS } from "@/constants/dcr-review";
import type { DcrCompletedTask } from "@/types/dcr-review";

interface DcrTaskTableProps {
  tasks: DcrCompletedTask[];
}

export function DcrTaskTable({ tasks }: DcrTaskTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(tasks.map((t) => t.id)));
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

  const allChecked = tasks.length > 0 && tasks.every((t) => selectedRows.has(t.id));

  return (
    <div className="rounded-sm border border-border/40 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40 bg-[#E7EFFF] hover:bg-[#E7EFFF]">
              {DCR_VIEW_DETAILS_TABLE_COLUMNS.map((column, idx) => (
                <TableHead
                  key={column}
                  className={`h-11 whitespace-nowrap text-xs font-semibold text-foreground/80 sm:text-sm ${
                    idx === 0 ? "pl-3 sm:pl-5" : ""
                  } ${column === "VALUE" ? "pr-3 text-right sm:pr-5" : ""}`}
                >
                  {idx === 0 ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-[#044192]"
                        aria-label="Select all tasks"
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
            {tasks.map((task, index) => (
              <TableRow key={task.id} className="border-b border-border/40 hover:bg-muted/30">
                {/* Checkbox + Row Number */}
                <TableCell className="whitespace-nowrap py-3 pl-3 sm:py-3.5 sm:pl-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(task.id)}
                      onChange={(e) => handleRowCheck(task.id, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 accent-[#044192]"
                      aria-label={`Select task ${index + 1}`}
                    />
                    <span className="text-sm font-medium text-foreground/70">{index + 1}</span>
                  </div>
                </TableCell>

                {/* Task */}
                <TableCell className="max-w-50 py-3 text-xs text-foreground/70 sm:max-w-75 sm:py-3.5 sm:text-sm">
                  <span className="line-clamp-2">{task.task}</span>
                </TableCell>

                {/* Order ID */}
                <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
                  {task.orderId}
                </TableCell>

                {/* Client */}
                <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
                  {task.client}
                </TableCell>

                {/* Profile */}
                <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
                  {task.profile}
                </TableCell>

                {/* Value */}
                <TableCell className="whitespace-nowrap py-3 pr-3 text-right text-xs font-semibold text-foreground sm:py-3.5 sm:pr-5 sm:text-sm">
                  {task.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
