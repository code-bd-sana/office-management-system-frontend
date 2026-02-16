import { Button } from "@/components/ui/button";

export function TaskPageHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="max-w-5xl text-2xl leading-relaxed text-muted-foreground/80">
        Track and View your assigned tasks. Mark them as completed and submit
        your Daily Completion Report (DCR) on time.
      </p>

      <Button className="h-10 text-xl shrink-0 px-10 gap-1.5 rounded-sm bg-[#108A4B] font-medium transition-all hover:bg-[#0E7A42] hover:shadow-md active:scale-95">
        Add Task
      </Button>
    </div>
  );
}
