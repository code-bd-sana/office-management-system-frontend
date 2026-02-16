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
      <DialogContent className="min-w-4xl p-0">
        <DialogTitle className="sr-only">My Attendance</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your attendance records
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
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
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Date and Check-in Info */}
            <div className="flex items-center gap-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Today: {TODAY_ATTENDANCE.date} ({TODAY_ATTENDANCE.dayOfWeek})
                </h3>
              </div>
              {TODAY_ATTENDANCE.checkedInAt && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/70">
                    Checked in at:
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {TODAY_ATTENDANCE.checkedInAt}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleCheckIn}
                disabled={!!TODAY_ATTENDANCE.checkedInAt}
                className="flex items-center gap-2 rounded-sm bg-[#14804A] px-6 py-2 text-sm font-medium text-white hover:bg-[#14804A]/90 disabled:opacity-50"
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
                disabled={!TODAY_ATTENDANCE.checkedInAt || !!TODAY_ATTENDANCE.checkedOutAt}
                className="flex items-center gap-2 rounded-sm bg-[#DC3545] px-6 py-2 text-sm font-medium text-white hover:bg-[#DC3545]/90 disabled:opacity-50"
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
        <div className="px-6 pb-6 pt-4">
          <AttendanceModalTable />
        </div>
      </DialogContent>
    </Dialog>
  );
}
