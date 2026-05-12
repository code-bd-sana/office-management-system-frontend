"use client";

import { useEffect, useState } from "react";
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
  manager: "",
  leader: "",
  department: "",
};

export function TeamFormModal({
  open,
  onOpenChange,
  teamToEdit,
  onSuccess,
}: TeamFormModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!teamToEdit;

  useEffect(() => {
    if (open) {
      if (teamToEdit) {
        setTimeout(() => {
          setForm({
            name: teamToEdit.name,
            type: teamToEdit.type,
            manager: teamToEdit.manager,
            leader: teamToEdit.leader,
            department: teamToEdit.department,
          });
        }, 0);
      } else {
        setTimeout(() => setForm(INITIAL_FORM), 0);
      }
    }
  }, [open, teamToEdit]);

  const set = (key: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.manager || !form.leader || !form.department) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitting form:", form);
      toast.success(`Team ${isEditing ? "updated" : "added"} successfully!`);
      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${isEditing ? "update" : "add"} team.`);
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
            />
          </div>

          {/* Team Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Team Type <span className="text-red-500">*</span>
            </label>
            <Select value={form.type} onValueChange={(v) => set("type", v)}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder="Select team type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Stack">Full Stack</SelectItem>
                <SelectItem value="UI/UX">UI/UX</SelectItem>
                <SelectItem value="Wordpress">Wordpress</SelectItem>
                <SelectItem value="Shopify">Shopify</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manager Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Manager Name <span className="text-red-500">*</span>
            </label>
            <Select value={form.manager} onValueChange={(v) => set("manager", v)}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent>
                {/* Mock data for now */}
                <SelectItem value="m1">John Doe (Manager)</SelectItem>
                <SelectItem value="m2">Sarah Jenkins (Manager)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leader Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Leader Name <span className="text-red-500">*</span>
            </label>
            <Select value={form.leader} onValueChange={(v) => set("leader", v)}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder="Select leader" />
              </SelectTrigger>
              <SelectContent>
                {/* Mock data for now */}
                <SelectItem value="l1">Mike Ross (Leader)</SelectItem>
                <SelectItem value="l2">Harvey Specter (Leader)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <Select value={form.department} onValueChange={(v) => set("department", v)}>
              <SelectTrigger className="h-10 w-full rounded-sm border-border/60 focus-visible:ring-1">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {/* Mock data for now */}
                <SelectItem value="d1">OPERATIONS</SelectItem>
                <SelectItem value="d2">SALES</SelectItem>
                <SelectItem value="d3">MARKETING</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
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
