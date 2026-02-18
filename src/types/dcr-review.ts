/** A single DCR review member entry */
export interface DcrReviewMember {
  id: string;
  name: string;
  avatar?: string;
  designation: string;
  shift: string;
  shiftTime: string;
  taskPending: "Completed" | "Pending" | "In Progress";
  dcrSubmission: "Submitted DCR" | "Not Submitted";
  attendance: "Check In" | "Absent" | "On Leave";
}

/** Role filter for DCR review */
export type DcrReviewRole = "all" | "developer" | "designer" | "manager";
