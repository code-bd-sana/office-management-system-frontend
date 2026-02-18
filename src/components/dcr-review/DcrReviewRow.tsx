"use client";

import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { DcrReviewMember } from "@/types/dcr-review";

interface DcrReviewRowProps {
  member: DcrReviewMember;
  rowNumber: number;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export function DcrReviewRow({ member, rowNumber, checked, onCheckChange }: DcrReviewRowProps) {
  const router = useRouter();

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const taskPendingStyle =
    member.taskPending === "Completed"
      ? "text-green-600"
      : member.taskPending === "Pending"
        ? "text-orange-600"
        : "text-blue-600";

  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      {/* Checkbox + Row Number */}
      <TableCell className="whitespace-nowrap py-3 pl-3 sm:py-3.5 sm:pl-5">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-[#044192]"
            aria-label={`Select row ${rowNumber}`}
          />
          <span className="text-sm font-medium text-foreground/70">{rowNumber}</span>
        </div>
      </TableCell>

      {/* Member */}
      <TableCell className="py-3 sm:py-3.5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#044192] text-xs font-medium text-white sm:h-9 sm:w-9 sm:text-sm">
            {getInitials(member.name)}
          </div>
          <span className="text-sm font-medium text-foreground">{member.name}</span>
        </div>
      </TableCell>

      {/* Designation */}
      <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
        {member.designation}
      </TableCell>

      {/* Shift */}
      <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
        <div>
          <span>{member.shift}</span>
          <br />
          <span className="text-xs text-foreground/50">{member.shiftTime}</span>
        </div>
      </TableCell>

      {/* Task Pending */}
      <TableCell className="whitespace-nowrap py-3 sm:py-3.5">
        <span className={`text-xs font-semibold sm:text-sm ${taskPendingStyle}`}>
          {member.taskPending}
        </span>
      </TableCell>

      {/* DCR Submission */}
      <TableCell className="whitespace-nowrap py-3 sm:py-3.5">
        <span className="text-xs font-medium text-brand-navy underline underline-offset-2 hover:text-brand-navy-dark sm:text-sm cursor-pointer">
          {member.dcrSubmission}
        </span>
      </TableCell>

      {/* Attendance */}
      <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
        {member.attendance}
      </TableCell>

      {/* Action */}
      <TableCell className="py-3 pr-3 sm:py-3.5 sm:pr-5">
        <Button
          variant="default"
          size="sm"
          className="rounded-sm bg-[#044192] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#044192]/90 sm:px-4"
          onClick={() => router.push(`/dcr-review/${member.id}`)}
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
}
