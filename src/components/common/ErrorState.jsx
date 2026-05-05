import React from "react";

const ErrorState = ({ error, onRetry }) => {
  return (
    <React.Fragment>
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to Load Restaurants
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </React.Fragment>
  );
};

export default ErrorState;
