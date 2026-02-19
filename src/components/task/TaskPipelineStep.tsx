import { cn } from "@/lib/utils";
import type { TaskPipelineStepData } from "@/types/task";

interface TaskPipelineStepProps {
  step: TaskPipelineStepData;
}

export function TaskPipelineStep({ step }: TaskPipelineStepProps) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-sm py-5 transition-shadow hover:shadow-sm sm:gap-4 sm:py-10",
        step.bgColor,
      )}
    >
      <Icon className="h-7 w-7 text-brand-navy-light stroke-[1.5] sm:h-10 sm:w-10" />
      <div className="text-sm font-medium text-foreground sm:text-xl">
        {step.label}{" "}
        {step.count > 0 && <span className="font-bold">{step.count}</span>}
      </div>
    </div>
  );
}
