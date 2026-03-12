"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  FileText,
  Image,
  File,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { TaskManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import type { Task, DcrSubmissionStatus } from "@/types/task";

/* ── Roles that can approve/reject DCR ──────────────────────── */
const CAN_REVIEW_DCR_ROLES = ["PROJECT MANAGER", "TEAM LEADER"];

/* ── Status display config ──────────────────────────────────── */
const DCR_STATUS_CONFIG: Record<
  DcrSubmissionStatus,
  { bg: string; text: string; label: string; icon: typeof Clock }
> = {
  NOT_SUBMITTED: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    label: "Not Submitted",
    icon: Clock,
  },
  SUBMITTED: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Submitted",
    icon: Clock,
  },
  APPROVED: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Approved",
    icon: CheckCircle2,
  },
  REJECTED: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Rejected",
    icon: XCircle,
  },
};

/* ── Helpers ─────────────────────────────────────────────────── */
function getFileIcon(url: string) {
  const lower = url.toLowerCase();
  if (
    lower.includes(".jpg") ||
    lower.includes(".jpeg") ||
    lower.includes(".png") ||
    lower.includes(".webp")
  )
    return <Image className="h-4 w-4 text-blue-500" />;
  if (lower.includes(".pdf"))
    return <FileText className="h-4 w-4 text-red-500" />;
  return <File className="h-4 w-4 text-gray-500" />;
}

function formatDateTime(dateString?: string): string {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

function resolveName(field: any): string {
  if (!field) return "—";
  if (typeof field === "string") return field;
  return field.name || "—";
}

/* ── Props ──────────────────────────────────────────────────── */
interface ViewDCRModalProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChanged?: () => void;
}

