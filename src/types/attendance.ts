/** Possible statuses for attendance */
export type AttendanceStatus = "present" | "late" | "absent" | "leave" | "exchange";

/** A single attendance record */
export interface AttendanceRecord {
  id: string;
  rowNumber: number;
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

/** Today's attendance info */
export interface TodayAttendance {
  date: string;
  dayOfWeek: string;
  checkedInAt: string | null;
  checkedOutAt: string | null;
}
