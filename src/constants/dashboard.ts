import {
  ClipboardList,
  FolderOpen,
  FileText,
  LayoutGrid,
  Megaphone,
  CircleCheckBig,
} from "lucide-react";

import type { DashboardCardData, UserProfile } from "@/types";

export const DASHBOARD_CARDS: DashboardCardData[] = [
  {
    id: "tasks",
    title: "Tasks",
    count: 5,
    subtitle: "Active Projects",
    icon: ClipboardList,
    cardColor: "bg-card-teal",
    iconColor: "bg-icon-teal",
    href: "/task",
  },
  {
    id: "projects",
    title: "Projects",
    count: 12,
    subtitle: "Active Projects",
    icon: FolderOpen,
    cardColor: "bg-card-blue",
    iconColor: "bg-icon-blue",
    href: "/projects",
  },
  {
    id: "dcr-submission",
    title: "DCR Submission",
    count: 6,
    subtitle: "Submission Report",
    icon: FileText,
    cardColor: "bg-card-peach",
    iconColor: "bg-icon-orange",
    href: "/dcr-submission",
  },
  {
    id: "shift-assignment",
    title: "Shift Assignment",
    count: 6,
    subtitle: "Total Members",
    icon: LayoutGrid,
    cardColor: "bg-card-steel",
    iconColor: "bg-icon-steel",
    href: "/shift-assignment",
  },
  {
    id: "learning-training",
    title: "Learning & Training",
    count: 5,
    subtitle: "Active Projects",
    icon: Megaphone,
    cardColor: "bg-card-lime",
    iconColor: "bg-icon-lime",
    href: "/learning-training",
  },
  {
    id: "my-attendance",
    title: "My Attendance",
    count: 12,
    subtitle: "Active Projects",
    icon: CircleCheckBig,
    cardColor: "bg-card-green",
    iconColor: "bg-icon-green",
    href: "/attendance",
  },
];

export const DEMO_USER: UserProfile = {
  name: "Robbi Darwis",
  email: "rdarwis@gmail.com",
  avatarUrl: undefined,
};
