import { Button } from "@/components/ui/button";

interface LeavePageHeaderProps {
  onAddLeaveRequest: () => void;
}

export function LeavePageHeader({ onAddLeaveRequest }: LeavePageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="max-w-5xl text-2xl leading-relaxed text-muted-foreground/80">
        View your leave balances and request new leaves. Review the details of your upcoming and past leaves
      </p>

      <Button
        onClick={onAddLeaveRequest}
        className="h-10 text-base shrink-0 px-10 gap-1.5 rounded-sm bg-[#14804A] font-medium transition-all hover:bg-[#14804A] hover:shadow-md active:scale-95"
      >
        Request Leave
      </Button>
    </div>
  );
}
