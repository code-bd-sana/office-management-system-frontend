import { ATTENDANCE_DESCRIPTION } from "@/constants/attendance";
import { AttendanceTable } from "./AttendanceTable";
import { Calendar, CheckCircle, PowerCircle, PowerOff } from "lucide-react";

export function AttendanceContent() {
  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-2xl pr-8 leading-relaxed text-muted-foreground/80">
        {ATTENDANCE_DESCRIPTION}
      </p>

      <div>
        <div className="flex flex-wrap items-center justify-between mb-2">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">
              <Calendar className="inline-block mr-2" />
              Today : Jan 27, 2026 (Tuesday)
            </span>
            <span className="ml-6">
              Checked in at : <span className="font-medium">09:30 AM</span>
            </span>
          </div>

          <div className="flex gap-3 mt-3 sm:mt-0">
            <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700">
              <CheckCircle className="inline-block mr-2" />
              Check In
            </button>
            <button className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600">
              <PowerCircle className="inline-block mr-2" />
              Check Out
            </button>
          </div>
        </div>
      </div>
      {/* Table */}
      <AttendanceTable />

      {/* summary */}
      <div className="flex justify-between items-center text-sm text-gray-600 ">
        <div>
          Total :
          <span className="text-green-600 font-medium ml-1">12 Present</span>,
          <span className="text-orange-600 font-medium ml-1">2 Absent</span>,
          <span className="text-purple-600 font-medium ml-1">1 Exchange</span>,
          <span className="text-red-600 font-medium ml-1">1 Late</span>,
          <span className="text-blue-600 font-medium ml-1">2 Leave</span>
          <span className="ml-4 text-blue-600 font-medium">Work Days : 18</span>
        </div>
      </div>
    </div>
  );
}
