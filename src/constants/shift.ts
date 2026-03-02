import type { ShiftType, ShiftStyle } from "@/types/shift";

export const SHIFT_STYLES: Record<ShiftType, ShiftStyle> = {
  morning: {
    bg: "bg-[#FEE6C9]",
    text: "text-[#2C3E50]",
    bgHex: "#FEE6C9",
    textHex: "#2C3E50",
    label: "Morning Shift",
    icon: "/icons/sun-icons.png",
  },
  evening: {
    bg: "bg-[#3A5AD0]",
    text: "text-white",
    bgHex: "#3A5AD0",
    textHex: "#ffffff",
    label: "Evening Shift",
    icon: "/icons/evening-icons.png",
  },
  night: {
    bg: "bg-[#654DBA]",
    text: "text-white",
    bgHex: "#654DBA",
    textHex: "#ffffff",
    label: "Night Shift",
    icon: "/icons/night-icons.png",
  },

  weekend: {
    bg: "bg-[#FFEBEE]",
    text: "text-[#C62828]",
    bgHex: "#FFEBEE",
    textHex: "#C62828",
    label: "Weekend",
    icon: "/icons/off-day-icons.png",
  },
};

