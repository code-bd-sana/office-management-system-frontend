import { Button } from "@/components/ui/button";

interface LeavePageHeaderProps {
  onAddLeaveRequest: () => void;
}

export function LeavePageHeader({ onAddLeaveRequest }: LeavePageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-base leading-relaxed text-muted-foreground/80 sm:text-xl md:text-2xl">
        View your leave balances and request new leaves. Review the details of
        your upcoming and past leaves
      </p>

      <Button
        onClick={onAddLeaveRequest}
        className="h-9 w-40 shrink-0 gap-1.5 rounded-sm bg-[#14804A] px-6 text-sm font-medium transition-all hover:bg-[#14804A] hover:shadow-md active:scale-95 sm:h-10 sm:w-auto sm:px-10 sm:text-base"
      >
        Request Leave
      </Button>
    </div>
  );
}
