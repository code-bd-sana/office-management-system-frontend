import { AttendanceByAuthorityDto } from "@/api/models/AttendanceByAuthorityDto";
import type {
  ApiAttendanceRecord,
  AttendanceRecord,
  AttendanceStatus,
  AttendanceSummary,
  TodayAttendance,
} from "@/types/attendance";
import type { ColumnDef } from "./AttendanceTable";

/* ── Shared types ────────────────────────────────────────── */
export interface UserOption {
  _id: string;
  name: string;
  employeeId: string;
}

/* ── Constants ───────────────────────────────────────────── */
export const PRIVILEGED_ROLES = ["TEAM LEADER", "PROJECT MANAGER", "HR"];

export const IN_TYPE_OPTIONS: {
  value: AttendanceByAuthorityDto.inType;
  label: string;
}[] = [
  { value: AttendanceByAuthorityDto.inType.PRESENT, label: "Present" },
  { value: AttendanceByAuthorityDto.inType.LATE, label: "Late" },
  { value: AttendanceByAuthorityDto.inType.ABSENT, label: "Absent" },
  { value: AttendanceByAuthorityDto.inType.ON_LEAVE, label: "On Leave" },
  { value: AttendanceByAuthorityDto.inType.WEEKEND, label: "Weekend" },
  {
    value: AttendanceByAuthorityDto.inType.WORK_FROM_HOME,
    label: "Work From Home",
  },
];

export const COLUMNS: ColumnDef[] = [
  { key: "#", label: "#" },
  { key: "date", label: "DATE" },
  { key: "day", label: "DAY" },
  { key: "checkIn", label: "CHECK-IN" },
  { key: "checkOut", label: "CHECK-OUT" },
  { key: "shiftType", label: "SHIFT TYPE" },
  { key: "status", label: "STATUS" },
];

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* ── Pure helper functions ───────────────────────────────── */

/** Small helper — wait one frame so the dialog fully unmounts before showing SweetAlert */
export const nextTick = () =>
  new Promise<void>((r) => setTimeout(r, 150));

/**
 * Build a UTC ISO string from a YYYY-MM-DD date + optional time parts.
 * Subtracts 6 hours (UTC+6 → UTC) so the backend stores the correct UTC value
 * and the frontend's toLocaleTimeString (UTC+6) displays the original time.
 */
export function buildUTCIso(
  dateStr: string,
  hour?: number,
  minute?: number,
  ampm?: string,
): string {
  if (hour == null || minute == null || !ampm) {
    return `${dateStr}T00:00:00.000Z`;
  }
  let h = hour;
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;

  // Subtract 6 hours for UTC+6 → UTC conversion
  h -= 6;

  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  let day = dd;
  let month = mm;
  let year = yyyy;
  if (h < 0) {
    h += 24;
    const prev = new Date(Date.UTC(year, month - 1, day - 1));
    year = prev.getUTCFullYear();
    month = prev.getUTCMonth() + 1;
    day = prev.getUTCDate();
  }

  const hhStr = String(h).padStart(2, "0");
  const mmStr = String(minute).padStart(2, "0");
  const dateOut = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return `${dateOut}T${hhStr}:${mmStr}:00.000Z`;
}

export function formatTime(iso?: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function toLocalDateKey(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function mapInTypeToStatus(inType: string): AttendanceStatus {
  switch (inType) {
    case "PRESENT":
      return "present";
    case "LATE":
      return "late";
    case "ABSENT":
      return "absent";
    case "ON_LEAVE":
      return "leave";
    case "WEEKEND":
      return "weekend";
    case "WORK_FROM_HOME":
      return "wfh";
    default:
      return "-";
  }
}

/**
 * Build a full month of AttendanceRecord rows.
 * Days with API data show real values; days without show "-" placeholders.
 */
export function buildFullMonthRecords(
  month: number,
  year: number,
  apiRecords: ApiAttendanceRecord[],
): AttendanceRecord[] {
  const totalDays = getDaysInMonth(month, year);

  const recordMap = new Map<string, ApiAttendanceRecord>();
  for (const r of apiRecords) {
    recordMap.set(toLocalDateKey(r.date), r);
  }

  const records: AttendanceRecord[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month - 1, day);
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const apiRecord = recordMap.get(dateKey);

    if (apiRecord) {
      records.push({
        id: apiRecord._id,
        rowNumber: day,
        date: formatDateDisplay(date),
        day: DAY_NAMES[date.getDay()],
        checkIn: formatTime(apiRecord.checkInTime),
        checkOut: formatTime(apiRecord.checkOutTime),
        shiftType: apiRecord.shiftType ?? "-",
        status: mapInTypeToStatus(apiRecord.inType),
      });
    } else {
      records.push({
        id: `empty-${day}`,
        rowNumber: day,
        date: formatDateDisplay(date),
        day: DAY_NAMES[date.getDay()],
        checkIn: "-",
        checkOut: "-",
        shiftType: "-",
        status: "-",
      });
    }
  }

  return records;
}

/** Build today info from today's API record (if exists) */
export function buildTodayAttendance(
  records: ApiAttendanceRecord[],
): TodayAttendance {
  const now = new Date();
  const todayKey = toLocalDateKey(now.toISOString());

  const todayRecord = records.find((r) => toLocalDateKey(r.date) === todayKey);

  return {
    date: formatDateDisplay(now),
    dayOfWeek: DAY_NAMES[now.getDay()],
    checkedInAt: todayRecord?.checkInTime
      ? formatTime(todayRecord.checkInTime)
      : null,
    checkedOutAt: todayRecord?.checkOutTime
      ? formatTime(todayRecord.checkOutTime)
      : null,
  };
}

/** Compute summary stats from full month records */
export function computeSummary(
  records: AttendanceRecord[],
): AttendanceSummary {
  let present = 0;
  let late = 0;
  let absent = 0;
  let leave = 0;
  let exchange = 0;
  let weekend = 0;
  let wfh = 0;

  for (const r of records) {
    switch (r.status) {
      case "present":
        present++;
        break;
      case "late":
        late++;
        break;
      case "absent":
        absent++;
        break;
      case "leave":
        leave++;
        break;
      case "exchange":
        exchange++;
        break;
      case "weekend":
        weekend++;
        break;
      case "wfh":
        wfh++;
        break;
    }
  }

  return {
    present,
    late,
    absent,
    leave,
    exchange,
    weekend,
    wfh,
    workDays: present + late + wfh,
  };
}
