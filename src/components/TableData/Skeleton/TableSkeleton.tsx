
const TableSkeleton = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Table Header Skeleton */}
      <div className="border-b border-gray-100 pb-4">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-4 bg-gray-200 animate-pulse rounded-md" />
          ))}
        </div>
      </div>

      {/* Table Rows Skeleton */}
      <div className="space-y-4 pt-4">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="grid grid-cols-4 gap-4 items-center">
            {/* Patient Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-24" />
                <div className="h-3 bg-gray-200 animate-pulse rounded-md w-32" />
              </div>
            </div>

            {/* Date */}
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-30" />

            {/* Status */}
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-30" />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <div className="h-8 bg-gray-200 animate-pulse rounded-md w-16" />
              <div className="h-8 bg-gray-200 animate-pulse rounded-md w-16" />
              <div className="h-8 bg-gray-200 animate-pulse rounded-md w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
