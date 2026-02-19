"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types/team";
import { useState } from "react";
import { ProjectsListModal } from "./ProjectsListModal";

interface TeamMembersRowProps {
  member: TeamMember;
  rowNumber: number;
}

export function TeamMembersRow({ member, rowNumber }: TeamMembersRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <>
      <TableRow className="border-b border-border/40 hover:bg-muted/30">
        <TableCell className="whitespace-nowrap py-3 pl-3 text-sm font-medium text-foreground/70 sm:py-3.5 sm:pl-5">
          {rowNumber}
        </TableCell>
        <TableCell className="py-3 pl-3 sm:py-3.5 sm:pl-5">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#044192] text-xs font-medium text-white sm:h-9 sm:w-9 sm:text-sm">
              {getInitials(member.name)}
            </div>
            {/* Name */}
            <span className="text-sm font-medium text-foreground">
              {member.name}
            </span>
          </div>
        </TableCell>
        <TableCell className="whitespace-nowrap py-3 text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
          {member.designation}
        </TableCell>
        <TableCell className="whitespace-nowrap py-3 text-center text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
          {member.totalProjects}
        </TableCell>
        <TableCell className="whitespace-nowrap py-3 text-center text-xs text-foreground/70 sm:py-3.5 sm:text-sm">
          {member.completedProjects}
        </TableCell>
        <TableCell className="py-3 pr-3 sm:py-3.5 sm:pr-5">
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="rounded-sm bg-[#044192] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#044192]/90 sm:px-4"
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>

      {/* Projects List Modal */}
      <ProjectsListModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        memberName={member.name}
      />
    </>
  );
}
