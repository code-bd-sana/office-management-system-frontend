"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddTaskForm } from "./AddTaskForm";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreated?: () => void;
}

export function AddTaskModal({ open, onOpenChange, onTaskCreated }: AddTaskModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg rounded-sm border-0 p-4 shadow-xl sm:max-w-180 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold text-foreground">
            Add Task
          </DialogTitle>
        </DialogHeader>

        <AddTaskForm
          onSubmit={() => {
            onOpenChange(false);
            onTaskCreated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
