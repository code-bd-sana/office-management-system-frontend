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

export function AddTrainingResourceModal({
  open,
  onOpenChange,
}: AddTrainingResourceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto rounded-sm border-0 p-4 shadow-xl sm:max-w-2xl sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-bold text-foreground sm:text-xl">
            Add Training Resource
          </DialogTitle>
        </DialogHeader>

        <AddTrainingResourceForm onSubmit={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
