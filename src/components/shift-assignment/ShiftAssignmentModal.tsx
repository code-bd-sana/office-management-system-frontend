"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShiftAssignmentContent } from "./ShiftAssignmentContent";
import { X } from "lucide-react";

interface ShiftAssignmentModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShiftAssignmentModal({
  open,
  onClose,
}: ShiftAssignmentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] min-w-6xl overflow-y-auto p-0">
        <DialogTitle className="sr-only">Shift Assignment</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your shift assignments
        </DialogDescription>

        {/* Header with title and close */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            Shift Assignment
          </h2>
          <button
            onClick={onClose}
            className="rounded-sm p-1.5 hover:bg-muted transition-colors"
          >
            {/* <X className="h-5 w-5" /> */}
          </button>
        </div>

        {/* Reuse the same content from shift assignment page */}
        <div className="px-6 pb-6 pt-2">
          <ShiftAssignmentContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
