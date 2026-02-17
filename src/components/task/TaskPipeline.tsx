import { ArrowRight } from "lucide-react";
import { TaskPipelineStep } from "./TaskPipelineStep";
import { TASK_PIPELINE_STEPS } from "@/constants/task";

export function TaskPipeline() {
  return (
    <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
      {TASK_PIPELINE_STEPS.map((step, index) => (
        <div key={step.id} className="flex flex-1 items-center gap-1 sm:gap-2">
          <TaskPipelineStep step={step} />
          {index < TASK_PIPELINE_STEPS.length - 1 && (
            <ArrowRight className="h-5 w-5 shrink-0 text-brand-navy-light/80 stroke-[1.5] sm:h-12 sm:w-12" />
          )}
        </div>
      ))}
    </div>
  );
}
