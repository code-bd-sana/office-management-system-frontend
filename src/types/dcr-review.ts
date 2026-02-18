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

/** A completed task entry in DCR view details */
export interface DcrCompletedTask {
  id: string;
  task: string;
  orderId: string;
  client: string;
  profile: string;
  value: string;
}

/** An attachment in DCR view details */
export interface DcrAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
}

/** Leader feedback entry */
export interface DcrFeedback {
  id: string;
  content: string;
  timeAgo: string;
}

/** Full DCR view details data */
export interface DcrViewDetails {
  memberId: string;
  memberName: string;
  employeeId: string;
  avatar?: string;
  tasks: DcrCompletedTask[];
  attachments: DcrAttachment[];
  feedback: DcrFeedback | null;
}
