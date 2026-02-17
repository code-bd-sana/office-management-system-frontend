"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types/team";

interface TeamMembersRowProps {
  member: TeamMember;
  rowNumber: number;
}

export function TeamMembersRow({ member, rowNumber }: TeamMembersRowProps) {
  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      <TableCell className="py-3.5 pl-5">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
          aria-label={`Select team member ${rowNumber}`}
        />
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-medium text-foreground/70">
        {rowNumber}
      </TableCell>
      <TableCell className="py-3.5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#044192] text-sm font-medium text-white">
            {getInitials(member.name)}
          </div>
          {/* Name */}
          <span className="text-sm font-medium text-foreground">
            {member.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {member.designation}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-center text-sm text-foreground/70">
        {member.totalProjects}
      </TableCell>
      <TableCell className="whitespace-nowrap py-3.5 text-center text-sm text-foreground/70">
        {member.completedProjects}
      </TableCell>
      <TableCell className="py-3.5 pr-5">
        <Button
          variant="default"
          size="sm"
          className="rounded-sm bg-[#044192] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#044192]/90"
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
}
