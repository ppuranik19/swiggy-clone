import React from "react";

const PrimaryButton = ({ children, type = "button" }) => {
  return (
    <React.Fragment>
      <button
        type={type}
        className="w-full bg-orange-500 py-4 text-lg font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
      >
        {children}
      </button>
    </React.Fragment>
  );
};

export default PrimaryButton;
