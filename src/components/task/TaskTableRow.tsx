import { Eye, Edit2, Trash2, FileUp, FileCheck } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task, TaskStatus } from "@/types/task";

interface TaskTableRowProps {
  task: Task;
  rowNumber: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canChangeStatus?: boolean;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onSubmitDcr?: () => void;
  onViewDcr?: () => void;
}

/* ── Status badge config ────────────────────────────────────── */
const STATUS_CONFIG: Record<
  TaskStatus,
  { bg: string; text: string; label: string }
> = {
  PENDING: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "Pending",
  },
  WORK_IN_PROGRESS: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "In Progress",
  },
  COMPLETED: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Completed",
  },
  BLOCKED: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Blocked",
  },
  DELIVERED: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    label: "Delivered",
  },
};

/* ── Priority badge config ──────────────────────────────────── */
const PRIORITY_CONFIG: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  LOW: { bg: "bg-gray-100", text: "text-gray-600", label: "Low" },
  MEDIUM: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Medium" },
  HIGH: { bg: "bg-orange-100", text: "text-orange-700", label: "High" },
  CRITICAL: { bg: "bg-red-100", text: "text-red-700", label: "Critical" },
};

/* ── Helpers ────────────────────────────────────────────────── */
function resolveProjectName(
  field: string | { _id: string; name: string } | null | undefined,
): string {
  if (!field) return "—";
  if (typeof field === "string") return field;
  return field.name || "—";
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ── All status options for dropdown ─────────────────────────── */
const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "WORK_IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "DELIVERED", label: "Delivered" },
];

export function TaskTableRow({ task, rowNumber, onView, onEdit, onDelete, canChangeStatus, onStatusChange, onSubmitDcr, onViewDcr }: TaskTableRowProps) {
  const dcrStatus = task.dcrSubmissionStatus ?? "NOT_SUBMITTED";
  const hasSubmittedDcr = dcrStatus !== "NOT_SUBMITTED";
  const statusCfg = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.PENDING;
  const priorityCfg = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.LOW;

  return (
    <TableRow className="border-b border-border/40 hover:bg-muted/30">
      {/* Checkbox */}
      <TableCell className="py-3.5 pl-5">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
          aria-label={`Select task ${rowNumber}`}
        />
      </TableCell>

      {/* # */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm font-medium text-foreground/70">
        {rowNumber}
      </TableCell>

      {/* Task Name */}
      <TableCell className="py-3.5 text-sm text-foreground">
        <div className="max-w-70 truncate">{task.name}</div>
      </TableCell>

      {/* Project */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {resolveProjectName(task.project)}
      </TableCell>

      {/* Due Date */}
      <TableCell className="whitespace-nowrap py-3.5 text-sm text-foreground/70">
        {formatDate(task.dueDate)}
      </TableCell>

      {/* Priority */}
      <TableCell className="whitespace-nowrap py-3.5">
        <span
          className={`inline-block w-20 rounded-sm px-2.5 py-1 text-center text-xs font-semibold ${priorityCfg.bg} ${priorityCfg.text}`}
        >
          {priorityCfg.label}
        </span>
      </TableCell>

      {/* Status */}
      <TableCell className="whitespace-nowrap py-3.5">
        {canChangeStatus && onStatusChange ? (
          <Select
            value={task.status}
            onValueChange={(v) => onStatusChange(task._id, v as TaskStatus)}
          >
            <SelectTrigger
              className={`h-auto w-28 rounded-sm border-0 px-2.5 py-1 text-xs font-semibold ${statusCfg.bg} ${statusCfg.text} focus:ring-1`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((o) => {
                const cfg = STATUS_CONFIG[o.value];
                return (
                  <SelectItem key={o.value} value={o.value}>
                    <span className={`text-xs font-semibold ${cfg.text}`}>
                      {o.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        ) : (
          <span
            className={`inline-block w-24 rounded-sm px-2.5 py-1 text-center text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}
          >
            {statusCfg.label}
          </span>
        )}
      </TableCell>

      {/* DCR */}
      <TableCell className="whitespace-nowrap py-3.5">
        {hasSubmittedDcr ? (
          <button
            type="button"
            onClick={onViewDcr}
            className="inline-flex items-center gap-1.5 rounded-sm bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors hover:bg-green-200"
            title="View DCR"
          >
            <FileCheck className="h-3.5 w-3.5" />
            View DCR
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmitDcr}
            className="inline-flex items-center gap-1.5 rounded-sm bg-brand-navy/10 px-3 py-1.5 text-xs font-semibold text-brand-navy transition-colors hover:bg-brand-navy/20"
            title="Submit DCR"
          >
            <FileUp className="h-3.5 w-3.5" />
            Submit DCR
          </button>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell className="whitespace-nowrap py-3.5 pl-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <button
            onClick={onView}
            className="text-brand-navy hover:text-brand-navy-dark transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={onEdit}
            className="text-orange-500 hover:text-orange-600 transition-colors"
            title="Edit Task"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
