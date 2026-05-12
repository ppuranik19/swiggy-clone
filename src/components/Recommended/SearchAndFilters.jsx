// components/SearchAndFilters.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";
import VegIcon from "./VegIcon";

export default function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}) {
  return (
    <React.Fragment>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-xl py-3 px-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 font-medium placeholder-gray-500"
          />
          <FiSearch
            className="absolute right-4 top-3.5 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-1">
          <button
            onClick={() =>
              setFilters((f) => ({ ...f, veg: !f.veg, nonVeg: false }))
            }
            className={`flex items-center space-x-2 border px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.veg
                ? "bg-green-50 border-green-200"
                : "border-gray-200 bg-white"
            }`}
          >
            <VegIcon isVeg={true} />
          </button>

          <button
            onClick={() =>
              setFilters((f) => ({ ...f, nonVeg: !f.nonVeg, veg: false }))
            }
            className={`flex items-center space-x-2 border px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.nonVeg
                ? "bg-red-50 border-red-200"
                : "border-gray-200 bg-white"
            }`}
          >
            <VegIcon isVeg={false} />
          </button>

          <button
            onClick={() =>
              setFilters((f) => ({ ...f, bestseller: !f.bestseller }))
            }
            className={`border px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.bestseller
                ? "bg-gray-800 text-white border-gray-800"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            Bestseller
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
