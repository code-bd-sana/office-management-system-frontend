"use client";

import { useState, useEffect, useCallback } from "react";
import { ShiftLegend } from "./ShiftLegend";
import { ShiftChangeRequestedBanner } from "./ShiftChangeRequestedBanner";
import { ShiftUserInfo } from "./ShiftUserInfo";
import { ShiftCalendar } from "./ShiftCalendar";
import { ShiftCalendarLegend } from "./ShiftCalendarLegend";
import type { ShiftUserOption } from "./ShiftUserSelector";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import { SellsShiftManagementService } from "@/api";
import type { WeeklyShiftRecord } from "@/types/shift";

const PRIVILEGED_ROLES = ["SUPER ADMIN", "PROJECT MANAGER"];

export function ShiftAssignmentContent() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-indexed
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [refreshKey, setRefreshKey] = useState(0);
  const [shiftRecords, setShiftRecords] = useState<WeeklyShiftRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAccessToken();
  const { role, userId: myUserId } = useUserInfo();

  const isPrivileged = !!role && PRIVILEGED_ROLES.includes(role);
  const [selectedUser, setSelectedUser] = useState<ShiftUserOption | null>(
    null,
  );
  const isViewingOtherUser = isPrivileged && selectedUser !== null;

  const fetchShifts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      let res: any;
      if (isViewingOtherUser && selectedUser) {
        res =
          await SellsShiftManagementService.sellsShiftManagementControllerFindShiftForUser(
            {
              month: currentMonth + 1,
              year: currentYear,
              userId: selectedUser._id,
              authorization: token,
            },
          );
      } else {
        res =
          await SellsShiftManagementService.sellsShiftManagementControllerGetMyShifts(
            {
              month: currentMonth + 1,
              year: currentYear,
              authorization: token,
            },
          );
      }
      const data = (res as any)?.data;
      setShiftRecords(Array.isArray(data) ? data : []);
    } catch {
      setShiftRecords([]);
    } finally {
      setLoading(false);
    }
  }, [token, currentMonth, currentYear, isViewingOtherUser, selectedUser]);

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

      {/* User Selector + Month/Year Navigation */}
      <ShiftUserInfo
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={setCurrentMonth}
        onYearChange={setCurrentYear}
        authorization={token}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
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