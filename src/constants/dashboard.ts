import type { DashboardCardData, UserProfile } from "@/types";
import TasksDashboardIcon from "@/components/icons/dashboard-home/TasksDashboardIcon";
import ProjectIcon from "@/components/icons/dashboard-home/ProjectIcon";
import TeamIcon from "@/components/icons/dashboard-home/TeamIcon";
import DcrIcon from "@/components/icons/dashboard-home/DcrIcon";
import ShiftIcon from "@/components/icons/dashboard-home/ShiftIcon";
import LearningDashboardIcon from "@/components/icons/dashboard-home/LearningDashboardIcon";
import AttendanceDashboardIcon from "@/components/icons/dashboard-home/AttendanceDashboardIcon";
export const DASHBOARD_CARDS: DashboardCardData[] = [
  {
    id: "tasks",
    title: "Tasks",
    count: 5,
    subtitle: "Active Projects",
    icon: TasksDashboardIcon,
    cardColor: "bg-[#E7E3FA]",
    href: "/task",
  },
  {
    id: "projects",
    title: "Projects",
    count: 12,
    subtitle: "Active Projects",
    icon: ProjectIcon,
    cardColor: "bg-[#E6F1FD]",
    href: "/projects",
  },
  {
    id: "team-members",
    title: "Team Members",
    count: 3,
    subtitle: "Total Members",
    icon: TeamIcon,
    cardColor: "bg-[#E0ECED]",
    href: "/team-members",
  },
  {
    id: "dcr-submission",
    title: "DCR Submission",
    count: 6,
    subtitle: "Submission Report",
    icon: DcrIcon,
    cardColor: "bg-[#FBE4D0]",
    href: "/dcr-submission",
  },
  {
    id: "shift-assignment",
    title: "Shift Assignment",
    count: 6,
    subtitle: "Total Members",
    icon: ShiftIcon,
    cardColor: "bg-[#E0ECED]",
    href: "/shift-assignment",
  },
  {
    id: "learning-training",
    title: "Learning & Training",
    count: 5,
    subtitle: "Active Projects",
    icon: LearningDashboardIcon,
    cardColor: "bg-[#E6F1FD]",
    href: "/learning-training",
  },
  {
    id: "my-attendance",
    title: "My Attendance",
    count: 12,
    subtitle: "Active Projects",
    icon: AttendanceDashboardIcon,
    cardColor: "bg-[#E7E3FA]",
    href: "/attendance",
  },
];

export const DEMO_USER: UserProfile = {
  name: "Robbi Darwis",
  email: "rdarwis@gmail.com",
  avatarUrl: undefined,
};
