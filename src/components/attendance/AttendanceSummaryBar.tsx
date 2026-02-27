import type { AttendanceSummary } from "@/types/attendance";

interface AttendanceSummaryBarProps {
  summary: AttendanceSummary;
}

export function AttendanceSummaryBar({ summary }: AttendanceSummaryBarProps) {
  return (
    <div className="flex flex-wrap gap-y-1 items-center text-xs text-gray-600 sm:text-sm">
      <div className="flex flex-wrap gap-x-1 gap-y-1">
        Total:
        <span className="text-green-600 font-medium ml-1">
          {summary.present} Present
        </span>
        ,
        <span className="text-red-600 font-medium ml-1">
          {summary.late} Late
        </span>
        ,
        <span className="text-orange-600 font-medium ml-1">
          {summary.absent} Absent
        </span>
        ,
        <span className="text-blue-600 font-medium ml-1">
          {summary.leave} Leave
        </span>
        ,
        <span className="text-purple-600 font-medium ml-1">
          {summary.exchange} Exchange
        </span>
        ,
        <span className="text-yellow-600 font-medium ml-1">
          {summary.weekend} Weekend
        </span>
        ,
        <span className="text-teal-600 font-medium ml-1">
          {summary.wfh} WFH
        </span>
        <span className="ml-2 text-blue-600 font-medium sm:ml-4">
          Work Days: {summary.workDays}
        </span>
      </div>
    </div>
  );
}
