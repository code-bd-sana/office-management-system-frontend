"use client";

import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { SHIFT_STYLES } from "@/constants/shift";
import type { ShiftType, ShiftDay, WeeklyShiftRecord } from "@/types/shift";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DAY_NAME_MAP: Record<number, string> = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

/** Map API shift string to our ShiftType */
function normalizeShift(raw: string): ShiftType | null {
  const map: Record<string, ShiftType> = {
    MORNING: "morning",
    EVENING: "evening",
    NIGHT: "night",
  };
  return map[raw.toUpperCase()] ?? null;
}

/**
 * Build calendar grid cells for a given month/year from API shift records.
 *
 * Weekend priority per week:
 *   1. exchangedWeekendDates (exact date match)
 *   2. updatedWeekends (day-name match)
 *   3. currentWeekends (day-name match)
 *
 * Shift exchange: APPROVED exchange on a date overrides the default shift.
 */
function buildCalendarDays(
  month: number,         // 0-indexed
  year: number,
  records: WeeklyShiftRecord[],
): ShiftDay[] {
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

  const days: ShiftDay[] = [];

  for (let i = 0; i < totalCells; i++) {
    let cellDate: Date;
    let isCurrentMonth: boolean;

    if (i < firstDayOfMonth) {
      // Previous month overflow
      const daysInPrev = new Date(year, month, 0).getDate();
      const d = daysInPrev - firstDayOfMonth + i + 1;
      cellDate = new Date(year, month - 1, d);
      isCurrentMonth = false;
    } else if (i < firstDayOfMonth + daysInMonth) {
      const d = i - firstDayOfMonth + 1;
      cellDate = new Date(year, month, d);
      isCurrentMonth = true;
    } else {
      const d = i - firstDayOfMonth - daysInMonth + 1;
      cellDate = new Date(year, month + 1, d);
      isCurrentMonth = false;
    }

    const shift = resolveShift(cellDate, records);

    days.push({
      date: cellDate.getDate(),
      month: cellDate.getMonth(),
      year: cellDate.getFullYear(),
      shift,
      isCurrentMonth,
    });
  }

  return days;
}

/** Find which WeeklyShiftRecord covers the given date and resolve its shift. */
function resolveShift(
  date: Date,
  records: WeeklyShiftRecord[],
): ShiftType | null {
  // Find the record whose week range contains this date
  const record = records.find((r) => {
    const start = new Date(r.weekStartDate);
    const end = new Date(r.weekEndDate);
    // Normalize to date-only comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    return d >= start && d <= end;
  });

  if (!record) return null;

  const dayName = DAY_NAME_MAP[date.getDay()];

  // ── Weekend check (exclusive priority — only 1 weekend per week) ──
  const { myWeekends } = record;

  if (myWeekends.exchangedWeekendDates?.length) {
    // 1. exchangedWeekendDates exists → only the LAST date is the weekend
    const lastExchanged = new Date(
      myWeekends.exchangedWeekendDates[myWeekends.exchangedWeekendDates.length - 1],
    );
    const isExchangedWeekend =
      lastExchanged.getFullYear() === date.getFullYear() &&
      lastExchanged.getMonth() === date.getMonth() &&
      lastExchanged.getDate() === date.getDate();
    if (isExchangedWeekend) return "weekend";
  } else if (myWeekends.updatedWeekends?.length) {
    // 2. No exchangedWeekendDates → check updatedWeekends only
    if (myWeekends.updatedWeekends.includes(dayName)) return "weekend";
  } else if (myWeekends.currentWeekends?.length) {
    // 3. No exchangedWeekendDates & no updatedWeekends → fall back to currentWeekends
    if (myWeekends.currentWeekends.includes(dayName)) return "weekend";
  }

  // ── Shift exchange check (APPROVED only) ──
  const exchange = record.shiftExchanges?.find((ex) => {
    if (ex.status !== "APPROVED") return false;
    const exDate = new Date(ex.exchangeDate);
    return (
      exDate.getFullYear() === date.getFullYear() &&
      exDate.getMonth() === date.getMonth() &&
      exDate.getDate() === date.getDate()
    );
  });

  if (exchange) return normalizeShift(exchange.newShift);

  // ── Default: the week's shiftType ──
  return normalizeShift(record.shiftType);
}

/* ─────────────────────────── Component ─────────────────────────── */

interface ShiftCalendarProps {
  month: number;
  year: number;
  shiftRecords: WeeklyShiftRecord[];
  loading: boolean;
}

export function ShiftCalendar({
  month,
  year,
  shiftRecords,
  loading,
}: ShiftCalendarProps) {
  const calendarDays = useMemo(
    () => buildCalendarDays(month, year, shiftRecords),
    [month, year, shiftRecords],
  );

  const weeks = useMemo(() => {
    const result: ShiftDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#044192]" />
      </div>
    );
  }

  return (
    <>
      {/* ── Desktop Calendar (sm+) ── */}
      <div className="hidden overflow-hidden rounded-sm border sm:block">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b bg-[#F5F7FA]">
          {DAY_HEADERS.map((day) => (
            <div
              key={day}
              className="border-r py-3 text-center text-sm font-semibold text-[#044192] last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Rows */}
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 border-b last:border-b-0"
          >
            {week.map((day, dayIndex) => {
              const style = day.shift ? SHIFT_STYLES[day.shift] : null;
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="flex min-h-24 flex-col items-center justify-between border-r px-2 py-2.5 last:border-r-0"
                >
                  <span
                    className={`text-lg font-medium ${
                      day.isCurrentMonth
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {String(day.date).padStart(2, "0")}
                  </span>

                  {style && (
                    <span
                      className={`w-full rounded-xs px-2 py-3 text-center text-sm font-semibold ${style.bg} ${style.text}`}
                    >
                      {style.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Mobile Calendar (below sm) ── */}
      <div className="block sm:hidden">
        <div className="mb-1 grid grid-cols-7 gap-1">
          {DAY_HEADERS.map((day) => (
            <div
              key={day}
              className="rounded-sm bg-[#F5F7FA] py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#044192]"
            >
              {day}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="mb-1 grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => {
              const style = day.shift ? SHIFT_STYLES[day.shift] : null;
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="flex min-h-11 items-center justify-center rounded-sm"
                  style={{
                    backgroundColor: style?.bgHex ?? "transparent",
                    color: day.isCurrentMonth
                      ? (style?.textHex ?? "#999")
                      : `${style?.textHex ?? "#999"}50`,
                  }}
                >
                  <span
                    className={`text-sm font-semibold ${
                      !day.isCurrentMonth ? "opacity-40" : ""
                    }`}
                  >
                    {String(day.date).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}