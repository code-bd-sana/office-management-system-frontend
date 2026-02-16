import type { Project, ProjectFilterTab } from "@/types/project";

// ---------------------------------------------------------------------------
// Filter tabs
// ---------------------------------------------------------------------------

export const PROJECT_FILTER_TABS: ProjectFilterTab[] = [
  { label: "All", value: "all", count: 8 },
  { label: "Running", value: "running", count: 4 },
  { label: "New Assigned", value: "new-assigned", count: 1 },
  { label: "Delivered", value: "delivered", count: 3 },
];

// ---------------------------------------------------------------------------
// Demo projects
// ---------------------------------------------------------------------------

export const DEMO_PROJECTS: Project[] = [
  {
    id: "1",
    projectName: "Website Redesign",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "running",
  },
  {
    id: "2",
    projectName: "E-Commerce Redesigned",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "delivered",
  },
  {
    id: "3",
    projectName: "E-Commerce Redesigned",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "delivered",
  },
  {
    id: "4",
    projectName: "Website Redesign",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "running",
  },
  {
    id: "5",
    projectName: "Website Redesign",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "delivered",
  },
  {
    id: "6",
    projectName: "Website Redesign",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "running",
  },
  {
    id: "7",
    projectName: "E-Commerce Redesigned",
    client: "Ann Culhane",
    orderId: "FOC2F64434748",
    profile: "Code_bd",
    projectFile: "Review E-Commence Update",
    projectFileUrl: "#",
    status: "new-assigned",
  },
];
