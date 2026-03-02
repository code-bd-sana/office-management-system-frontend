"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUserInfo";
import { RequestShiftChangeModal } from "./RequestShiftChangeModal";
import { AssignShiftModal } from "./AssignShiftModal";
import { PendingShiftExchangesModal } from "./PendingShiftExchangesModal";

const PENDING_REQUEST_ROLES = ["SUPER ADMIN", "DIRECTOR", "PROJECT MANAGER"];
const ASSIGN_SHIFT_ROLES = ["SUPER ADMIN", "PROJECT MANAGER"];
const REQUEST_CHANGE_ROLES = ["PROJECT MANAGER", "TEAM LEADER", "EMPLOYEE"];

interface ShiftLegendProps {
  onShiftChangeSubmit: () => void;
}

interface ShiftType {
  icon: string;
  label: string;
  time: string;
  color: string;
}

const SHIFT_TYPES: ShiftType[] = [
  {
    icon: "/icons/sun-icons.png",
    label: "Morning Shift",
    time: "(07:00 AM - 03:00 PM)",
    color: "text-orange-500",
  },
  {
    icon: "/icons/night-icons.png",
    label: "Night Shift",
    time: "(11:00 PM - 07:00 AM)",
    color: "text-red-500",
  },
  {
    icon: "/icons/evening-icons.png",
    label: "Evening Shift",
    time: "(03:00 PM - 11:00 PM)",
    color: "text-blue-500",
  },
];

export function ShiftLegend({ onShiftChangeSubmit }: ShiftLegendProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const { role } = useUserInfo();

  const canViewPending = role ? PENDING_REQUEST_ROLES.includes(role) : false;
  const canAssignShift = role ? ASSIGN_SHIFT_ROLES.includes(role) : false;
  const canRequestChange = role ? REQUEST_CHANGE_ROLES.includes(role) : false;

  return (
    <div className="mb-2 flex flex-col gap-3 rounded-sm bg-[#eef0f3] p-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Shift Types Legend */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 sm:gap-4">
        {SHIFT_TYPES.map((shift, index) => (
          <div key={index} className="flex items-center gap-2">
            <Image src={shift.icon} alt={shift.label} width={20} height={20} />
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              <span className="text-xs font-medium text-foreground sm:text-sm">
                {shift.label}
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                - {shift.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row flex-wrap gap-2 sm:items-center">
        {canViewPending && (
          <Button
            onClick={() => setIsPendingModalOpen(true)}
            className="rounded-sm bg-[#E8A317] px-5 py-2 text-sm font-medium text-white hover:bg-[#E8A317]/90"
          >
            Pending Request
          </Button>
        )}
        {canAssignShift && (
          <Button
            onClick={() => setIsAssignModalOpen(true)}
            className="rounded-sm bg-[#044192] px-5 py-2 text-sm font-medium text-white hover:bg-[#044192]/90"
          >
            Assign Shift
          </Button>
        )}
        {canRequestChange && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-sm bg-[#14804A] px-5 py-2 text-sm font-medium text-white hover:bg-[#14804A]/90"
          >
            Request Shift Change
          </Button>
        )}
      </div>

      {/* Request Shift Change Modal */}
      {canRequestChange && (
        <RequestShiftChangeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onShiftChangeSubmit}
        />
      )}

      {/* Assign Shift Modal */}
      {canAssignShift && (
        <AssignShiftModal
          open={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
        />
      )}

      {/* Pending Shift Exchanges Modal */}
      {canViewPending && (
        <PendingShiftExchangesModal
          open={isPendingModalOpen}
          onClose={() => setIsPendingModalOpen(false)}
        />
      )}
    </div>
  );
}