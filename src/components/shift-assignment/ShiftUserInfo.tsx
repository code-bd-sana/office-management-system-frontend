"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface ShiftUserInfoProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function ShiftUserInfo({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
}: ShiftUserInfoProps) {
  const { name, employeeId } = useUserInfo();

  const initials = name
    ? name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="mb-2 flex items-center justify-between gap-3 rounded-sm p-3 sm:p-4">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#044192] text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm">
          {initials}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground sm:text-base">
            {name ?? "—"}
          </h3>
          <p className="text-xs text-muted-foreground">
            Employee-ID: {employeeId ?? "—"}
          </p>
        </div>
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