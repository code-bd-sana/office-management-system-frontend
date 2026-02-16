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
  { label: "All", value: "all", count: 7 },
  { label: "To Do", value: "todo", count: 4 },
  { label: "In Progress", value: "in-progress", count: 1 },
  { label: "Completed", value: "completed", count: 2 },
];

// ---------------------------------------------------------------------------
// Demo tasks
// ---------------------------------------------------------------------------

export const DEMO_TASKS: Task[] = [
  {
    id: "1",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "completed",
  },
  {
    id: "2",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "completed",
  },
  {
    id: "3",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "completed",
  },
  {
    id: "4",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "todo",
  },
  {
    id: "5",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "todo",
  },
  {
    id: "6",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "in-progress",
  },
  {
    id: "7",
    title: "Review and E-Commerce home page complete and client update",
    date: "Jan 26, 2026",
    status: "todo",
  },
];
