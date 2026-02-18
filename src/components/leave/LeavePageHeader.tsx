import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LeavePageHeaderProps {
  onAddLeaveRequest: () => void;
}

export function LeavePageHeader({ onAddLeaveRequest }: LeavePageHeaderProps) {
  return (
    <div className="">
      <p className="text-2xl leading-relaxed text-muted-foreground/80">
        View your leave balances and request new leaves. Review the details of
        your upcoming and past leaves
      </p>
      <div className="flex justify-end items-center mt-4 gap-4">
        <Link
         href={"leave/pending-requests"}
          className="px-10 py-2 text-base rounded-sm bg-[#FBA23E] font-medium text-white text-center transition-all hover:shadow-md active:scale-95"
        >
          {/* h-10 text-base shrink-0 px-10 gap-1.5 rounded-sm bg-[#FBA23E] font-medium text-white text-center transition-all hover:bg-[#FBA23E] hover:shadow-md active:scale-95 */}
          Pending Leave
        </Link>

        <Button
          onClick={onAddLeaveRequest}
          className="h-10 text-base shrink-0 px-10 gap-1.5 rounded-sm bg-[#14804A] font-medium transition-all hover:bg-[#14804A] hover:shadow-md active:scale-95 cursor-pointer"
        >
          Request Leave
        </Button>
      </div>
    </div>
  );
}
