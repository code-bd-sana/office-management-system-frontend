import { LeaveRequestSingle } from "./RequestSingle";

export function LeaveRequests() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-4 sm:mb-6">
        <button className="w-full rounded-sm border border-gray-300 bg-white px-4 py-2 text-xs font-medium hover:bg-gray-100 sm:w-auto sm:text-sm">
          Mark All as Read
        </button>
      </div>

      <LeaveRequestSingle />
      <LeaveRequestSingle />
    </div>
  );
}
