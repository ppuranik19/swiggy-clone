import React from "react";

const HeaderSkeleton = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderSkeleton;
