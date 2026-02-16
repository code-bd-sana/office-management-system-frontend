import type { ILeave } from "@/types/ILeave";

export const LEAVE_DESCRIPTION = "View your leave balances and request new leaves. Review the details of your upcoming and past leaves";

export const DEMO_LEAVE_RECORDS: ILeave[] = [
  {
    id: "1",
    rowNumber: 1,
    leaveType: "Casual Leave",
    from: "Jan 25, 2026",
    to: "Jan 27, 2026",
    duration: "2 days",
    fileUrl: "#",
    status: "Rejected",
  },
  {
    id: "2",
    rowNumber: 2,
    leaveType: "Sick Leave",
    from: "Feb 10, 2026",
    to: "Feb 12, 2026",
    duration: "3 days",
    fileUrl: "#",
    status: "Approved",
  },
  {
    id: "3",
    rowNumber: 3,
    leaveType: "Earned Leave",
    from: "Mar 15, 2026",
    to: "Mar 20, 2026",
    duration: "5 days",
    fileUrl: "#",
    status: "Pending",
  },
  {
    id: "1",
    rowNumber: 1,
    leaveType: "Casual Leave",
    from: "Jan 25, 2026",
    to: "Jan 27, 2026",
    duration: "2 days",
    fileUrl: "#",
    status: "Rejected",
  },
  {
    id: "2",
    rowNumber: 2,
    leaveType: "Sick Leave",
    from: "Feb 10, 2026",
    to: "Feb 12, 2026",
    duration: "3 days",
    fileUrl: "#",
    status: "Approved",
  },
  {
    id: "3",
    rowNumber: 3,
    leaveType: "Earned Leave",
    from: "Mar 15, 2026",
    to: "Mar 20, 2026",
    duration: "5 days",
    fileUrl: "#",
    status: "Pending",
  },
  {
    id: "3",
    rowNumber: 3,
    leaveType: "Earned Leave",
    from: "Mar 15, 2026",
    to: "Mar 20, 2026",
    duration: "5 days",
    fileUrl: "#",
    status: "Pending",
  }
];

export const LEAVE_TABLE_COLUMNS = [
  "#",
  "LEAVE TYPE",
  "FROM",
  "TO",
  "DURATION",
  "STATUS",
] as const;

export const LEAVE_ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export const LEAVE_TOTAL_RECORDS = 97;
