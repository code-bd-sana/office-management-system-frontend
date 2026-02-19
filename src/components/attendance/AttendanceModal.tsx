"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AttendanceModalTable } from "./AttendanceModalTable";
import { TODAY_ATTENDANCE } from "@/constants/attendance";
import { X } from "lucide-react";

interface AttendanceModalProps {
  open: boolean;
  onClose: () => void;
}

export function AttendanceModal({ open, onClose }: AttendanceModalProps) {
  const handleCheckIn = () => {
    // TODO: Implement check-in functionality
    console.log("Check In clicked");
  };

  const handleCheckOut = () => {
    // TODO: Implement check-out functionality
    console.log("Check Out clicked");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[85vh] w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">My Attendance</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your attendance records
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            My Attendance
          </h2>
          <button
            onClick={onClose}
            className="rounded-sm p-1.5 hover:bg-muted transition-colors"
          >
            {/* <X className="h-5 w-5" /> */}
          </button>
        </div>

        {/* Today's Attendance Info Section */}
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Date and Check-in Info */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
              <div>
                <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                  Today: {TODAY_ATTENDANCE.date} ({TODAY_ATTENDANCE.dayOfWeek})
                </h3>
              </div>
              {TODAY_ATTENDANCE.checkedInAt && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground/70 sm:text-sm">
                    Checked in at:
                  </span>
                  <span className="text-xs font-semibold text-foreground sm:text-sm">
                    {TODAY_ATTENDANCE.checkedInAt}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={handleCheckIn}
                disabled={!!TODAY_ATTENDANCE.checkedInAt}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#14804A] px-4 py-2 text-xs font-medium text-white hover:bg-[#14804A]/90 disabled:opacity-50 sm:flex-none sm:px-6 sm:text-sm"
              >
                <Image
                  src="/icons/tick-icons.png"
                  alt="Check In"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Check In
              </Button>
              <Button
                onClick={handleCheckOut}
                disabled={
                  !TODAY_ATTENDANCE.checkedInAt ||
                  !!TODAY_ATTENDANCE.checkedOutAt
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#DC3545] px-4 py-2 text-xs font-medium text-white hover:bg-[#DC3545]/90 disabled:opacity-50 sm:flex-none sm:px-6 sm:text-sm"
              >
                <Image
                  src="/icons/checkout-icons.png"
                  alt="Check Out"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Check Out
              </Button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-4">
          <AttendanceModalTable />
        </div>
      </DialogContent>
    </Dialog>
  );
}
