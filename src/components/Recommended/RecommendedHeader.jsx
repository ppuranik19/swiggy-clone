import React from "react";

function RecommendedHeader({ restaurantName }) {
  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold mb-4">{restaurantName}</h1>
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button className="pb-2 border-b-2 border-orange-500 font-semibold text-gray-900">
          Order Online
        </button>
        <button className="pb-2 font-semibold text-gray-500 hover:text-gray-900">
          Dineout
        </button>
      </div>
    </React.Fragment>
  );
}
export default RecommendedHeader;
