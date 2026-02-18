import Image from "next/image";

export function NotificationContent() {
  return (
    <div className="space-y-6">
      {/* Top Tabs + Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex bg-white rounded-md shadow-sm border">
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 bg-[#044192] text-white rounded-l-md sm:px-4 sm:py-2 sm:text-sm">
            All (8)
          </button>
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-100 sm:px-4 sm:py-2 sm:text-sm">
            Unread (1)
          </button>
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-r-md sm:px-4 sm:py-2 sm:text-sm">
            Read
          </button>
        </div>

        <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-1.5 text-xs font-medium hover:bg-gray-100 sm:w-auto sm:py-2 sm:text-sm">
          Mark All as Read
        </button>
      </div>

      <div className="border border-green-400 rounded-md p-4 mb-4 sm:p-5">
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
      </div>

      <div className="bg-white border rounded-md p-4 mb-4 shadow-sm sm:p-5">
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
      </div>

      <div className="bg-white border rounded-md p-5 shadow-sm">
        <div className="text-gray-500 flex items-start gap-3">
          <div>
            <h3 className="text-xl font-semibold flex mb-6">
              <Image
                src="/icons/schedule.png"
                alt="Check In"
                width={28}
                height={24}
                className="mr-2"
              />
              Shift Change Request Submitted
            </h3>
            <p className="mt-2 text-lg leading-relaxed">
              You have requested to change your morning shift on January 28,
              2026, to an Evening Shift (03:00 PM - 11:00 PM) has been approved
              by your manager.
            </p>
            <p className="text-xs mt-5">5 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
