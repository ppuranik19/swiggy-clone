// components/VegIcon.jsx
import React from "react";

export default function VegIcon({ isVeg }) {
  return (
    <React.Fragment>
      <div
        className={`flex items-center justify-center w-4 h-4 border ${
          isVeg ? "border-green-600" : "border-red-600"
        } rounded-sm`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isVeg ? "bg-green-600" : "bg-red-600"
          }`}
        ></div>
      </div>
    </React.Fragment>
  );
}
