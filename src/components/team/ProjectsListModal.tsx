"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectsModalTable } from "@/components/project/ProjectsModalTable";

interface ProjectsListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName?: string;
}

export function ProjectsListModal({ open, onOpenChange, memberName }: ProjectsListModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto gap-0 p-0 sm:max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <DialogTitle className="text-lg font-semibold text-foreground sm:text-xl">
            Projects Lists
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
          </button>
        </div>
        <DialogDescription className="sr-only">
          {memberName
            ? `View all projects assigned to ${memberName}`
            : "View all projects for this team member"}
        </DialogDescription>

        {/* Content */}
        <div className="overflow-hidden">
          <div className="px-4 py-3 sm:px-6 sm:py-4">
            <ProjectsModalTable />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
