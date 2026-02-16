"use client";

import { useMemo } from "react";
import { generateCalendarDays, SHIFT_STYLES } from "@/constants/shift";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ShiftCalendarProps {
  month: number; // 0-indexed
  year: number;
}

export function ShiftCalendar({ month, year }: ShiftCalendarProps) {
  const calendarDays = useMemo(
    () => generateCalendarDays(month, year),
    [month, year]
  );

  // Split days into weeks (rows of 7)
  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  return (
    <div className="overflow-hidden rounded-sm border">
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
            const style = SHIFT_STYLES[day.shift];
            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="flex min-h-24 flex-col items-center justify-between border-r px-2 py-2.5 last:border-r-0"
              >
                {/* Date Number */}
                <span
                  className={`text-lg font-medium ${
                    day.isCurrentMonth
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {String(day.date).padStart(2, "0")}
                </span>

                {/* Shift Badge */}
                <span
                  className={`w-full rounded-xs px-2 py-3 text-center text-sm font-semibold ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
