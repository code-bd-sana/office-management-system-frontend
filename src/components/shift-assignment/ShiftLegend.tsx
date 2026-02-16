"use client";

import { Button } from "@/components/ui/button";

interface ShiftType {
  icon: string;
  label: string;
  time: string;
  color: string;
}

const SHIFT_TYPES: ShiftType[] = [
  {
    icon: "☀️",
    label: "Morning Shift",
    time: "(07:00 AM - 03:00 PM)",
    color: "text-orange-500",
  },
  {
    icon: "🌙",
    label: "Night Shift",
    time: "(11:00 PM - 07:00 AM)",
    color: "text-red-500",
  },
  {
    icon: "🌙",
    label: "Evening Shift",
    time: "(03:00 PM - 11:00 PM)",
    color: "text-blue-500",
  },
];

export function ShiftLegend() {
  const handleRequestChange = () => {
    // TODO: Implement shift change request
    console.log("Request shift change");
  };

  return (
    <div className="mb-2 bg-[#eef0f3] p-3 rounded-sm flex items-center justify-between">
      {/* Shift Types Legend */}
      <div className="grid grid-cols-2 gap-4">
        {SHIFT_TYPES.map((shift, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`text-lg ${shift.color}`}>{shift.icon}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">
                {shift.label}
              </span>
              <span className="text-sm text-muted-foreground">
                - {shift.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Request Shift Change Button */}
      <Button
        onClick={handleRequestChange}
        className="rounded-sm bg-[#14804A] px-5 py-2 text-sm font-medium text-white hover:bg-[#14804A]/90"
      >
        Request Shift Change
      </Button>
    </div>
  );
}
