"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Check, ChevronsUpDown, X } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import {
  TaskManagementService,
  ProjectManagementService,
  UserManagementService,
} from "@/api";
import { CreateTaskDto } from "@/api/models/CreateTaskDto";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";

const CAN_ASSIGN_ROLES = ["SUPER ADMIN", "PROJECT MANAGER", "TEAM LEADER"];

/* ── Types ──────────────────────────────────────────────────── */
interface SelectOption {
  id: string;
  label: string;
}

/* ── Enum options ───────────────────────────────────────────── */
const PRIORITY_OPTIONS: { value: CreateTaskDto.priority; label: string }[] = [
  { value: CreateTaskDto.priority.LOW, label: "Low" },
  { value: CreateTaskDto.priority.MEDIUM, label: "Medium" },
  { value: CreateTaskDto.priority.HIGH, label: "High" },
  { value: CreateTaskDto.priority.CRITICAL, label: "Critical" },
];

const STATUS_OPTIONS: { value: CreateTaskDto.status; label: string }[] = [
  { value: CreateTaskDto.status.PENDING, label: "Pending" },
  { value: CreateTaskDto.status.WORK_IN_PROGRESS, label: "In Progress" },
  { value: CreateTaskDto.status.COMPLETED, label: "Completed" },
  { value: CreateTaskDto.status.BLOCKED, label: "Blocked" },
  { value: CreateTaskDto.status.DELIVERED, label: "Delivered" },
];

