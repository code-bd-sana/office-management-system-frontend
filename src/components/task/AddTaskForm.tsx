"use client";

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

/** Demo options — replace with API data later */
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

export function AddTaskForm({ onSubmit }: { onSubmit?: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with API
    onSubmit?.();
  };

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
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Client */}
      <div className="space-y-1.5">
        <Label htmlFor="client" className="text-sm font-medium text-foreground">
          Client <span className="text-red-500">*</span>
        </Label>
        <Input
          id="client"
          placeholder="Enter your client name"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Project */}
      <div className="space-y-1.5">
        <Label htmlFor="project" className="text-sm font-medium text-foreground">
          Project <span className="text-red-500">*</span>
        </Label>
        <Input
          id="project"
          placeholder="Enter your project name"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Due Date */}
      <div className="space-y-1.5">
        <Label htmlFor="dueDate" className="text-sm font-medium text-foreground">
          Due Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="dueDate"
          type="date"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
      </div>

      {/* Priority */}
      <div className="space-y-1.5">
        <Label htmlFor="priority" className="text-sm font-medium text-foreground">
          Priority <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger id="priority" className="h-11 w-full border-border/60 bg-white text-muted-foreground/50">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITY_OPTIONS.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
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
          placeholder="Enter your reason for requested"
        //   rows={8}
          className="w-full resize-none border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="h-10 rounded-sm bg-brand-navy px-8 text-sm font-semibold transition-all hover:bg-brand-navy-dark hover:shadow-md active:scale-[0.98]"
        >
          Submit Request
        </Button>
      </div>
    </form>
  );
}
