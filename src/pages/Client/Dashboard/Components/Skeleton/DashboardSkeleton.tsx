import TableSkeleton from "../../../../../components/TableData/Skeleton/TableSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden animate-pulse">
      <div className="flex-1 p-6 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded-md w-2/3 max-w-[300px]" />
          <div className="h-4 bg-gray-200 rounded-md w-1/3 max-w-[200px]" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-20" />
                  <div className="h-6 bg-gray-200 rounded-md w-16" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <div className="h-6 bg-gray-200 rounded-md w-48" />
            <div className="h-4 bg-gray-200 rounded-md w-24" />
          </div>

          <TableSkeleton />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;