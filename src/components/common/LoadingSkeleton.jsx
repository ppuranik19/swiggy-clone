import React from "react";

const LoadingSkeleton = ({ itemsPerView }) => {
  return (
    <React.Fragment>
      <div className="flex gap-5">
        {[...Array(itemsPerView)].map((_, index) => (
          <div
            key={index}
            className="shrink-0 animate-pulse"
            style={{
              width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 20) / itemsPerView}px)`,
            }}
          >
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-4/3 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default LoadingSkeleton;
