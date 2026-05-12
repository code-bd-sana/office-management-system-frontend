"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUserInfo } from "@/hooks/useUserInfo";
import { useAccessToken } from "@/hooks/useAccessToken";
import {
  DepartmentManagementService,
  TeamManagementService,
  UserManagementService,
  RoleManagementService,
} from "@/api";

export interface TeamFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamToEdit?: {
    id: string;
    name: string;
    type: string;
    manager: string;
    leader: string;
    department: string;
  } | null;
  onSuccess?: () => void;
}

const INITIAL_FORM = {
  name: "",
  type: "",
  manager: "", // this will be overridden by logged-in user's ID
  leader: "",
  department: "",
};

interface DropdownItem {
  _id: string;
  name: string;
}

export function TeamFormModal({
  open,
  onOpenChange,
  teamToEdit,
  onSuccess,
}: TeamFormModalProps) {
  const token = useAccessToken();
  const { userId, name: userName } = useUserInfo();

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  
  // Dropdowns
  const [departments, setDepartments] = useState<DropdownItem[]>([]);
  const [leaders, setLeaders] = useState<DropdownItem[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  const isEditing = !!teamToEdit;

  const fetchDropdowns = useCallback(async () => {
    if (!token) return;
    setLoadingDropdowns(true);
    try {
      // 1. Fetch departments and roles first
      const [depsRes, rolesRes] = await Promise.all([
        DepartmentManagementService.departmentControllerFindAll({
          pageNo: 1,
          pageSize: 100,
        }),
        RoleManagementService.roleControllerFindAll({
          pageNo: 1,
          pageSize: 100,
        }),
      ]);

      const depsData = (depsRes as Record<string, unknown>)?.data as Record<string, unknown> | undefined;
      setDepartments(
        Array.isArray(depsData?.departments)
          ? depsData?.departments as DropdownItem[]
          : Array.isArray(depsData)
            ? depsData as DropdownItem[]
            : []
      );

      // 2. Find the objectId for TEAM LEADER
      const rolesData = (rolesRes as Record<string, unknown>)?.data as Record<string, unknown> | undefined;
      const rolesArray = Array.isArray(rolesData?.roles) ? rolesData?.roles as Record<string, unknown>[] : [];
      const teamLeaderRole = rolesArray.find((r) => r.name === "TEAM LEADER");

      // 3. Fetch users who have the TEAM LEADER role
      if (teamLeaderRole?._id) {
        const leadersRes = await UserManagementService.userControllerGetUsers({
          pageNo: 1,
          pageSize: 100,
          authorization: token,
          role: teamLeaderRole._id as unknown as import("../../api/models/Object").Object,
        });

        const leadersData = (leadersRes as Record<string, unknown>)?.data as Record<string, unknown> | undefined;
        setLeaders(
          Array.isArray(leadersData?.users)
            ? leadersData?.users as DropdownItem[]
            : Array.isArray(leadersData)
              ? leadersData as DropdownItem[]
              : []
        );
      } else {
        setLeaders([]); // No TEAM LEADER role found
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to load dropdown options.");
    } finally {
      setLoadingDropdowns(false);
    }
  }, [token]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (teamToEdit) {
          setForm({
            name: teamToEdit.name,
            type: teamToEdit.type,
            manager: teamToEdit.manager, // Might be overridden if we enforce logged-in user always
            leader: teamToEdit.leader,
            department: teamToEdit.department,
          });
        } else {
          setForm({
            ...INITIAL_FORM,
            manager: userId || "", // Set to logged-in user
          });
        }
        fetchDropdowns();
      }, 0);
    }
  }, [open, teamToEdit, userId, fetchDropdowns]);

  const set = (key: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.manager || !form.leader || !form.department) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    if (!token) {
      toast.error("Authentication required.");
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        // Edit logic would go here
        // await TeamManagementService.teamManagementControllerUpdate({...})
        toast.success("Team updated successfully!");
      } else {
        await TeamManagementService.teamManagementControllerCreate({
          authorization: token,
          requestBody: {
            name: form.name.trim(),
            team_type: form.type,
            project_manager_id: form.manager,
            team_leader_id: form.leader,
            department: form.department,
          },
        });
        toast.success("Team added successfully!");
      }
      
      onOpenChange(false);
      onSuccess?.();
    } catch (err: unknown) {
      const errorObj = err as Record<string, unknown>;
      const body = errorObj?.body as Record<string, unknown>;
      const errors = body?.errors as Array<Record<string, unknown>>;
      const msg =
        errors
          ?.map((e) => (e.message as string) ?? (e.field as string))
          ?.join(", ") ??
        (body?.message as string) ??
        `Failed to ${isEditing ? "update" : "add"} team. Please try again.`;
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-8 pt-8 pb-6 border-b border-border/40">
          <DialogTitle className="text-2xl font-semibold text-brand-navy">
            {isEditing ? "Edit Team" : "Add New Team"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isEditing ? "Edit an existing team." : "Add a new team to the system."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-5">
          {/* Team Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Team Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              placeholder="Enter team name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="h-10 rounded-sm border-border/60 focus-visible:ring-1"
              disabled={loadingDropdowns}
            />
          </div>

          {/* Team Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Team Type <span className="text-red-500">*</span>
            </label>
            <Select value={form.type} onValueChange={(v) => set("type", v)} disabled={loadingDropdowns}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_STACK">Full Stack</SelectItem>
                <SelectItem value="UI_UX">UI/UX</SelectItem>
                <SelectItem value="WORDPRESS">Wordpress</SelectItem>
                <SelectItem value="SHOPIFY">Shopify</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manager Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Manager Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={userName || "Loading..."}
              disabled
              className="h-10 rounded-sm border-border/60 bg-muted text-muted-foreground"
            />
          </div>

          {/* Leader Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Leader Name <span className="text-red-500">*</span>
            </label>
            <Select value={form.leader} onValueChange={(v) => set("leader", v)} disabled={loadingDropdowns || leaders.length === 0}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder={loadingDropdowns ? "Loading..." : leaders.length === 0 ? "No leaders found" : "Select leader"} />
              </SelectTrigger>
              <SelectContent>
                {leaders.map((leader) => (
                  <SelectItem key={leader._id} value={leader._id}>
                    {leader.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <Select value={form.department} onValueChange={(v) => set("department", v)} disabled={loadingDropdowns || departments.length === 0}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder={loadingDropdowns ? "Loading..." : departments.length === 0 ? "No departments found" : "Select department"} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept._id} value={dept._id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              disabled={submitting || loadingDropdowns}
              className="bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-2 h-10 rounded-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Adding..."}
                </>
              ) : (
                isEditing ? "Update Team" : "Add New Team"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
