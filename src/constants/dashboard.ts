import type { DashboardCardData, UserProfile } from "@/types";

export const DASHBOARD_CARDS: DashboardCardData[] = [
  {
    id: "tasks",
    title: "Tasks",
    count: 5,
    subtitle: "Active Projects",
    iconPath: "/icons/task-icons.png",
    cardColor: "bg-[#E7E3FA]",
    href: "/task",
  },
  {
    id: "projects",
    title: "Projects",
    count: 12,
    subtitle: "Active Projects",
    iconPath: "/icons/project-icons.png",
    cardColor: "bg-[#E6F1FD]",
    href: "/projects",
  },
  {
    id: "team-members",
    title: "Team Members",
    count: 3,
    subtitle: "Total Members",
    iconPath: "/icons/team-icons.png",
    cardColor: "bg-[#E0ECED]",
    href: "/team-members",
  },
  {
    id: "dcr-submission",
    title: "DCR Submission",
    count: 6,
    subtitle: "Submission Report",
    iconPath: "/icons/dcr-icons.png",
    cardColor: "bg-[#FBE4D0]",
    href: "/dcr-submission",
  },
  {
    id: "shift-assignment",
    title: "Shift Assignment",
    count: 6,
    subtitle: "Total Members",
    iconPath: "/icons/shift-assignment-icons.png",
    cardColor: "bg-[#E0ECED]",
    href: "/shift-assignment",
  },
  {
    id: "learning-training",
    title: "Learning & Training",
    count: 5,
    subtitle: "Active Projects",
    iconPath: "/icons/learning-icons.png",
    cardColor: "bg-[#E6F1FD]",
    href: "/learning-training",
  },
  {
    id: "my-attendance",
    title: "My Attendance",
    count: 12,
    subtitle: "Active Projects",
    iconPath: "/icons/attandance-icons.png",
    cardColor: "bg-[#E0ECED]",
    href: "/attendance",
  },
];

export const DEMO_USER: UserProfile = {
  name: "Robbi Darwis",
  email: "rdarwis@gmail.com",
  avatarUrl: undefined,
};
