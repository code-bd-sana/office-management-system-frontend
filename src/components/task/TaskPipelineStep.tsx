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
        "flex w-full flex-col items-center justify-center gap-4 rounded-sm py-10 transition-shadow hover:shadow-sm",
        step.bgColor
      )}
    >
      <Icon className="h-10 w-10 text-brand-navy-light stroke-[1.5]" />
      <div className="text-xl font-medium text-foreground">
        {step.label} {step.count > 0 && <span className="font-bold">{step.count}</span>}
      </div>
    </div>
  );
}
