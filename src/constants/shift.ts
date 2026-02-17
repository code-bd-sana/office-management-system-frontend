import type { ShiftType, ShiftStyle } from "@/types/shift";

export const SHIFT_STYLES: Record<ShiftType, ShiftStyle> = {
  morning: {
    bg: "bg-[#FEE6C9]",
    text: "text-[#2C3E50]",
    bgHex: "#FEE6C9",
    textHex: "#2C3E50",
    label: "Morning Shift",
    icon: "/icons/sun-icons.png",
  },
  evening: {
    bg: "bg-[#3A5AD0]",
    text: "text-white",
    bgHex: "#3A5AD0",
    textHex: "#ffffff",
    label: "Evening Shift",
    icon: "/icons/evening-icons.png",
  },
  night: {
    bg: "bg-[#654DBA]",
    text: "text-white",
    bgHex: "#654DBA",
    textHex: "#ffffff",
    label: "Night Shift",
    icon: "/icons/night-icons.png",
  },
  off: {
    bg: "bg-[#F7F7F7]",
    text: "text-[#555]",
    bgHex: "#F7F7F7",
    textHex: "#555555",
    label: "Off Day",
    icon: "/icons/off-day-icons.png",
  },
};

/**
 * Weekly shift rotation pattern.
 * Each inner array represents one week's shift pattern (Sun–Sat).
 * The pattern repeats every 5 weeks.
 */
export const SHIFT_ROTATION: ShiftType[][] = [
  // Week 1: Morning Shift (Mon–Thu), Off Day (Fri), Morning Shift (Sat), Morning (Sun - prev/next carry)
  ["morning", "morning", "morning", "morning", "morning", "off", "morning"],
  // Week 2: Morning Shift (Sun), Evening Shift (Mon–Sat)
  ["morning", "evening", "evening", "evening", "evening", "evening", "evening"],
  // Week 3: Off Day (Sun), Night/Evening (Mon), Evening (Tue), Night Shift (Wed–Sat)
  ["off", "night", "evening", "night", "night", "night", "night"],
  // Week 4: Night Shift (Sun), Morning Shift (Mon–Thu), Off Day (Fri), Morning Shift (Sat)
  ["night", "morning", "morning", "morning", "morning", "off", "morning"],
  // Week 5: Morning Shift (Sun), Evening Shift (Mon–Sat)
  ["morning", "evening", "evening", "evening", "evening", "off", "evening"],
];

/**
 * Get the shift type for a specific date.
 * Uses the SHIFT_ROTATION pattern based on the week of the month.
 */
export function getShiftForDate(
  date: number,
  dayOfWeek: number,
  weekIndex: number,
): ShiftType {
  const rotation = SHIFT_ROTATION[weekIndex % SHIFT_ROTATION.length];
  return rotation[dayOfWeek];
}

/**
 * Generate calendar days for a given month/year.
 * Includes trailing days from the previous month and leading days into the next month
 * to fill complete weeks (rows).
 */
export function generateCalendarDays(
  month: number,
  year: number,
): {
  date: number;
  month: number;
  year: number;
  shift: ShiftType;
  isCurrentMonth: boolean;
}[] {
  const days: {
    date: number;
    month: number;
    year: number;
    shift: ShiftType;
    isCurrentMonth: boolean;
  }[] = [];

  // First day of the month (0 = Sunday, 6 = Saturday)
  const firstDay = new Date(year, month, 1).getDay();
  // Total days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Total days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Calculate total cells needed (complete weeks)
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  let weekIndex = 0;

  for (let i = 0; i < totalCells; i++) {
    const dayOfWeek = i % 7;

    // Track week index (new week starts on Sunday)
    if (i > 0 && dayOfWeek === 0) {
      weekIndex++;
    }

    if (i < firstDay) {
      // Previous month's trailing days
      const prevDate = daysInPrevMonth - firstDay + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      days.push({
        date: prevDate,
        month: prevMonth,
        year: prevYear,
        shift: getShiftForDate(prevDate, dayOfWeek, weekIndex),
        isCurrentMonth: false,
      });
    } else if (i < firstDay + daysInMonth) {
      // Current month's days
      const currentDate = i - firstDay + 1;
      days.push({
        date: currentDate,
        month,
        year,
        shift: getShiftForDate(currentDate, dayOfWeek, weekIndex),
        isCurrentMonth: true,
      });
    } else {
      // Next month's leading days
      const nextDate = i - firstDay - daysInMonth + 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      days.push({
        date: nextDate,
        month: nextMonth,
        year: nextYear,
        shift: getShiftForDate(nextDate, dayOfWeek, weekIndex),
        isCurrentMonth: false,
      });
    }
  }

  return days;
}
