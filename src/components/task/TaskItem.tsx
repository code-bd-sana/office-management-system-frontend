import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
}

const STATUS_CONFIG = {
  completed: {
    badgeClass: "bg-[#DCFCE7] text-[#166534]", // green-100/green-800
    badgeLabel: "Completed",
    checkboxClass: "bg-[#16A34A] border-[#16A34A]", // green-600
    checked: true,
  },
  todo: {
    badgeClass: "bg-[#FEF3C7] text-[#92400E]", // amber-100/amber-800
    badgeLabel: "To Do",
    checkboxClass: "border-gray-300 bg-white group-hover:border-[#16A34A]",
    checked: false,
  },
  "in-progress": {
    badgeClass: "bg-[#DBEAFE] text-[#1E40AF]", // blue-100/blue-800
    badgeLabel: "In Progress",
    checkboxClass: "border-blue-400 bg-blue-50",
    checked: false,
  },
} as const;

export function TaskItem({ task }: TaskItemProps) {
  const config = STATUS_CONFIG[task.status];

  return (
    <div className="group mb-3 flex items-start gap-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-border/60 transition-all hover:shadow-md hover:ring-border">
      {/* Checkbox */}
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors",
          config.checkboxClass
        )}
      >
        {config.checked && (
          <svg
            className="h-3.5 w-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium leading-snug text-foreground/90">
          {task.title}
        </p>
        <span
          className={cn(
            "mt-2 inline-block rounded px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
            config.badgeClass
          )}
        >
          {config.badgeLabel}
        </span>
      </div>

      {/* Date + Actions */}
      <div className="flex shrink-0 items-center gap-3 self-start pt-0.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          {task.date}
        </span>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground/60 hover:bg-muted hover:text-foreground"
          aria-label="Task actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
