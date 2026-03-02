"use client";

import { useState, useEffect, useCallback } from "react";
import { ShiftLegend } from "./ShiftLegend";
import { ShiftChangeRequestedBanner } from "./ShiftChangeRequestedBanner";
import { ShiftUserInfo } from "./ShiftUserInfo";
import { ShiftCalendar } from "./ShiftCalendar";
import { ShiftCalendarLegend } from "./ShiftCalendarLegend";
import { useAccessToken } from "@/hooks/useAccessToken";
import { SellsShiftManagementService } from "@/api";
import type { WeeklyShiftRecord } from "@/types/shift";

export function ShiftAssignmentContent() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-indexed
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [refreshKey, setRefreshKey] = useState(0);
  const [shiftRecords, setShiftRecords] = useState<WeeklyShiftRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAccessToken();

  const fetchShifts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res =
        await SellsShiftManagementService.sellsShiftManagementControllerGetMyShifts(
          {
            month: currentMonth + 1, // API expects 1-12
            year: currentYear,
            authorization: token,
          }
        );
      const data = (res as any)?.data;
      setShiftRecords(Array.isArray(data) ? data : []);
    } catch {
      setShiftRecords([]);
    } finally {
      setLoading(false);
    }
  }, [token, currentMonth, currentYear]);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  return (
    <>
      {/* Shift Legend and Request Button */}
      <ShiftLegend
        onShiftChangeSubmit={() => setRefreshKey((k) => k + 1)}
      />

      {/* Shift Change Requested Banner */}
      <ShiftChangeRequestedBanner refreshKey={refreshKey} />

      {/* User Info and Month/Year Navigation */}
      <ShiftUserInfo
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={setCurrentMonth}
        onYearChange={setCurrentYear}
      />

      {/* Calendar Grid */}
      <ShiftCalendar
        month={currentMonth}
        year={currentYear}
        shiftRecords={shiftRecords}
        loading={loading}
      />

      {/* Calendar Legend */}
      <ShiftCalendarLegend />
    </>
  );
}