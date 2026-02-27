"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TodayAttendance } from "@/types/attendance";

interface TodayAttendanceCardProps {
  todayAttendance: TodayAttendance;
  actionLoading: "checkin" | "checkout" | null;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function TodayAttendanceCard({
  todayAttendance,
  actionLoading,
  onCheckIn,
  onCheckOut,
}: TodayAttendanceCardProps) {
  return (
    <div className="px-3 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Date and Check-in Info */}
        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-6 sm:text-base">
          <div>
            <h3 className="font-semibold text-foreground flex items-center">
              <Image
                src="/icons/schedule.png"
                alt="Check In"
                width={28}
                height={24}
                className="mr-2"
              />
              Today: {todayAttendance.date} ({todayAttendance.dayOfWeek})
            </h3>
          </div>
          {todayAttendance.checkedInAt && (
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Checked in at:</span>
              <span className="font-semibold text-foreground">
                {todayAttendance.checkedInAt}
              </span>
            </div>
          )}
          {todayAttendance.checkedOutAt && (
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Checked out at:</span>
              <span className="font-semibold text-foreground">
                {todayAttendance.checkedOutAt}
              </span>
            </div>
          )}
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={onCheckIn}
            disabled={!!todayAttendance.checkedInAt || actionLoading !== null}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#14804A] px-4 py-2 text-xs font-medium text-white hover:bg-[#14804A]/90 disabled:opacity-50 sm:flex-none sm:px-6 sm:text-sm"
          >
            {actionLoading === "checkin" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image
                src="/icons/tick-icons.png"
                alt="Check In"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            )}
            Check In
          </Button>
          <Button
            onClick={onCheckOut}
            disabled={
              !todayAttendance.checkedInAt ||
              !!todayAttendance.checkedOutAt ||
              actionLoading !== null
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#DC3545] px-4 py-2 text-xs font-medium text-white hover:bg-[#DC3545]/90 disabled:opacity-50 sm:flex-none sm:px-6 sm:text-sm"
          >
            {actionLoading === "checkout" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image
                src="/icons/checkout-icons.png"
                alt="Check Out"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            )}
            Check Out
          </Button>
        </div>
      </div>
    </div>
  );
}
