import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DCRCompletedTasks } from "./DCRCompletedTasks";
import { DCRUploadArea } from "./DCRUploadArea";
import { DEMO_TASKS } from "@/constants/task";

export function DCRPanel() {
  const completedTasks = useMemo(
    () => DEMO_TASKS.filter((t) => t.status === "completed"),
    []
  );

  return (
    <div className="h-full rounded-sm bg-white p-6 shadow-sm ring-1 ring-black/5">
      {/* Heading */}
      <h2 className="text-xl font-bold text-brand-navy/90">
        Daily Completion Report (DCR)
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed ">
        Review your assigned tasks for the day and mark as completed before
        submitting your DCR at the end of your shift
      </p>

      <div className="my-6 h-px bg-border/40" />

      {/* Completed tasks */}
      <h3 className="mb-4 text-xl font-semibold text-foreground/90">
        Completed Tasks
      </h3>
      <DCRCompletedTasks tasks={completedTasks} />

      {/* Upload area */}
      <div className="mt-6">
        <DCRUploadArea />
      </div>

      {/* Submit button */}
      <div className="mt-8">
        <Button className="w-full rounded-sm bg-brand-navy py-6 text-base font-semibold shadow-md transition-all hover:bg-brand-navy-dark hover:shadow-lg active:scale-[0.98]">
          Submit DCR
        </Button>
        <p className="mt-3 text-center text-xs font-medium text-muted-foreground/60">
          Submit your DCR here
        </p>
      </div>
    </div>
  );
}
