"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface ShiftUserInfoProps {
  currentMonth: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function ShiftUserInfo({ currentMonth, onPrevMonth, onNextMonth }: ShiftUserInfoProps) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-sm p-4">
      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* User Avatar with Initials */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#044192] text-sm font-semibold text-white">
          RD
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Robbi Darwis
          </h3>
          <p className="text-xs text-muted-foreground">
            Employee-ID: Dp-1033
          </p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center border rounded-sm py-1">
        <button
          onClick={onPrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-muted transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-24 text-center text-sm font-medium text-foreground">
          {MONTHS[currentMonth]}
        </span>
        <button
          onClick={onNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-muted transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
