"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddTrainingResourceForm } from "./AddTrainingResourceForm";

interface AddTrainingResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTrainingResourceModal({ open, onOpenChange }: AddTrainingResourceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-sm border-0 p-6 shadow-xl sm:max-w-180">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold text-foreground">
            Add Training Resource
          </DialogTitle>
        </DialogHeader>

        <AddTrainingResourceForm onSubmit={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
