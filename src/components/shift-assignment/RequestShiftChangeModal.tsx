"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface RequestShiftChangeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function RequestShiftChangeModal({
  open,
  onClose,
  onSubmit,
}: RequestShiftChangeModalProps) {
  const [originalShift, setOriginalShift] = useState("");
  const [requestedShift, setRequestedShift] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    // TODO: Implement submit request
    console.log("Submit shift change request:", {
      originalShift,
      requestedShift,
      reason,
    });
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-xl p-0">
        <DialogTitle className="sr-only">Request Shift Change</DialogTitle>
        <DialogDescription className="sr-only">
          Submit a request to change your shift assignment
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="text-xl font-semibold text-foreground">
            Request Shift Change
          </h2>
          <button
            onClick={onClose}
            className="rounded-sm p-1.5 hover:bg-muted transition-colors"
          >
            {/* <X className="h-5 w-5" /> */}
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-6 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#044192] text-sm font-semibold text-white">
            RD
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Robbi Darwis
            </h3>
            <p className="text-xs text-muted-foreground">
              Employee ID: Dp 1033
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 px-6 pb-6">
          {/* Original Shift */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Original Shift <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={originalShift}
              onChange={(e) => setOriginalShift(e.target.value)}
              placeholder="Enter your date"
              className="rounded-sm"
            />
          </div>

          {/* Requested Shift */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Requested Shift <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={requestedShift}
              onChange={(e) => setRequestedShift(e.target.value)}
              placeholder="Enter your date"
              className="rounded-sm"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason for requested"
              rows={4}
              className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="rounded-sm bg-[#044192] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#033174]"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
