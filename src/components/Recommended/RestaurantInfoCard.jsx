// components/RestaurantInfoCard.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

export default function RestaurantInfoCard({ restaurant }) {
  return (
    <React.Fragment>
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8"
        style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
      >
        <div className="flex items-center space-x-2 text-sm font-bold text-gray-800 mb-2">
          <div className="bg-green-600 text-white p-1 rounded-full">
            <FaStar size={12} fill="white" />
          </div>
          <span>
            {restaurant.avgRating} ({restaurant.totalRatingsString})
          </span>
          <span className="text-gray-400">•</span>
          <span>{restaurant.costForTwo}</span>
        </div>

        <div className="text-sm text-orange-500 font-medium mb-4 underline cursor-pointer">
          {restaurant.cuisines?.join(", ")}
        </div>

        <div className="relative pl-3 border-l-2 border-gray-200 ml-2 space-y-3">
          <div className="absolute -left-1.25 top-0 w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="absolute -left-1.25 bottom-1 w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="text-sm">
            <span className="font-bold mr-2">Outlet</span>
            <span className="text-gray-500">{restaurant.areaName}</span>
          </div>
          <div className="text-sm font-bold">{restaurant.deliveryTime}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
