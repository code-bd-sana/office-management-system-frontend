"use client";

import Image from "next/image";

interface DcrViewProfileProps {
  memberName: string;
  employeeId: string;
  avatar?: string;
}

export function DcrViewProfile({ memberName, employeeId, avatar }: DcrViewProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {avatar ? (
        <Image
          src={avatar}
          alt={memberName}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#044192] text-base font-semibold text-white sm:h-14 sm:w-14 sm:text-lg">
          {getInitials(memberName)}
        </div>
      )}
      <div>
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {memberName}
        </h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Employee ID: {employeeId}
        </p>
      </div>
    </div>
  );
}
