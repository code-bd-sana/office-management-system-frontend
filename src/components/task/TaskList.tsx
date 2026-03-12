"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { ModalTable, type ColumnDef } from "@/components/shared";
import { TaskTableRow } from "./TaskTableRow";
import { ViewTaskModal } from "./ViewTaskModal";
import { EditTaskModal } from "./EditTaskModal";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TaskManagementService } from "@/api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";
import type { Task, TaskStatus } from "@/types/task";

const CAN_CHANGE_STATUS_ROLES = ["SUPER ADMIN", "PROJECT MANAGER", "TEAM LEADER"];

/* ─── Table columns ───────────────────────────────────────── */
const COLUMNS: ColumnDef[] = [
  { key: "number", label: "#" },
  { key: "task", label: "Task" },
  { key: "project", label: "Project" },
  { key: "dueDate", label: "Due Date" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions", className: "w-[120px]" },
];

/* ─── Status filter tabs ──────────────────────────────────── */
const FILTER_TABS = [
  { label: "All", value: "all" as const },
  { label: "Pending", value: "PENDING" as const },
  { label: "In Progress", value: "WORK_IN_PROGRESS" as const },
  { label: "Completed", value: "COMPLETED" as const },
  { label: "Blocked", value: "BLOCKED" as const },
  { label: "Delivered", value: "DELIVERED" as const },
];

type FilterValue = TaskStatus | "all";

/* ─── Component ───────────────────────────────────────────── */
interface TaskListProps {
  refreshKey?: number;
}

export function TaskList({ refreshKey }: TaskListProps) {
  const token = useAccessToken();
  const { role } = useUserInfo();
  const canChangeStatus = !!role && CAN_CHANGE_STATUS_ROLES.includes(role);

  /* ── Data state ─────────────────────────────────────────── */
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ── Server-driven filters ──────────────────────────────── */
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ── Action modal state ─────────────────────────────────── */
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // debounce search
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [search]);

  /* ── Fetch tasks ────────────────────────────────────────── */
  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await TaskManagementService.taskControllerFindAll({
        authorization: token,
        pageNo: currentPage,
        pageSize: rowsPerPage,
        ...(debouncedSearch && { searchKey: debouncedSearch }),
        ...(activeFilter !== "all" && { status: activeFilter as Exclude<FilterValue, "all"> }),
      });

      const data = (res as any)?.data;
      const list: Task[] = Array.isArray(data?.tasks)
        ? data.tasks
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];
      const total: number = data?.total ?? list.length;

      setTasks(list);
      setTotalRecords(total);
    } catch (err: any) {
      const msg =
        err?.body?.message ?? "Failed to load tasks. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, rowsPerPage, debouncedSearch, activeFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refreshKey]);

  /* ── Filter / pagination handlers ────────────────────────── */
  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  /* ── Action handlers ─────────────────────────────────────── */
  const openView = (id: string) => {
    setSelectedTaskId(id);
    setIsViewOpen(true);
  };

  const openEdit = (id: string) => {
    setSelectedTaskId(id);
    setIsEditOpen(true);
  };

  const openDelete = (id: string) => {
    setSelectedTaskId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTaskId || !token) return;
    setIsDeleting(true);
    try {
      await TaskManagementService.taskControllerDelete({
        id: selectedTaskId,
        authorization: token,
      });
      toast.success("Task deleted successfully.");
      fetchTasks();
      setIsDeleteOpen(false);
    } catch (err: any) {
      toast.error(err?.body?.message ?? "Failed to delete task.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    if (!token) return;
    try {
      await TaskManagementService.taskControllerUpdateTaskStatus({
        id: taskId,
        authorization: token,
        requestBody: { status: newStatus } as any,
      });
      toast.success("Status updated successfully.");
      fetchTasks();
    } catch (err: any) {
      toast.error(err?.body?.message ?? "Failed to update status.");
    }
  };

  const noopFilter = (data: Task[]) => data;

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="space-y-4">
      {/* ── Heading + refresh ───────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          My Assigned Tasks
        </h2>
        <button
          type="button"
          onClick={() => fetchTasks()}
          disabled={loading}
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-border/40 bg-white text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
          aria-label="Refresh"
          title="Refresh tasks"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* ── Filter tabs ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleFilterChange(tab.value)}
            className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
              activeFilter === tab.value
                ? "bg-brand-navy text-white"
                : "bg-gray-100 text-foreground/70 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Table / loading / empty ─────────────────────────── */}
      {loading && tasks.length === 0 ? (
        <div className="flex items-center justify-center rounded-sm border border-border/40 py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading tasks…
          </span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-border/40 py-16 text-center">
          <p className="text-sm font-medium text-foreground/70">
            No tasks found
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {activeFilter !== "all" || debouncedSearch
              ? "Try adjusting your filters or search term."
              : "No tasks have been assigned yet."}
          </p>
        </div>
      ) : (
        <ModalTable<Task, FilterValue>
          data={tasks}
          columns={COLUMNS}
          totalRecords={totalRecords}
          enableSearch={true}
          searchPlaceholder="Search tasks…"
          onFilterData={noopFilter as any}
          onSearchChange={(val) => setSearch(val)}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={(task, index) => (
            <TaskTableRow
              key={task._id}
              task={task}
              rowNumber={(currentPage - 1) * rowsPerPage + index + 1}
              onView={() => openView(task._id)}
              onEdit={() => openEdit(task._id)}
              onDelete={() => openDelete(task._id)}
              canChangeStatus={canChangeStatus}
              onStatusChange={handleStatusChange}
            />
          )}
          enableCheckboxes={true}
          rowsPerPageOptions={[10, 20, 50, 100]}
          defaultRowsPerPage={rowsPerPage}
        />
      )}

      {/* ── View Task Modal ─────────────────────────────────── */}
      <ViewTaskModal
        taskId={selectedTaskId}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />

      {/* ── Edit Task Modal ─────────────────────────────────── */}
      <EditTaskModal
        taskId={selectedTaskId}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onUpdated={fetchTasks}
      />

      {/* ── Delete Confirmation ─────────────────────────────── */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-sm h-9">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white rounded-sm h-9"
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting
                </>
              ) : (
                "Delete Task"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
