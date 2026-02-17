export type ShiftType = "morning" | "evening" | "night" | "off";

export interface ShiftDay {
  date: number;
  month: number; // 0-indexed (0 = January)
  year: number;
  shift: ShiftType;
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
