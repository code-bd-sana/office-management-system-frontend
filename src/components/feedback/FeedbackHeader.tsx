export default function FeedbackHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex bg-white rounded-md shadow-sm border">
        <button className="px-4 py-2 text-sm font-medium border border-gray-300 bg-[#044192] text-white rounded-l-md">
          All (8)
        </button>
        <button className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-100">
          Unread (1)
        </button>
        <button className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-r-md">
          Read
        </button>
      </div>

      <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-100">
        Mark All as Read
      </button>
    </div>
  );
}
