"use client";

import {
  ATTENDANCE_DESCRIPTION,
  DEMO_ATTENDANCE_RECORDS,
  TODAY_ATTENDANCE,
} from "@/constants/attendance";
import { AttendanceTable, ColumnDef } from "./AttendanceTable";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AttendanceRecord } from "@/types/attendance";
import { AttendanceTableRow } from "./AttendanceTableRow";

const COLUMNS: ColumnDef[] = [
  { key: "#", label: "#" },
  { key: "date", label: "DATE" },
  { key: "day", label: "DAY" },
  { key: "checkIn", label: "CHECK-IN" },
  { key: "checkOut", label: "CHECK-OUT" },
  { key: "status", label: "STATUS" },
];

export function AttendanceContent() {
  const handleCheckIn = () => {
    // TODO: Implement check-in functionality
    console.log("Check In clicked");
  };

  const handleCheckOut = () => {
    // TODO: Implement check-out functionality
    console.log("Check Out clicked");
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-base pr-0 leading-relaxed text-muted-foreground/80 sm:text-xl sm:pr-8 md:text-2xl">
        {ATTENDANCE_DESCRIPTION}
      </p>

      {/* Today's Attendance Info Section */}
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
                Today: {TODAY_ATTENDANCE.date} ({TODAY_ATTENDANCE.dayOfWeek})
              </h3>
            </div>
            {TODAY_ATTENDANCE.checkedInAt && (
              <div className="flex items-center gap-2">
                <span className="text-foreground/70">Checked in at:</span>
                <span className="font-semibold text-foreground">
                  {TODAY_ATTENDANCE.checkedInAt}
                </span>
              </div>
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#14804A] px-4 py-2 text-xs font-medium text-white hover:bg-[#14804A]/90 disabled:opacity-50 sm:flex-none sm:px-6 sm:text-sm">
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
              disabled={
                !TODAY_ATTENDANCE.checkedInAt || !!TODAY_ATTENDANCE.checkedOutAt
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

      {/* Table */}
      <AttendanceTable
        data={DEMO_ATTENDANCE_RECORDS}
        columns={COLUMNS}
        totalRecords={DEMO_ATTENDANCE_RECORDS.length}
        enableSearch={false}
        enableCheckboxes={false}
        renderRow={(record: AttendanceRecord) => (
          <AttendanceTableRow key={record.rowNumber} record={record} />
        )}
      />

      {/* summary */}
      <div className="flex flex-wrap gap-y-1 items-center text-xs text-gray-600 sm:text-sm">
        <div className="flex flex-wrap gap-x-1 gap-y-1">
          Total:
          <span className="text-green-600 font-medium ml-1">12 Present</span>,
          <span className="text-orange-600 font-medium ml-1">2 Absent</span>,
          <span className="text-purple-600 font-medium ml-1">1 Exchange</span>,
          <span className="text-red-600 font-medium ml-1">1 Late</span>,
          <span className="text-blue-600 font-medium ml-1">2 Leave</span>
          <span className="ml-2 text-blue-600 font-medium sm:ml-4">
            Work Days: 18
          </span>
        </div>
      </div>
    </div>
  );
}
