// components/ItemModal.jsx
import React from "react";
import { SlClose } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import VegIcon from "./VegIcon";

export default function ItemModal({ item, onClose, onAddToCart }) {
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 sm:p-0">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl overflow-hidden relative z-10 animate-slide-up sm:animate-fade-in flex flex-col max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur p-1.5 rounded-full text-gray-800 hover:bg-white transition-colors"
          >
            <SlClose size={20} />
          </button>

          <div className="h-64 bg-red-500 w-full relative shrink-0">
            <img
              src={`https://placehold.co/800x600/e63946/ffffff?text=${encodeURIComponent(item.name)}`}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5 overflow-y-auto">
            <VegIcon isVeg={item.isVeg ?? true} />

            <div className="flex justify-between items-start mt-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900 pr-4">
                  {item.name}
                </h2>
                <p className="font-semibold text-gray-800 mt-1 text-lg">
                  ₹{item.price || (item.variants && item.variants[0].price)}
                </p>

                {item.rating && (
                  <div className="flex items-center text-green-700 text-sm font-bold mt-2">
                    <FaStar size={14} fill="currentColor" className="mr-1" />
                    {item.rating}{" "}
                    <span className="text-gray-400 font-normal ml-1">
                      ({item.ratingCount || "28"})
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                className="bg-white text-green-600 font-extrabold text-lg py-2 px-8 rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 uppercase shrink-0"
              >
                Add
              </button>
            </div>

            {item.description && (
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
