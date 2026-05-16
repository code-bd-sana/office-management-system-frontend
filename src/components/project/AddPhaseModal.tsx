"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAccessToken } from "@/hooks/useAccessToken";
import { SubProjectManagementService, TeamManagementService } from "@/api";

interface AddPhaseModalProps {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded?: () => void;
}

interface UserItem {
  _id: string;
  name: string;
  email: string;
}

const INITIAL_FORM = {
  phaseName: "",
  startDate: "",
  endDate: "",
  projectValue: "",
  description: "",
  teamMemberIds: [] as string[],
};

export function AddPhaseModal({
  projectId,
  open,
  onOpenChange,
  onAdded,
}: AddPhaseModalProps) {
  const token = useAccessToken();

  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableMembers, setAvailableMembers] = useState<UserItem[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  const fetchMembers = useCallback(async () => {
    if (!token) return;
    setLoadingMembers(true);
    try {
      const res = await TeamManagementService.teamManagementControllerFindByManagerId({
        authorization: token,
      });

      const data = (res as Record<string, unknown>)?.data;
      const teams = Array.isArray(data) ? data : [];

      // Flatten and deduplicate members from all teams
      const membersMap = new Map<string, UserItem>();
      
      teams.forEach((team: Record<string, unknown>) => {
        if (Array.isArray(team.teamMembers)) {
          team.teamMembers.forEach((member: Record<string, unknown>) => {
            // Note: teamMembers are populated user objects
            if (member && member._id) {
              membersMap.set(member._id as string, {
                _id: member._id as string,
                name: (member.name as string) || "Unknown User",
                email: (member.email as string) || "",
              });
            }
          });
        }
      });

      setAvailableMembers(Array.from(membersMap.values()));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load available team members.");
    } finally {
      setLoadingMembers(false);
    }
  }, [token]);

  // Reset form and fetch members when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setForm(INITIAL_FORM);
        fetchMembers();
      }, 0);
    }
  }, [open, fetchMembers]);

  const set = (key: keyof typeof INITIAL_FORM, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMember = (memberId: string) => {
    setForm((prev) => {
      const isSelected = prev.teamMemberIds.includes(memberId);
      const newSelection = isSelected
        ? prev.teamMemberIds.filter((id) => id !== memberId)
        : [...prev.teamMemberIds, memberId];
      return { ...prev, teamMemberIds: newSelection };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phaseName.trim() || !form.startDate || !form.endDate || !form.projectValue) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    if (!token) {
      toast.error("Authentication required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await SubProjectManagementService.subProjectControllerCreate({
        authorization: token,
        requestBody: {
          projectId: projectId,
          name: form.phaseName.trim(),
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
          value: Number(form.projectValue),
          description: form.description.trim(),
          teamMemberIds: form.teamMemberIds as unknown as Array<Array<unknown>>, // Cast due to Swagger type Array<any[]> vs Array<string>
        }
      });
      
      toast.success("Phase added successfully!");
      onOpenChange(false);
      onAdded?.();
    } catch (err: unknown) {
      const errorObj = err as Record<string, unknown>;
      const body = errorObj?.body as Record<string, unknown>;
      const errors = body?.errors as Array<Record<string, unknown>>;
      const msg =
        errors
          ?.map((e: Record<string, unknown>) => (e.message as string) ?? (e.field as string))
          ?.join(", ") ??
        (body?.message as string) ??
        "Failed to add new phase. Please try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-8 pt-8 pb-6 border-b border-border/40">
          <DialogTitle className="text-2xl font-semibold text-brand-navy">
            Add New Phase
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add a new phase to the project breakdown.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
          {/* Phase Name Field */}
          <div>
            <label
              htmlFor="phaseName"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Phase Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="phaseName"
              placeholder="Enter your phase name"
              value={form.phaseName}
              onChange={(e) => set("phaseName", e.target.value)}
              required
              className="h-10 rounded-md border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                required
                className="h-10 rounded-md border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-foreground mb-1"
              >
                End Date <span className="text-red-500">*</span>
              </label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                required
                className="h-10 rounded-md border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Project Value Field */}
          <div>
            <label
              htmlFor="projectValue"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Project value <span className="text-red-500">*</span>
            </label>
            <Input
              id="projectValue"
              type="text"
              inputMode="numeric"
              placeholder="Enter your project value"
              value={form.projectValue}
              onChange={(e) => set("projectValue", e.target.value.replace(/[^0-9.]/g, ""))}
              required
              className="h-10 rounded-md border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
          
          {/* Team Members Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Assign Team Members
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-border/60 bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {form.teamMemberIds.length > 0 
                    ? `${form.teamMemberIds.length} member(s) selected` 
                    : "Select team members..."}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                <div 
                  className="max-h-48 overflow-y-auto p-2 bg-white scrollbar-hide"
                  onWheel={(e) => e.stopPropagation()}
                >
                  {loadingMembers ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : availableMembers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center p-4">No team members available.</p>
                  ) : (
                    <div className="space-y-1">
                      {availableMembers.map((member) => (
                        <label 
                          key={member._id}
                          className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                            form.teamMemberIds.includes(member._id) ? "bg-brand-navy/5" : "hover:bg-muted/50"
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={form.teamMemberIds.includes(member._id)}
                            onChange={() => toggleMember(member._id)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-800">{member.name}</span>
                            <span className="text-xs text-slate-500">{member.email}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter your description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="rounded-md border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0 resize-y"
            />
          </div>

          {/* Actions */}
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center items-center rounded-md bg-brand-navy py-2.5 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-navy-dark disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add New Phase"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
