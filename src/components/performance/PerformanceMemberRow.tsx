import { TableCell, TableRow } from "@/components/ui/table";
import type { PerformanceMember } from "@/types/performance";

interface PerformanceMemberRowProps {
  member: PerformanceMember;
  rowNumber: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PerformanceMemberRow({ member, rowNumber }: PerformanceMemberRowProps) {
  return (
    <TableRow className="border-b border-border/30 hover:bg-muted/30">
      {/* # */}
      <TableCell className="py-3 pl-5 text-sm font-medium text-foreground/70">
        {rowNumber}
      </TableCell>

      {/* Member */}
      <TableCell className="py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#044192] text-xs font-semibold text-white sm:h-9 sm:w-9">
            {getInitials(member.name)}
          </div>
          <span className="text-sm font-medium text-foreground">{member.name}</span>
        </div>
      </TableCell>

      {/* Designation */}
      <TableCell className="whitespace-nowrap py-3 text-sm text-foreground/70">
        {member.designation}
      </TableCell>

      {/* Total Projects */}
      <TableCell className="py-3 text-center text-sm text-foreground/70">
        {member.totalProjects}
      </TableCell>

      {/* WIP */}
      <TableCell className="py-3 text-center text-sm text-foreground/70">
        {member.wip}
      </TableCell>

      {/* Delivered */}
      <TableCell className="py-3 text-center text-sm text-foreground/70">
        {member.delivered}
      </TableCell>

      {/* Pending */}
      <TableCell className="py-3 text-center text-sm text-foreground/70">
        {member.pending}
      </TableCell>

      {/* Avg Rating */}
      <TableCell className="py-3 pr-5 text-center text-sm font-medium text-foreground/80">
        {member.avgRating}
      </TableCell>
    </TableRow>
  );
}
