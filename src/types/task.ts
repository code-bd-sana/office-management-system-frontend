import type { LucideIcon } from "lucide-react";

/** Possible statuses for a task */
export type TaskStatus = "todo" | "in-progress" | "completed";

/** A single task item */
export interface Task {
  id: string;
  title: string;
  date: string;
  status: TaskStatus;
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
