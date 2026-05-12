"use client";

import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";

interface AddPhaseModalProps {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded?: () => void;
}

const INITIAL_FORM = {
  phaseName: "",
  startDate: "",
  endDate: "",
  projectValue: "",
  description: "",
};

export function AddPhaseModal({
  projectId,
  open,
  onOpenChange,
  onAdded,
}: AddPhaseModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => setForm(INITIAL_FORM), 0);
    }
  }, [open]);

  const set = (key: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phaseName.trim() || !form.startDate || !form.endDate || !form.projectValue) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement API integration here later
      console.log("Submitting new phase for project", projectId, form);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Phase added successfully!");
      onOpenChange(false);
      onAdded?.();
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to add new phase.");
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

        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-6">
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
              rows={4}
              className="rounded-md border-border/60 text-sm focus-visible:ring-1 focus-visible:ring-offset-0 resize-y"
            />
          </div>

          {/* Actions */}
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center items-center rounded-md bg-brand-navy py-2.5 px-6 text-sm font-medium text-white shadow-sm transition-colors disabled:opacity-70"
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
