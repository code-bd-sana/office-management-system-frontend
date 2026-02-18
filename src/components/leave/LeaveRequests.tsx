import { LeaveRequestSingle } from "./RequestSingle";

export function LeaveRequests() {
  return (
    <div className="space-y-6 ml-4 ">
      <div className="flex items-center justify-end mb-6">
        <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-100">
          Mark All as Read
        </button>
      </div>

      <LeaveRequestSingle />
      <LeaveRequestSingle />

    </div>
  );
}
