"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface ShiftChangeRequestedBannerProps {
  isVisible: boolean;
  onCancel: () => void;
}

export function ShiftChangeRequestedBanner({ isVisible, onCancel }: ShiftChangeRequestedBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="mb-4 flex items-center justify-between rounded-sm border border-[#F0C36D] bg-[#FFF8E1] px-5 py-4">
      {/* Left: Icon + Text */}
      <div className="flex items-start gap-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground flex gap-2 items-center py-2">
            <TriangleAlert className="h-5 w-5 shrink-0 text-[#E8A317]" /> Shift Change Requested
          </h4>
          <p className="mt-1 text-sm text-foreground/70">
            You have requested to exchange your{" "}
            <span className="font-semibold text-foreground">Morning Shift</span>{" "}
            on{" "}
            <span className="font-semibold text-foreground">
              February 16, 2026
            </span>{" "}
            for an{" "}
            <span className="font-semibold text-foreground">Evening Shift</span>
            . Awaiting manager approval.
          </p>
        </div>
      </div>

      {/* Right: Cancel Request Button */}
      <Button
        onClick={onCancel}
        variant="outline"
        className="shrink-0 rounded-sm bg-[#044192] px-5 py-2 text-sm font-semibold text-white hover:bg-[#044192]/80 hover:text-white"
      >
        Cancel Request
      </Button>
    </div>
  );
}
