"use client";

import { useEffect, useState } from "react";
import { Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { TaskManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import type { Task, TaskStatus } from "@/types/task";

/* ── Status / Priority display config ──────────────────────── */
const STATUS_LABEL: Record<TaskStatus, { label: string; className: string }> = {
  PENDING:          { label: "Pending",     className: "bg-orange-100 text-orange-700" },
  WORK_IN_PROGRESS: { label: "In Progress", className: "bg-blue-100 text-blue-700"    },
  COMPLETED:        { label: "Completed",   className: "bg-green-100 text-green-700"   },
  BLOCKED:          { label: "Blocked",     className: "bg-red-100 text-red-700"       },
  DELIVERED:        { label: "Delivered",    className: "bg-purple-100 text-purple-700" },
};

const PRIORITY_LABEL: Record<string, { label: string; className: string }> = {
  LOW:      { label: "Low",      className: "bg-gray-100 text-gray-600"     },
  MEDIUM:   { label: "Medium",   className: "bg-yellow-100 text-yellow-700" },
  HIGH:     { label: "High",     className: "bg-orange-100 text-orange-700" },
  CRITICAL: { label: "Critical", className: "bg-red-100 text-red-700"       },
};

/* ── Helpers ────────────────────────────────────────────────── */
function resolveName(field: any): string {
  if (!field) return "—";
  if (typeof field === "string") return field;
  return field.name || "—";
}

function formatDate(dateString?: string): string {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/* ── Props ──────────────────────────────────────────────────── */
interface ViewTaskModalProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ── Component ──────────────────────────────────────────────── */
export function ViewTaskModal({ taskId, open, onOpenChange }: ViewTaskModalProps) {
  const token = useAccessToken();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (open && taskId && token) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const res = await TaskManagementService.taskControllerFindOne({
            id: taskId,
            authorization: token,
          });
          const data = (res as any)?.data;
          setTask(data);
        } catch (err: any) {
          toast.error(err?.body?.message ?? "Failed to load task details.");
          onOpenChange(false);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else {
      setTask(null);
    }
  }, [open, taskId, token, onOpenChange]);

  const statusCfg = task ? (STATUS_LABEL[task.status] ?? STATUS_LABEL.PENDING) : null;
  const priorityCfg = task ? (PRIORITY_LABEL[task.priority] ?? PRIORITY_LABEL.LOW) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] max-w-xl overflow-y-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-brand-navy">
            Task Details
          </DialogTitle>
          <DialogDescription>
            Detailed view of the selected task.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !task ? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No details available.
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-foreground">
                  {task.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Project:{" "}
                  <span className="font-medium text-foreground">
                    {resolveName(task.project)}
                  </span>
                </p>
              </div>
              {statusCfg && (
                <span
                  className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusCfg.className}`}
                >
                  {statusCfg.label}
                </span>
              )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-2 sm:gap-y-4">
              <div>
                <span className="block text-muted-foreground">Priority</span>
                {priorityCfg && (
                  <span
                    className={`mt-1 inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${priorityCfg.className}`}
                  >
                    {priorityCfg.label}
                  </span>
                )}
              </div>
              <div>
                <span className="block text-muted-foreground">Due Date</span>
                <span className="font-medium flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(task.dueDate)}
                </span>
              </div>
              {task.assignTo && task.assignTo.length > 0 && (
                <div className="col-span-2">
                  <span className="block text-muted-foreground">Assigned To</span>
                  <span className="font-medium">
                    {task.assignTo.length} user(s)
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="rounded-md border bg-muted/30 p-3">
              <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                Description
              </span>
              <p className="text-sm whitespace-pre-wrap">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
