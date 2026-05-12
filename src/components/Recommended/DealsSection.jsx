// components/DealsSection.jsx
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function DealsSection({ offers }) {
  return (
    <React.Fragment>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Deals for you</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaAngleLeft size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaAngleRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-2 hide-scrollbar">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="min-w-70 border border-gray-200 rounded-xl p-3 flex items-center space-x-4 shrink-0"
            >
              <div className="bg-blue-600 text-white text-[10px] font-bold p-2 rounded-lg text-center leading-tight">
                SAVE <br /> X2
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{offer.header}</h3>
                <p className="text-xs text-gray-500 uppercase">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