/* ── Component ──────────────────────────────────────────────── */
export function ViewDCRModal({
  taskId,
  open,
  onOpenChange,
  onStatusChanged,
}: ViewDCRModalProps) {
  const token = useAccessToken();
  const { role } = useUserInfo();
  const canReview =
    !!role && CAN_REVIEW_DCR_ROLES.includes(role);

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  /* ── Status action state ─────────────────────────────────── */
  const [statusUpdating, setStatusUpdating] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  /* ── Reply state ─────────────────────────────────────────── */
  const [replyComment, setReplyComment] = useState("");
  const [replying, setReplying] = useState(false);

  /* ── Fetch task ──────────────────────────────────────────── */
  const fetchTask = useCallback(async () => {
    if (!taskId || !token) return;
    setLoading(true);
    try {
      const res = await TaskManagementService.taskControllerFindOne({
        id: taskId,
        authorization: token,
      });
      setTask((res as any)?.data ?? null);
    } catch (err: any) {
      toast.error(err?.body?.message ?? "Failed to load task details.");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }, [taskId, token, onOpenChange]);

  useEffect(() => {
    if (open && taskId && token) {
      fetchTask();
    } else {
      setTask(null);
      setReplyComment("");
    }
  }, [open, taskId, token, fetchTask]);

  /* ── Update DCR status ───────────────────────────────────── */
  const handleStatusUpdate = async (
    newStatus: "APPROVED" | "REJECTED",
  ) => {
    if (!taskId || !token) return;
    setStatusUpdating(newStatus);
    try {
      await TaskManagementService.taskControllerUpdateDcrSubmissionStatus({
        id: taskId,
        authorization: token,
        requestBody: { status: newStatus } as any,
      });
      toast.success(
        `DCR ${newStatus === "APPROVED" ? "approved" : "rejected"} successfully.`,
      );
      fetchTask();
      onStatusChanged?.();
    } catch (err: any) {
      toast.error(err?.body?.message ?? "Failed to update DCR status.");
    } finally {
      setStatusUpdating(null);
    }
  };

  /* ── Reply on DCR review ─────────────────────────────────── */
  const handleReply = async () => {
    if (!taskId || !token || !replyComment.trim()) return;
    setReplying(true);
    try {
      await TaskManagementService.taskControllerReplyOnDcrReview({
        id: taskId,
        authorization: token,
        requestBody: { comment: replyComment.trim() },
      });
      toast.success("Reply added successfully.");
      setReplyComment("");
      fetchTask();
    } catch (err: any) {
      toast.error(err?.body?.message ?? "Failed to add reply.");
    } finally {
      setReplying(false);
    }
  };

  /* ── Derived ─────────────────────────────────────────────── */
  const dcrStatus: DcrSubmissionStatus =
    task?.dcrSubmissionStatus ?? "NOT_SUBMITTED";
  const statusCfg = DCR_STATUS_CONFIG[dcrStatus];
  const StatusIcon = statusCfg.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-brand-navy">
            DCR Details
          </DialogTitle>
          <DialogDescription>
            {task
              ? `DCR submission for "${task.name}"`
              : "View DCR submission details"}
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
            {/* ── Status badge ──────────────────────────────── */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground/70">
                  Status:
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" />
                  {statusCfg.label}
                </span>
              </div>

              {/* Approved/Rejected by info */}
              {task.dcrApprovedBy && (
                <span className="text-xs text-green-600">
                  Approved by {resolveName(task.dcrApprovedBy)}
                </span>
              )}
              {task.dcrRejectedBy && (
                <span className="text-xs text-red-600">
                  Rejected by {resolveName(task.dcrRejectedBy)}
                </span>
              )}
            </div>

            {/* ── Approve / Reject buttons ──────────────────── */}
            {canReview && dcrStatus === "SUBMITTED" && (
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  className="rounded-sm bg-green-600 text-white hover:bg-green-700"
                  disabled={!!statusUpdating}
                  onClick={() => handleStatusUpdate("APPROVED")}
                >
                  {statusUpdating === "APPROVED" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-sm border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  disabled={!!statusUpdating}
                  onClick={() => handleStatusUpdate("REJECTED")}
                >
                  {statusUpdating === "REJECTED" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <XCircle className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Reject
                </Button>
              </div>
            )}

            {/* ── DCR Files ─────────────────────────────────── */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground/80">
                Submitted Files ({task.dcrLinks?.length ?? 0})
              </h4>
              {task.dcrLinks && task.dcrLinks.length > 0 ? (
                <div className="max-h-52 space-y-2 overflow-y-auto">
                  {task.dcrLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-sm bg-muted/40 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {getFileIcon(link)}
                        <span className="truncate text-sm text-foreground/80">
                          File {idx + 1}
                        </span>
                      </div>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-brand-navy/10 px-3 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:bg-brand-navy/20"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No files submitted.
                </p>
              )}
            </div>

            {/* ── Divider ───────────────────────────────────── */}
            <div className="h-px bg-border/40" />

            {/* ── Review Replies ─────────────────────────────── */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground/80">
                Review Comments ({task.reviewReply?.length ?? 0})
              </h4>
              {task.reviewReply && task.reviewReply.length > 0 ? (
                <div className="max-h-60 space-y-3 overflow-y-auto">
                  {task.reviewReply.map((reply, idx) => (
                    <div
                      key={idx}
                      className="rounded-sm border border-border/40 bg-muted/20 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground/80">
                          {resolveName(reply.reviewer)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(reply.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                        {reply.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No review comments yet.
                </p>
              )}
            </div>

            {/* ── Add Reply ──────────────────────────────────── */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground/80">
                Add a Comment
              </h4>
              <Textarea
                placeholder="Write your review comment…"
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                rows={3}
                className="rounded-sm resize-none text-sm"
              />
              <Button
                size="sm"
                className="mt-3 rounded-sm bg-brand-navy hover:bg-brand-navy-dark"
                disabled={replying || !replyComment.trim()}
                onClick={handleReply}
              >
                {replying ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="mr-1.5 h-3.5 w-3.5" />
                )}
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
