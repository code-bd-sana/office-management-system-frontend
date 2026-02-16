"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TasksModalTable } from "./TasksModalTable";

interface TasksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TasksModal({ open, onOpenChange }: TasksModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl gap-0 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-foreground">Tasks</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            {/* <X className="h-5 w-5" /> */}
          </button>
        </div>
        <DialogDescription className="sr-only">
          View and manage all tasks
        </DialogDescription>

        {/* Content */}
        <div className="overflow-hidden">
          <div className="px-6 py-4">
            <TasksModalTable />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
