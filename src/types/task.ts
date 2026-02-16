import type { LucideIcon } from "lucide-react";

/** Possible statuses for a task */
export type TaskStatus = "todo" | "in-progress" | "completed";

/** A single task item */
export interface Task {
  id: string;
  title: string;
  client: string;
  profile: string;
  project: string;
  dueDate: string;
  status: TaskStatus;
  // Legacy field for backward compatibility with existing task list
  date?: string;
}

/** Pipeline step displayed in the task flow */
export interface TaskPipelineStepData {
  id: string;
  label: string;
  count: number;
  icon: LucideIcon;
  bgColor: string;
  arrowColor?: string;
}

/** Filter tab for the task list */
export interface TaskFilterTab {
  label: string;
  value: TaskStatus | "all";
  count: number;
}
