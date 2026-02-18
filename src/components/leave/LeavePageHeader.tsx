import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LeavePageHeaderProps {
  onAddLeaveRequest: () => void;
}

export function LeavePageHeader({ onAddLeaveRequest }: LeavePageHeaderProps) {
  return (
    <div className="">
      <p className="text-base leading-relaxed text-muted-foreground/80 sm:text-xl md:text-2xl">
        View your leave balances and request new leaves. Review the details of
        your upcoming and past leaves
      </p>
      <div className="flex items-center justify-end mt-3 gap-2 sm:mt-4 sm:gap-4">
        <Link
          href={"leave/pending-requests"}
          className="flex-1 text-center px-4 py-2 text-sm rounded-sm bg-[#FBA23E] font-medium text-white transition-all hover:shadow-md active:scale-95 sm:flex-none sm:px-10 sm:text-base"
        >
          Pending Leave
        </Link>

        <Button
          onClick={onAddLeaveRequest}
          className="flex-1 h-9 text-sm shrink-0 px-4 gap-1.5 rounded-sm bg-[#14804A] font-medium transition-all hover:bg-[#14804A] hover:shadow-md active:scale-95 cursor-pointer sm:flex-none sm:h-10 sm:px-10 sm:text-base"
        >
          Request Leave
        </Button>
      </div>
    </div>
  );
}
