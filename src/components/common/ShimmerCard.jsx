import React from "react";

const ShimmerCard = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="relative overflow-hidden bg-gray-200 aspect-[4/3]">
          <div className="shimmer-effect absolute inset-0"></div>
        </div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 relative overflow-hidden">
            <div className="shimmer-effect absolute inset-0"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 relative overflow-hidden">
            <div className="shimmer-effect absolute inset-0"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2 relative overflow-hidden">
            <div className="shimmer-effect absolute inset-0"></div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-5 bg-gray-200 rounded w-12 relative overflow-hidden">
              <div className="shimmer-effect absolute inset-0"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-16 relative overflow-hidden">
              <div className="shimmer-effect absolute inset-0"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShimmerCard;
