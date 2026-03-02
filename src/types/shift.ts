export type ShiftType = "morning" | "evening" | "night" | "weekend";

export interface ShiftDay {
  date: number;
  month: number; // 0-indexed (0 = January)
  year: number;
  shift: ShiftType | null;
  isCurrentMonth: boolean;
}

export interface ShiftStyle {
  bg: string;
  text: string;
  bgHex: string;
  textHex: string;
  label: string;
  icon: string;
}

/* ─── API response types ─── */

export interface ShiftExchangeRecord {
  _id: string;
  user: string;
  exchangeDate: string;
  originalShift: string;
  newShift: string;
  reason: string | null;
  approvedBy: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface MyWeekends {
  currentWeekends: string[];
  updatedWeekends: string[];
  exchangedWeekendDates: string[];
}

export interface WeeklyShiftRecord {
  _id: string;
  user: string;
  weekStartDate: string;
  weekEndDate: string;
  shiftType: "MORNING" | "EVENING" | "NIGHT";
  myWeekends: MyWeekends;
  shiftExchanges: ShiftExchangeRecord[];
  assignedBy: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}
