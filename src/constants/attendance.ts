import type { AttendanceRecord, TodayAttendance } from "@/types/attendance";

export const TODAY_ATTENDANCE: TodayAttendance = {
  date: "Jan 27, 2026",
  dayOfWeek: "Tuesday",
  checkedInAt: "09:30 AM",
  checkedOutAt: null,
};

export const DEMO_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: "1",
    rowNumber: 1,
    date: "Jan 25, 2026",
    day: "Saturday",
    checkIn: "09:30 AM",
    checkOut: "06:00 PM",
    status: "late",
  },
  {
    id: "2",
    rowNumber: 2,
    date: "Jan 25, 2026",
    day: "Sunday",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "present",
  },
  {
    id: "3",
    rowNumber: 3,
    date: "Jan 25, 2026",
    day: "Monday",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
  },
  {
    id: "4",
    rowNumber: 4,
    date: "Jan 25, 2026",
    day: "Tuesday",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "present",
  },
  {
    id: "5",
    rowNumber: 5,
    date: "Jan 25, 2026",
    day: "Wednesday",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "present",
  },
  {
    id: "7",
    rowNumber: 7,
    date: "Jan 25, 2026",
    day: "Thursday",
    checkIn: "-",
    checkOut: "-",
    status: "leave",
  },
  {
    id: "8",
    rowNumber: 8,
    date: "Jan 25, 2026",
    day: "Friday",
    checkIn: "-",
    checkOut: "-",
    status: "exchange",
  },
];
