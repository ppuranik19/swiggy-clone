import React from "react";
import { FaStar } from "react-icons/fa";
import VegIcon from "./VegIcon";

export default function MenuItem({ item, onItemClick, onAddToCart }) {
  return (
    <React.Fragment>
      <div className="flex justify-between items-start pt-6 border-t border-gray-200 first:border-t-0 first:pt-0">
        {/* Item Info */}
        <div className="flex-1 pr-4">
          <div className="flex items-center space-x-2 mb-1">
            <VegIcon isVeg={item.isVeg ?? true} />
            {item.isBolt && (
              <span className="text-orange-600 text-xs font-bold flex items-center">
                <FaStar size={10} fill="currentColor" className="mr-0.5" />{" "}
                Bestseller
              </span>
            )}
          </div>

          <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>

          <div className="font-semibold text-gray-800 mt-1">
            ₹{item.price || (item.variants && item.variants[0].price)}
          </div>

          {item.rating && (
            <div className="flex items-center text-green-700 text-xs font-bold mt-1.5">
              <FaStar size={12} fill="currentColor" className="mr-1" />
              {item.rating}
            </div>
          )}

          {item.description && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
              {item.description}{" "}
              <span className="font-semibold text-gray-700 cursor-pointer">
                ...more
              </span>
            </p>
          )}
        </div>

        {/* Item Image & Add Button */}
        <div className="relative w-36 h-32 shrink-0">
          <div
            onClick={() => onItemClick(item)}
            className="w-full h-full rounded-2xl bg-orange-100 object-cover cursor-pointer flex items-center justify-center text-orange-300 overflow-hidden"
          >
            <img
              src={`https://placehold.co/400x400/ffeedd/ee7722?text=${encodeURIComponent(item.name[0])}`}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28">
            <button
              onClick={() => onAddToCart(item)}
              className="w-full bg-white text-green-600 font-extrabold text-lg py-2 rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 transition-colors uppercase"
            >
              Add
            </button>
            <div className="text-[10px] text-gray-500 text-center mt-1 font-medium bg-white/80 rounded backdrop-blur-sm">
              Customisable
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
