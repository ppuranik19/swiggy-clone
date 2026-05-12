// components/FloatingMenuButton.jsx
import React from "react";

export default function FloatingMenuButton() {
  return (
    <React.Fragment>
      <button className="fixed bottom-8 right-6 bg-black text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform z-40">
        <div className="w-5 h-4 border-2 border-white rounded-sm mb-1 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white"></div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">
          Menu
        </span>
      </button>
    </React.Fragment>
  );
}
