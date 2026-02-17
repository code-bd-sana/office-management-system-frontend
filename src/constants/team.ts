import type { TeamMember } from "@/types/team";

export const TEAM_MEMBERS_DESCRIPTION =
  "Track your team member's projects, monitor progress, and view individual task assignments";

export const DEMO_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    rowNumber: 1,
    name: "Mahin R.",
    designation: "Full-stack Developer",
    totalProjects: 3,
    completedProjects: 1,
  },
  {
    id: "2",
    rowNumber: 2,
    name: "Mahin R.",
    designation: "UI/UX Designer",
    totalProjects: 4,
    completedProjects: 2,
  },
  {
    id: "3",
    rowNumber: 3,
    name: "Mahin R.",
    designation: "Graphic Designer",
    totalProjects: 1,
    completedProjects: 3,
  },
  {
    id: "4",
    rowNumber: 4,
    name: "Mahin R.",
    designation: "Web Developer",
    totalProjects: 4,
    completedProjects: 2,
  },
  {
    id: "5",
    rowNumber: 5,
    name: "Mahin R.",
    designation: "Graphic Designer",
    totalProjects: 3,
    completedProjects: 1,
  },
  {
    id: "6",
    rowNumber: 6,
    name: "Mahin R.",
    designation: "Web Developer",
    totalProjects: 5,
    completedProjects: 1,
  },
  {
    id: "7",
    rowNumber: 7,
    name: "Mahin R.",
    designation: "Graphic Designer",
    totalProjects: 3,
    completedProjects: 1,
  },
  {
    id: "8",
    rowNumber: 8,
    name: "Mahin R.",
    designation: "Web Developer",
    totalProjects: 5,
    completedProjects: 1,
  },
  {
    id: "9",
    rowNumber: 9,
    name: "Mahin R.",
    designation: "Graphic Designer",
    totalProjects: 3,
    completedProjects: 1,
  },
];

export const TEAM_MEMBER_TABLE_COLUMNS = [
  "#",
  "MEMBER",
  "DESIGNATION",
  "TOTAL PROJECTS",
  "COMPLETED PROJECTS",
  "ACTION",
] as const;

export const TEAM_MEMBER_ROLES = [
  { value: "all", label: "All Roles" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
] as const;

export const TEAM_MEMBERS_TOTAL_RECORDS = 97;
