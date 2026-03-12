import type { LucideIcon } from "lucide-react";

/** Possible statuses for a task (matches API enum) */
export type TaskStatus =
  | "PENDING"
  | "WORK_IN_PROGRESS"
  | "COMPLETED"
  | "BLOCKED"
  | "DELIVERED";

/** DCR submission status enum */
export type DcrSubmissionStatus =
  | "NOT_SUBMITTED"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED";

/** A single task from the API */
export interface Task {
  _id: string;
  name: string;
  project: string | { _id: string; name: string };
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description?: string;
  status: TaskStatus;
  assignTo?: string[];
  createdBy?: string | { _id: string; name: string };
  createdAt?: string;
  updatedAt?: string;
  dcrLinks?: string[];
  dcrSubmissionStatus?: DcrSubmissionStatus;
  dcrApprovedBy?: { _id: string; name: string } | null;
  dcrRejectedBy?: { _id: string; name: string } | null;
  reviewReply?: Array<{
    reviewer: { _id: string; name: string } | null;
    comment: string;
    createdAt: string;
  }>;
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
