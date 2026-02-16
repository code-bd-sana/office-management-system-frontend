"use client";

import { useState } from "react";
import { ShiftUserInfo } from "./ShiftUserInfo";
import { ShiftCalendar } from "./ShiftCalendar";
import { ShiftCalendarLegend } from "./ShiftCalendarLegend";

export function ShiftAssignmentContent() {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January
  const currentYear = 2026;

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <>
      {/* User Info and Month Navigation */}
      <ShiftUserInfo
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      {/* Calendar Grid */}
      <ShiftCalendar month={currentMonth} year={currentYear} />

      {/* Calendar Legend */}
      <ShiftCalendarLegend />
    </>
  );
}
