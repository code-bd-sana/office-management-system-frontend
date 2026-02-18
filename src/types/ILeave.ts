export type ILeaveStatus = "Approved" | "Rejected" | "Pending";

export interface ILeave {
  id: string;
  rowNumber: number;
  leaveType: string;
  from: string;
  to: string;
  duration: string;
  status: ILeaveStatus;
}


