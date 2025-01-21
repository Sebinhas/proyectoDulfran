const SkeletonPrivateLayout = () => {
  return (
    <div className="w-full h-screen flex flex-row bg-gray-100">
      {/* Skeleton Sidebar */}
      <div className="w-[250px] h-screen bg-white animate-pulse">
        {/* Logo skeleton */}
        <div className="h-[80px] flex items-center justify-center px-6">
          <div className="w-[120px] h-8 bg-gray-200 rounded-md" />
        </div>
        {/* Menu items skeleton */}
        <div className="px-4 mt-8 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-10 bg-gray-200 rounded-md" />
          ))}
        </div>
      </div>

      <main className="w-full h-[calc(100vh-80px)] flex flex-col">
        {/* Skeleton Header */}
        <div className="w-full h-[80px] bg-white px-6 flex items-center justify-between animate-pulse">
          <div className="w-[200px] h-8 bg-gray-200 rounded-md" />
          <div className="w-[120px] h-8 bg-gray-200 rounded-md" />
        </div>

        {/* Skeleton Content */}
        <div className="p-6 space-y-4 animate-pulse">
          <div className="w-full h-[200px] bg-gray-200 rounded-lg" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[120px] bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SkeletonPrivateLayout