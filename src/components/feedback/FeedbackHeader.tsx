export default function FeedbackHeader() {
  return (
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
  );
}
