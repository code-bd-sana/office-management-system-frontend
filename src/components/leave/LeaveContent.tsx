"use client";

import { LEAVE_DESCRIPTION } from "@/constants/leave";
import { LeaveTable } from "./LeaveTable";
import { LeavePageHeader } from "./LeavePageHeader";
import { useState } from "react";
import { AddLeaveRequestModal } from "./AddLeaveRequestModal";

export function LeaveContent() {
  const [isAddLeaveRequestOpen, setIsAddLeaveRequestOpen] = useState(false);

  return (
    <div className="space-y-6">

      {/* Header: description + Add Task button */}
      <LeavePageHeader onAddLeaveRequest={() => setIsAddLeaveRequestOpen(true)} />

      {/* Add Task Modal */}
      <AddLeaveRequestModal open={isAddLeaveRequestOpen} onOpenChange={setIsAddLeaveRequestOpen} />
      
      {/* Table */}
      <LeaveTable />
    </div>
  );
}