/* ── Debounce hook ──────────────────────────────────────────── */
function useDebounce(value: string, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* ── Props ──────────────────────────────────────────────────── */
interface EditTaskModalProps {
  taskId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
}

/* ── Component ──────────────────────────────────────────────── */
export function EditTaskModal({
  taskId,
  open,
  onOpenChange,
  onUpdated,
}: EditTaskModalProps) {
  const token = useAccessToken();
  const { role } = useUserInfo();
  const canAssign = !!role && CAN_ASSIGN_ROLES.includes(role);

  /* ── Loading states ─────────────────────────────────────── */
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ── Form state ─────────────────────────────────────────── */
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectLabel, setProjectLabel] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<CreateTaskDto.priority | "">("");
  const [status, setStatus] = useState<CreateTaskDto.status | "">("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState<SelectOption[]>([]);

  /* ── Project search ────────────────────────────────────── */
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const debouncedProjectSearch = useDebounce(projectSearch);
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  /* ── User search ───────────────────────────────────────── */
  const [userOpen, setUserOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const debouncedUserSearch = useDebounce(userSearch);
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  /* ── Fetch task details on open ─────────────────────────── */
  useEffect(() => {
    if (!open || !taskId || !token) return;

    const load = async () => {
      setFetching(true);
      try {
        const res = await TaskManagementService.taskControllerFindOne({
          id: taskId,
          authorization: token,
        });
        const task = (res as any)?.data;
        if (!task) return;

        setName(task.name ?? "");
        setDescription(task.description ?? "");
        setPriority((task.priority as CreateTaskDto.priority) ?? "");
        setStatus((task.status as CreateTaskDto.status) ?? "");

        // Due date → YYYY-MM-DD for <input type="date">
        if (task.dueDate) {
          setDueDate(new Date(task.dueDate).toISOString().slice(0, 10));
        }

        // Project — can be string or object
        if (task.project) {
          if (typeof task.project === "string") {
            setProjectId(task.project);
            setProjectLabel(task.project);
          } else {
            setProjectId(task.project._id);
            setProjectLabel(task.project.name || task.project._id);
          }
        }

        // Assigned users — may be array of strings or objects
        if (Array.isArray(task.assignTo)) {
          setAssignTo(
            task.assignTo.map((u: any) =>
              typeof u === "string"
                ? { id: u, label: u }
                : {
                    id: u._id ?? u.id,
                    label:
                      u.name ??
                      (`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() ||
                        u.email ||
                        u._id),
                  },
            ),
          );
        }
      } catch (err: any) {
        toast.error(err?.body?.message ?? "Failed to load task.");
        onOpenChange(false);
      } finally {
        setFetching(false);
      }
    };

    load();
  }, [open, taskId, token, onOpenChange]);

  /* ── Fetch projects ─────────────────────────────────────── */
  const fetchProjects = useCallback(
    async (search: string) => {
      if (!token) return;
      setProjectsLoading(true);
      try {
        const res: any =
          await ProjectManagementService.projectControllerFindAll({
            pageNo: 1,
            pageSize: 20,
            authorization: token,
            searchKey: search || undefined,
          });
        const list: any[] = res?.data?.projects ?? res?.data?.data ?? [];
        setProjects(
          list.map((p: any) => ({
            id: p._id ?? p.id,
            label: p.name ?? p.projectName ?? p._id,
          })),
        );
      } catch {
        setProjects([]);
      } finally {
        setProjectsLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    if (projectOpen) fetchProjects(debouncedProjectSearch);
  }, [projectOpen, debouncedProjectSearch, fetchProjects]);

  /* ── Fetch users ────────────────────────────────────────── */
  const fetchUsers = useCallback(
    async (search: string) => {
      if (!token) return;
      setUsersLoading(true);
      try {
        const res: any =
          await UserManagementService.userControllerGetUsers({
            pageNo: 1,
            pageSize: 20,
            authorization: token,
            searchKey: search || undefined,
          });
        const list: any[] = res?.data?.users ?? res?.data?.data ?? [];
        setUsers(
          list.map((u: any) => ({
            id: u._id ?? u.id,
            label:
              u.name ??
              (`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() ||
                u.email ||
                u._id),
          })),
        );
      } catch {
        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    if (userOpen) fetchUsers(debouncedUserSearch);
  }, [userOpen, debouncedUserSearch, fetchUsers]);

  /* ── User helpers ───────────────────────────────────────── */
  const toggleUser = (user: SelectOption) => {
    setAssignTo((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user],
    );
  };

  const removeUser = (id: string) =>
    setAssignTo((prev) => prev.filter((u) => u.id !== id));

  /* ── Submit ─────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !taskId || !name.trim() || !projectId || !dueDate || !priority || !status)
      return;

    setSubmitting(true);
    try {
      await TaskManagementService.taskControllerUpdate({
        id: taskId,
        authorization: token,
        requestBody: {
          name: name.trim(),
          project: projectId,
          dueDate: new Date(dueDate).toISOString(),
          priority,
          ...(canAssign && { status }),
          description: description.trim(),
          ...(canAssign && { assignTo: assignTo.map((u) => u.id) }),
        } as any,
      });
      toast.success("Task updated successfully.");
      onOpenChange(false);
      onUpdated?.();
    } catch (err: any) {
      toast.error(
        err?.body?.message ?? "Failed to update task. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════
   * Render
   * ═══════════════════════════════════════════════════════════ */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto rounded-sm border-0 p-4 shadow-xl sm:max-w-180 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold text-foreground">
            Edit Task
          </DialogTitle>
          <DialogDescription>
            Update the task details below.
          </DialogDescription>
        </DialogHeader>

        {fetching ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Task Name */}
            <div className="space-y-1.5">
              <Label htmlFor="editTaskName" className="text-sm font-medium text-foreground">
                Task Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="editTaskName"
                placeholder="Enter your task name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-sm border-border/60 focus-visible:ring-brand-navy"
              />
            </div>

            {/* Project (searchable) */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">
                Project <span className="text-red-500">*</span>
              </Label>
              <Popover open={projectOpen} onOpenChange={setProjectOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={projectOpen}
                    className="w-full justify-between rounded-sm border-border/60 font-normal"
                  >
                    {projectLabel || "Select project"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search projects…"
                      value={projectSearch}
                      onValueChange={setProjectSearch}
                    />
                    <CommandList>
                      {projectsLoading ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : projects.length === 0 ? (
                        <CommandEmpty>No projects found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {projects.map((p) => (
                            <CommandItem
                              key={p.id}
                              value={p.id}
                              onSelect={() => {
                                setProjectId(p.id);
                                setProjectLabel(p.label);
                                setProjectOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  projectId === p.id ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {p.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Due Date + Priority row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="editDueDate" className="text-sm font-medium text-foreground">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="editDueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="rounded-sm border-border/60 focus-visible:ring-brand-navy"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  Priority <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={priority}
                  onValueChange={(v) => setPriority(v as CreateTaskDto.priority)}
                >
                  <SelectTrigger className="rounded-sm border-border/60 focus:ring-brand-navy">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status — hidden for EMPLOYEE */}
            {canAssign && (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as CreateTaskDto.status)}
              >
                <SelectTrigger className="rounded-sm border-border/60 focus:ring-brand-navy">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>)}

            {/* Assign To (multi-select) — hidden for EMPLOYEE */}
            {canAssign && (<div className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">
                Assign To
              </Label>

              {/* Selected chips */}
              {assignTo.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {assignTo.map((u) => (
                    <span
                      key={u.id}
                      className="inline-flex items-center gap-1 rounded-sm bg-brand-navy/10 px-2 py-0.5 text-xs font-medium text-brand-navy"
                    >
                      {u.label}
                      <button
                        type="button"
                        onClick={() => removeUser(u.id)}
                        className="ml-0.5 rounded-full hover:bg-brand-navy/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <Popover open={userOpen} onOpenChange={setUserOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={userOpen}
                    className="w-full justify-between rounded-sm border-border/60 font-normal"
                  >
                    {assignTo.length > 0
                      ? `${assignTo.length} user(s) selected`
                      : "Select users"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search users…"
                      value={userSearch}
                      onValueChange={setUserSearch}
                    />
                    <CommandList>
                      {usersLoading ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      ) : users.length === 0 ? (
                        <CommandEmpty>No users found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {users.map((u) => (
                            <CommandItem
                              key={u.id}
                              value={u.id}
                              onSelect={() => toggleUser(u)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  assignTo.some((a) => a.id === u.id)
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {u.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>)}

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="editDesc" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                id="editDesc"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="rounded-sm resize-none border-border/60 focus-visible:ring-brand-navy"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting || !name.trim() || !projectId || !dueDate || !priority || (canAssign && !status)}
              className="w-full rounded-sm bg-brand-navy text-white shadow-sm hover:bg-brand-navy-dark"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating…
                </>
              ) : (
                "Update Task"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
