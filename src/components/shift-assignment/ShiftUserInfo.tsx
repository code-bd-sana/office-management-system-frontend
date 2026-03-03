"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShiftUserSelector,
  type ShiftUserOption,
} from "./ShiftUserSelector";
import { useUserInfo } from "@/hooks/useUserInfo";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

const PRIVILEGED_ROLES = ["SUPER ADMIN", "PROJECT MANAGER"];

interface ShiftUserInfoProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  authorization: string | null;
  selectedUser: ShiftUserOption | null;
  onSelectUser: (user: ShiftUserOption | null) => void;
}

export function ShiftUserInfo({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
  authorization,
  selectedUser,
  onSelectUser,
}: ShiftUserInfoProps) {
  const { name, employeeId, userId: myUserId, role } = useUserInfo();

  const isPrivileged = !!role && PRIVILEGED_ROLES.includes(role);

  return (
    <div className="mb-2 flex items-center justify-between gap-3 rounded-sm p-3 sm:p-4">
      {/* Left: User selector (privileged) or own name (others) */}
      <div className="flex items-center gap-2">
        {isPrivileged ? (
          <ShiftUserSelector
            authorization={authorization}
            myUserId={myUserId}
            selectedUser={selectedUser}
            onSelectUser={onSelectUser}
          />
        ) : (
          <span className="text-sm font-semibold text-foreground sm:text-base">
            {name ?? "—"}
            {employeeId && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({employeeId})
              </span>
            )}
          </span>
        )}
      </div>

      {/* Month & Year Selectors */}
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <Select
          value={currentMonth.toString()}
          onValueChange={(v) => onMonthChange(Number(v))}
        >
          <SelectTrigger className="h-9 w-28 rounded-sm border-border/60 text-xs sm:w-32 sm:text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m, i) => (
              <SelectItem key={i} value={i.toString()}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentYear.toString()}
          onValueChange={(v) => onYearChange(Number(v))}
        >
          <SelectTrigger className="h-9 w-20 rounded-sm border-border/60 text-xs sm:w-24 sm:text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}