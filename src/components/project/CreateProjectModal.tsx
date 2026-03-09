"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, X, FolderPlus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAccessToken } from "@/hooks/useAccessToken";
import {
  ProjectManagementService,
  DepartmentManagementService,
} from "@/api";
import { CreateProjectDto } from "@/api/models/CreateProjectDto";

/* ─── Types ───────────────────────────────────────────────── */
interface DropdownItem {
  _id: string;
  name: string;
}

/* ─── Enum options ────────────────────────────────────────── */
const STATUS_OPTIONS = Object.values(CreateProjectDto.status);
const TEAM_OPTIONS = Object.values(CreateProjectDto.projectTeam);

/* ─── Props ───────────────────────────────────────────────── */
interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void; // optional callback to refresh parent
}

/* ─── Initial form state ──────────────────────────────────── */
const INITIAL_FORM = {
  name: "",
  orderId: "",
  status: "" as CreateProjectDto.status | "",
  projectRemarks: "",
  projectFiles: [""], // start with one empty file URL slot
  client: "",
  profile: "",
  assignedDepartment: "",
  projectTeam: "" as CreateProjectDto.projectTeam | "",
  dueDate: "",
};

/* ─── Component ───────────────────────────────────────────── */
export function CreateProjectModal({
  open,
  onOpenChange,
  onCreated,
}: CreateProjectModalProps) {
  const token = useAccessToken();

  // ── Form state ───────────────────────────────────────────
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  // ── Dropdown data ────────────────────────────────────────
  const [clients, setClients] = useState<DropdownItem[]>([]);
  const [profiles, setProfiles] = useState<DropdownItem[]>([]);
  const [departments, setDepartments] = useState<DropdownItem[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  /* ── Fetch dropdown data on open ─────────────────────────── */
  const fetchDropdowns = useCallback(async () => {
    if (!token) return;
    setLoadingDropdowns(true);
    try {
      const [clientsRes, profilesRes, depsRes] = await Promise.all([
        ProjectManagementService.projectControllerGetClients({
          authorization: token,
        }),
        ProjectManagementService.projectControllerGetProfiles({
          authorization: token,
        }),
        DepartmentManagementService.departmentControllerFindAll({
          pageNo: 1,
          pageSize: 100,
        }),
      ]);
      setClients(Array.isArray((clientsRes as any)?.data) ? (clientsRes as any).data : []);
      setProfiles(Array.isArray((profilesRes as any)?.data) ? (profilesRes as any).data : []);
      // API returns { data: { departments: [], total, totalPages } }
      const depsData = (depsRes as any)?.data;
      setDepartments(
        Array.isArray(depsData?.departments)
          ? depsData.departments
          : Array.isArray(depsData)
            ? depsData
            : []
      );
    } catch {
      toast.error("Failed to load dropdown data.");
    } finally {
      setLoadingDropdowns(false);
    }
  }, [token]);

  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM);
      fetchDropdowns();
    }
  }, [open, fetchDropdowns]);

  /* ── Field helpers ───────────────────────────────────────── */
  const set = (key: keyof typeof INITIAL_FORM, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setFileUrl = (index: number, value: string) =>
    setForm((prev) => {
      const files = [...prev.projectFiles];
      files[index] = value;
      return { ...prev, projectFiles: files };
    });

  const addFileSlot = () =>
    setForm((prev) => ({
      ...prev,
      projectFiles: [...prev.projectFiles, ""],
    }));

  const removeFileSlot = (index: number) =>
    setForm((prev) => ({
      ...prev,
      projectFiles: prev.projectFiles.filter((_, i) => i !== index),
    }));

  /* ── Validation ──────────────────────────────────────────── */
  const isValid =
    form.name.trim() !== "" &&
    form.orderId.trim() !== "" &&
    form.status !== "" &&
    form.projectRemarks.trim() !== "" &&
    form.projectFiles.some((f) => f.trim() !== "");

  /* ── Submit ──────────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!isValid || !token) return;
    setSubmitting(true);
    try {
      const payload: CreateProjectDto = {
        name: form.name.trim(),
        orderId: form.orderId.trim(),
        status: form.status as CreateProjectDto.status,
        projectRemarks: form.projectRemarks.trim(),
        projectFiles: form.projectFiles.filter((f) => f.trim() !== ""),
        ...(form.client && { client: form.client }),
        ...(form.profile && { profile: form.profile }),
        ...(form.assignedDepartment && {
          assignedDepartment: form.assignedDepartment,
        }),
        ...(form.projectTeam && {
          projectTeam: form.projectTeam as CreateProjectDto.projectTeam,
        }),
        ...(form.dueDate && { dueDate: form.dueDate }),
      };

      await ProjectManagementService.projectControllerCreate({
        authorization: token,
        requestBody: payload,
      });

      toast.success(`Project "${payload.name}" created successfully!`);
      onOpenChange(false);
      onCreated?.();
    } catch (err: any) {
      const msg =
        err?.body?.errors
          ?.map((e: any) => e.message ?? e.field)
          ?.join(", ") ??
        err?.body?.message ??
        "Failed to create project. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">Create Project</DialogTitle>
        <DialogDescription className="sr-only">
          Fill in the details to create a new project
        </DialogDescription>

        {/* ── Header ───────────────────────────────────────── */}
        <div className="shrink-0 px-4 pt-4 sm:px-6 sm:pt-5">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            Create New Project
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in all required fields to create a project.
          </p>
        </div>

        {/* ── Form body (scrollable) ────────────────────────── */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {loadingDropdowns ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                Loading form data…
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Row 1: Project Name + Order ID */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Acme E-commerce Redesign"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Order ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. ORD-20240001"
                    value={form.orderId}
                    onChange={(e) => set("orderId", e.target.value)}
                    className="h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Row 2: Status + Project Team */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => set("status", v)}
                  >
                    <SelectTrigger className="h-9 w-full rounded-sm border-border/60 text-sm focus-visible:ring-1">
                      <SelectValue placeholder="Select status…" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Project Team
                  </label>
                  <Select
                    value={form.projectTeam}
                    onValueChange={(v) => set("projectTeam", v)}
                  >
                    <SelectTrigger className="h-9 w-full rounded-sm border-border/60 text-sm focus-visible:ring-1">
                      <SelectValue placeholder="Select team…" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_OPTIONS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 3: Client + Profile */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Client
                  </label>
                  <Select
                    value={form.client}
                    onValueChange={(v) => set("client", v)}
                  >
                    <SelectTrigger className="h-9 w-full rounded-sm border-border/60 text-sm focus-visible:ring-1">
                      <SelectValue placeholder={clients.length === 0 ? "No clients found" : "Select client…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Profile
                  </label>
                  <Select
                    value={form.profile}
                    onValueChange={(v) => set("profile", v)}
                  >
                    <SelectTrigger className="h-9 w-full rounded-sm border-border/60 text-sm focus-visible:ring-1">
                      <SelectValue placeholder={profiles.length === 0 ? "No profiles found" : "Select profile…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Assigned Department + Due Date */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Assigned Department
                  </label>
                  <Select
                    value={form.assignedDepartment}
                    onValueChange={(v) => set("assignedDepartment", v)}
                  >
                    <SelectTrigger className="h-9 w-full rounded-sm border-border/60 text-sm focus-visible:ring-1">
                      <SelectValue placeholder={departments.length === 0 ? "No departments found" : "Select department…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d._id} value={d._id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                    className="h-9 rounded-sm border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Row 5: Project Remarks */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Project Remarks <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Internal notes or remarks about this project…"
                  value={form.projectRemarks}
                  onChange={(e) => set("projectRemarks", e.target.value)}
                  rows={3}
                  className="rounded-sm border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0 resize-none"
                />
              </div>

              {/* Row 6: Project File URLs */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Project Files{" "}
                    <span className="text-red-500">*</span>
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      (at least one URL required)
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={addFileSlot}
                    className="flex items-center gap-1 text-xs font-medium text-brand-navy hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add another
                  </button>
                </div>
                <div className="space-y-2">
                  {form.projectFiles.map((url, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        placeholder={`File URL ${i + 1}…`}
                        value={url}
                        onChange={(e) => setFileUrl(i, e.target.value)}
                        className="h-9 flex-1 rounded-sm border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                      />
                      {form.projectFiles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFileSlot(i)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="shrink-0 border-t border-border/40 bg-muted/30 px-4 py-3 sm:px-6">
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="h-9 rounded-sm border-border/60 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || submitting}
              className="h-9 gap-1.5 rounded-sm bg-brand-navy px-5 text-sm font-semibold text-white hover:bg-brand-navy-dark disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4" />
                  Create Project
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
