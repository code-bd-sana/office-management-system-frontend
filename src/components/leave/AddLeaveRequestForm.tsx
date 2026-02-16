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

export function AddLeaveRequestForm({ onSubmit }: { onSubmit?: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with API
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
           Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Enter your name"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
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
