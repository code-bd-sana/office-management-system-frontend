import type { AttendanceRecord, TodayAttendance } from "@/types/attendance";

export const ATTENDANCE_DESCRIPTION = "Check In and Check Out your daily attendance . Track your attendance records and view your daily attendance history conveniently.";

export const DEMO_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 27, 2026",
    day: "Saturday",
    checkIn: "9:00 AM",
    checkOut: "6:00 PM",
    status: "present",
  },
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 28, 2026",
    day: "Sunday",
    checkIn: "9:05 AM",
    checkOut: "6:30 PM",
    status: "late",
  },
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 29, 2026",
    day: "Monday",
    checkIn: "-",
    checkOut: "-",
    status: "leave",
  },
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 29, 2026",
    day: "Tuesday",
    checkIn: "9:30 AM",
    checkOut: "-",
    status: "absent",
  },
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 29, 2026",
    day: "Tuesday",
    checkIn: "-",
    checkOut: "-",
    status: "exchange",
  },
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 27, 2026",
    day: "Saturday",
    checkIn: "9:00 AM",
    checkOut: "6:00 PM",
    status: "present",
  },
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 28, 2026",
    day: "Sunday",
    checkIn: "9:05 AM",
    checkOut: "6:30 PM",
    status: "late",
  },
];

export const ATTENDANCE_TABLE_COLUMNS = [
  "#",
  "DATE",
  "DAY",
  "CHECK-IN",
  "CHECK-OUT",
  "STATUS",
] as const;

export const ATTENDANCE_ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export const ATTENDANCE_TOTAL_RECORDS = 97;

export const TODAY_ATTENDANCE: TodayAttendance = {
  date: "Jan 27, 2026",
  dayOfWeek: "Tuesday",
  checkedInAt: "09:30 AM",
  checkedOutAt: null,
};