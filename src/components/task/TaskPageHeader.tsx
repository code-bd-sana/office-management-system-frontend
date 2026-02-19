import { Button } from "@/components/ui/button";

interface TaskPageHeaderProps {
  onAddTask: () => void;
}

export function TaskPageHeader({ onAddTask }: TaskPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="max-w-5xl text-base leading-relaxed text-muted-foreground/80 sm:text-lg md:text-2xl">
        Track and View your assigned tasks. Mark them as completed and submit
        your Daily Completion Report (DCR) on time.
      </p>

      <Button
        onClick={onAddTask}
        className="h-10 w-40 text-base shrink-0 px-6 gap-1.5 rounded-sm bg-[#108A4B] font-medium transition-all hover:bg-[#0E7A42] hover:shadow-md active:scale-95"
      >
        Add Task
      </Button>
    </div>
  );
}
