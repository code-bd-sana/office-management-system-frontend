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
const TRAINING_RESOURCE_CATEGORY_OPTIONS = [
  "Video",
  "Document",
  "Presentation",
];

export function AddTrainingResourceForm({
  onSubmit,
}: {
  onSubmit?: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with API
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title Topic */}
      <div className="space-y-1.5">
        <Label
          htmlFor="topicTitle"
          className="text-sm font-medium text-foreground"
        >
          Topic Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="topicTitle"
          placeholder="Enter topic title"
          required
          className="h-11 w-full border-border/60 bg-white placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label
          htmlFor="category"
          className="text-sm font-medium text-foreground"
        >
          Category <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger
            id="category"
            className="h-11 w-full border-border/60 bg-white text-muted-foreground/50"
          >
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {TRAINING_RESOURCE_CATEGORY_OPTIONS.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Upload files */}
      <div className="mt-3 sm:mt-4">
        <p className="mb-2 text-sm font-semibold text-foreground/80">
          Upload Files <span className="text-red-500">*</span>
        </p>

        <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border/60 bg-gray-50 py-6 transition-colors hover:border-brand-navy/30 hover:bg-gray-100 sm:gap-3 sm:py-5">
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

      {/* Description */}
      <div className="space-y-1.5">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-foreground"
        >
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Type here..."
          className="w-full h-30 resize-none border-gray-300 rounded-0 bg-white placeholder:text-muted-foreground/50"
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
