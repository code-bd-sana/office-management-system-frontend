import {
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  CalendarOff,
  Settings2,
  GraduationCap,
  Bell,
  MessageSquare,
} from "lucide-react";

import type { NavItem } from "@/types";

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Task",
    href: "/task",
    icon: ClipboardList,
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: UserCheck,
  },
  {
    label: "Leave Management",
    href: "/leave",
    icon: CalendarOff,
  },
  {
    label: "Shift Assignment",
    href: "/shift-assignment",
    icon: Settings2,
  },
  {
    label: "Learning & Training",
    href: "/learning-training",
    icon: GraduationCap,
  },
  {
    label: "Notification",
    href: "/notification",
    icon: Bell,
  },
  {
    label: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
];
