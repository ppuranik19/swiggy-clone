import React from "react";

const EmptyState = () => {
  return (
    <React.Fragment>
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Restaurants Found
        </h3>
        <p className="text-gray-600">
          We couldn't find any restaurants with online delivery at the moment.
          <br />
          Please check back later!
        </p>
      </div>
    </React.Fragment>
  );
};

export default EmptyState;
