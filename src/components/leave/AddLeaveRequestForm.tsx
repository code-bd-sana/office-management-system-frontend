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
import { CloudUpload } from "lucide-react";

/** Demo options — replace with API data later */
const LEAVE_TYPE_OPTIONS = ["Casual Leave", "Sick Leave"];

export function AddLeaveRequestForm({ onSubmit }: { onSubmit?: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with API
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Leave Type */}
      <div className="space-y-1.5">
        <Label
          htmlFor="leaveType"
          className="text-sm font-medium text-foreground"
        >
          Leave Type <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger
            id="leaveType"
            className="h-11 w-full border-border/60 bg-white text-muted-foreground/50"
          >
            <SelectValue placeholder="Leave Type" />
          </SelectTrigger>
          <SelectContent>
            {LEAVE_TYPE_OPTIONS.map((leave) => (
              <SelectItem key={leave} value={leave}>
                {leave}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* From Date */}
      <div className="space-y-1.5">
        <Label htmlFor="from" className="text-sm font-medium text-foreground">
          From Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="from"
          type="date"
          placeholder="Select From Date"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
      </div>

      {/* To Date */}
      <div className="space-y-1.5">
        <Label htmlFor="to" className="text-sm font-medium text-foreground">
          To Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="to"
          type="date"
          placeholder="Select To Date"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50 [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
      </div>

      {/* Number of days */}
      <div className="space-y-1.5">
        <Label
          htmlFor="numberOfDays"
          className="text-sm font-medium text-foreground"
        >
          Number Of Days <span className="text-red-500">*</span>
        </Label>
        <Input
          id="numberOfDays"
          placeholder="Number of days"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Reason */}
      <div className="space-y-1.5">
        <Label htmlFor="reason" className="text-sm font-medium text-foreground">
          Reason <span className="text-red-500">*</span>
        </Label>
        <Input
          id="reason"
          placeholder="Reason for leave"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>
      <div className="mt-3 sm:mt-4">
        <p className="mb-2 text-sm font-semibold text-foreground/80">
          Attach Documents <span className="text-red-500">*</span>
        </p>

        <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border/60 bg-gray-50 py-6 transition-colors hover:border-brand-navy/30 hover:bg-gray-100 sm:gap-3 sm:py-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <CloudUpload className="h-5 w-5 text-brand-navy-light" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground/90">
              <span className="font-bold text-brand-navy hover:underline">
                Click to Upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              (Max. File size: 25 MB)
            </p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          className="h-10 rounded-sm bg-brand-navy px-8 text-sm font-semibold transition-all hover:bg-brand-navy-dark hover:shadow-md active:scale-[0.98]"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
