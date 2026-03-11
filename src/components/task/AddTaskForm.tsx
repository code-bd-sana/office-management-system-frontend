"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  TaskManagementService,
  ProjectManagementService,
  UserManagementService,
} from "@/api";
import { CreateTaskDto } from "@/api/models/CreateTaskDto";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useUserInfo } from "@/hooks/useUserInfo";

const CAN_ASSIGN_ROLES = ["SUPER ADMIN", "PROJECT MANAGER", "TEAM LEADER"];

// ---------------------------------------------------------------------------
// Priority options matching API enum
// ---------------------------------------------------------------------------
const PRIORITY_OPTIONS: { value: CreateTaskDto.priority; label: string }[] = [
  { value: CreateTaskDto.priority.LOW, label: "Low" },
  { value: CreateTaskDto.priority.MEDIUM, label: "Medium" },
  { value: CreateTaskDto.priority.HIGH, label: "High" },
  { value: CreateTaskDto.priority.CRITICAL, label: "Critical" },
];

// ---------------------------------------------------------------------------
// Lightweight option type for dropdowns
// ---------------------------------------------------------------------------
interface SelectOption {
  id: string;
  label: string;
}

// ---------------------------------------------------------------------------
// Debounce helper
// ---------------------------------------------------------------------------
function useDebounce(value: string, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ═══════════════════════════════════════════════════════════════════════════
// AddTaskForm
// ═══════════════════════════════════════════════════════════════════════════

export function AddTaskForm({ onSubmit }: { onSubmit?: () => void }) {
  const token = useAccessToken();
  const { role } = useUserInfo();
  const canAssign = !!role && CAN_ASSIGN_ROLES.includes(role);

  // ---- form state --------------------------------------------------------
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectLabel, setProjectLabel] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<CreateTaskDto.priority | "">("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState<SelectOption[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // ---- project search state ----------------------------------------------
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const debouncedProjectSearch = useDebounce(projectSearch);
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  // ---- user search state -------------------------------------------------
  const [userOpen, setUserOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const debouncedUserSearch = useDebounce(userSearch);
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // ---- fetch projects on open / search -----------------------------------
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

  // ---- fetch users on open / search --------------------------------------
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
            label: u.name ?? (`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email || u._id),
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

  // ---- helpers -----------------------------------------------------------
  const toggleUser = (user: SelectOption) => {
    setAssignTo((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user],
    );
  };

  const removeUser = (id: string) =>
    setAssignTo((prev) => prev.filter((u) => u.id !== id));

  const resetForm = () => {
    setName("");
    setProjectId("");
    setProjectLabel("");
    setDueDate("");
    setPriority("");
    setDescription("");
    setAssignTo([]);
    setProjectSearch("");
    setUserSearch("");
  };

  // ---- submit ------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !name.trim() || !projectId || !dueDate || !priority) return;

    setSubmitting(true);
    try {
      await TaskManagementService.taskControllerCreate({
        authorization: token,
        requestBody: {
          name: name.trim(),
          project: projectId,
          dueDate: new Date(dueDate).toISOString(),
          priority,
          description: description.trim(),
          status: CreateTaskDto.status.PENDING,
          assignTo: assignTo.map((u) => u.id),
        },
      });
      toast.success("Task created successfully.");
      resetForm();
      onSubmit?.();
    } catch (err: any) {
      const msg =
        err?.body?.message ?? "Failed to create task. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ════════════════════════════════════════════════════════════════════════
  // Render
  // ════════════════════════════════════════════════════════════════════════

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Task Name */}
      <div className="space-y-1.5">
        <Label htmlFor="taskName" className="text-sm font-medium text-foreground">
          Task Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="taskName"
          placeholder="Enter your task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Project — searchable dropdown */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-foreground">
          Project <span className="text-red-500">*</span>
        </Label>
        <Popover open={projectOpen} onOpenChange={setProjectOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={projectOpen}
              className="h-11 w-full justify-between border-border/60 bg-white font-normal hover:bg-white"
            >
              <span className={cn(!projectId && "text-muted-foreground/50")}>
                {projectLabel || "Select project"}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search projects..."
                value={projectSearch}
                onValueChange={setProjectSearch}
              />
              <CommandList>
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-6">
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

      {/* Assign To — multi-select searchable dropdown (visible for TL / PM / SA only) */}
      {canAssign && (
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-foreground">
          Assign To
        </Label>
        <Popover open={userOpen} onOpenChange={setUserOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={userOpen}
              className="h-auto min-h-11 w-full justify-between border-border/60 bg-white font-normal hover:bg-white"
            >
              {assignTo.length > 0 ? (
                <span className="text-sm">{assignTo.length} user(s) selected</span>
              ) : (
                <span className="text-muted-foreground/50">Select users</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search users..."
                value={userSearch}
                onValueChange={setUserSearch}
              />
              <CommandList>
                {usersLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                ) : users.length === 0 ? (
                  <CommandEmpty>No users found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {users.map((u) => {
                      const selected = assignTo.some((s) => s.id === u.id);
                      return (
                        <CommandItem
                          key={u.id}
                          value={u.id}
                          onSelect={() => toggleUser(u)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {u.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected user chips */}
        {assignTo.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {assignTo.map((u) => (
              <span
                key={u.id}
                className="inline-flex items-center gap-1 rounded-sm bg-brand-navy/10 px-2 py-0.5 text-xs font-medium text-brand-navy"
              >
                {u.label}
                <button
                  type="button"
                  onClick={() => removeUser(u.id)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-brand-navy/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      )}

      {/* Due Date */}
      <div className="space-y-1.5">
        <Label htmlFor="dueDate" className="text-sm font-medium text-foreground">
          Due Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
      </div>

      {/* Priority */}
      <div className="space-y-1.5">
        <Label htmlFor="priority" className="text-sm font-medium text-foreground">
          Priority <span className="text-red-500">*</span>
        </Label>
        <Select
          value={priority}
          onValueChange={(v) => setPriority(v as CreateTaskDto.priority)}
          required
        >
          <SelectTrigger id="priority" className="h-11 w-full border-border/60 bg-white text-muted-foreground/50">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-sm font-medium text-foreground">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="h-10 rounded-sm bg-brand-navy px-8 text-sm font-semibold transition-all hover:bg-brand-navy-dark hover:shadow-md active:scale-[0.98]"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating…
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>
    </form>
  );
}
