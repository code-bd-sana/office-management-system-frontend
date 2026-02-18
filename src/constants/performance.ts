import type { PerformanceMember } from "@/types/performance";

export const PERFORMANCE_TABLE_COLUMNS = [
  "#",
  "MEMBER",
  "DESIGNATION",
  "TOTAL PROJECTS",
  "WIP",
  "DELIVERED",
  "PENDING",
  "AVG. RAITNG",
];

export const PERFORMANCE_ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

export const PERFORMANCE_TOTAL_RECORDS = 97;

const designations = [
  "Full-stack Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Web Developer",
];

const totalProjectsData = [3, 4, 1, 4, 3, 5, 3, 5, 3];
const wipData = [1, 2, 3, 2, 1, 1, 1, 1, 1];
const deliveredData = [1, 2, 3, 2, 1, 1, 1, 1, 1];
const pendingData = [1, 2, 3, 2, 1, 1, 1, 1, 1];

export const DEMO_PERFORMANCE_MEMBERS: PerformanceMember[] = Array.from(
  { length: 9 },
  (_, i) => ({
    id: `pm-${i + 1}`,
    name: "Mahin R.",
    designation: designations[i % designations.length],
    totalProjects: totalProjectsData[i],
    wip: wipData[i],
    delivered: deliveredData[i],
    pending: pendingData[i],
    avgRating: "4.7/5",
  })
);

export const PERFORMANCE_ROLE_OPTIONS = [
  "All Roles",
  "Full-stack Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Web Developer",
];
