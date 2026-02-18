import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LeaveRequestSingle() {
  return (
    <div>
      <div className="border border-green-400 rounded-sm p-4 mb-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div>
            <p className="text-gray-600 font-semibold text-base flex items-center gap-2 mb-4 sm:text-xl sm:mb-6">
              <Image
                src="/icons/check.png"
                alt="Check In"
                width={24}
                height={24}
              />
              Your Shift Change Request has been Approved.
            </p>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed sm:text-lg">
              View and review your shift assignments. Check out your schedule to
              see which shifts you are assigned to. If you need to exchange a
              shift, submit a request to your manager.
            </p>
            <p className="text-gray-400 text-xs mt-4 sm:mt-5">5 minutes ago</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-6 sm:justify-end">
          <Button className="flex-1 bg-[#14804A] px-4 py-2 hover:bg-[#14804A]/90 cursor-pointer sm:flex-none">
            Approve
          </Button>
          <Button className="flex-1 border border-gray-400 rounded-sm bg-white text-gray-600 hover:bg-red-500 hover:text-white px-4 py-2 cursor-pointer sm:flex-none">
            Decline
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-sm p-4 mb-4 shadow-sm sm:p-5">
        <div className="flex items-start gap-3 text-gray-500">
          <div>
            <h3 className="text-base font-semibold flex mb-4 sm:text-xl sm:mb-6">
              <Image
                src="/icons/schedule.png"
                alt="Check In"
                width={28}
                height={24}
                className="mr-2"
              />
              Shift Change Request Submitted
            </h3>
            <p className="mt-2 text-sm leading-relaxed sm:text-lg">
              You have requested to change your morning shift on January 28,
              2026, to an Evening Shift (03:00 PM - 11:00 PM) has been approved
              by your manager.
            </p>
            <p className="text-xs mt-4 sm:mt-5">5 minutes ago</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="bg-[#14804A] w-35 px-4 py-2 hover:bg-[#14804A]/90 cursor-pointer sm:flex-none">
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
}
