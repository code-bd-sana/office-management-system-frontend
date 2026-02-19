import {
  ClipboardList,
  ListChecks,
  FileText,
} from "lucide-react";

import type { Task, TaskPipelineStepData, TaskFilterTab } from "@/types/task";

// ---------------------------------------------------------------------------
// Pipeline steps (flow: All Tasks → To Do → Submit DCR)
// ---------------------------------------------------------------------------

export const TASK_PIPELINE_STEPS: TaskPipelineStepData[] = [
  {
    id: "all-tasks",
    label: "All Tasks",
    count: 8,
    icon: ClipboardList,
    bgColor: "bg-[#e7f1fd]",
    arrowColor: "text-[#6B7280]",
  },
  {
    id: "todo",
    label: "To Do",
    count: 8,
    icon: ListChecks,
    bgColor: "bg-[#e7f1fd]",
    arrowColor: "text-[#6B7280]",
  },
  {
    id: "submit-dcr",
    label: "Submit DCR",
    count: 0,
    icon: FileText,
    bgColor: "bg-[#e7f1fd]",
  },
];

// ---------------------------------------------------------------------------
// Filter tabs
// ---------------------------------------------------------------------------

export const TASK_FILTER_TABS: TaskFilterTab[] = [
  { label: "All", value: "all", count: 8 },
  { label: "To Do", value: "todo", count: 4 },
  { label: "In Progress", value: "in-progress", count: 1 },
  { label: "Completed", value: "completed", count: 3 },
];

// ---------------------------------------------------------------------------
// Demo tasks
// ---------------------------------------------------------------------------

export const DEMO_TASKS: Task[] = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Tmtactics",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026", // backward compatibility
    status: "in-progress",
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Cresify",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "todo",
  },
  {
    id: "3",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Tmtactics",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "todo",
  },
  {
    id: "4",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Cresify",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "todo",
  },
  {
    id: "5",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Tmtactics",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "completed",
  },
  {
    id: "6",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Cresify",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "completed",
  },
  {
    id: "7",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Tmtactics",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "completed",
  },
  {
    id: "8",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    client: "Ann Culhane",
    profile: "Code_bd",
    project: "Cresify",
    dueDate: "Jan 25, 2026",
    date: "Jan 26, 2026",
    status: "todo",
  },
];
