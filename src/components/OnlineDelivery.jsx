import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

// ✅ Already correct - defined outside
const ShimmerCard = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="relative overflow-hidden bg-gray-200 aspect-[4/3]">
        <div className="shimmer-effect absolute inset-0"></div>
      </div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 relative overflow-hidden">
          <div className="shimmer-effect absolute inset-0"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 relative overflow-hidden">
          <div className="shimmer-effect absolute inset-0"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2 relative overflow-hidden">
          <div className="shimmer-effect absolute inset-0"></div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-5 bg-gray-200 rounded w-12 relative overflow-hidden">
            <div className="shimmer-effect absolute inset-0"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-16 relative overflow-hidden">
            <div className="shimmer-effect absolute inset-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ MOVED OUTSIDE: Error State Component for consistency
const ErrorState = ({ error, onRetry }) => {
  return (
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
  );
};

// ✅ MOVED OUTSIDE: Empty State Component
const EmptyState = () => {
  return (
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
  );
};

// Global styles for shimmer effect (add this to your main CSS file or use a style tag in your root component)
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .shimmer-effect {
    animation: shimmer 1.5s infinite;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }
`;

const OnlineDelivery = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopResaurant = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0895&lng=80.2739&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const restaurants =
          data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        setRestaurant(Array.isArray(restaurants) ? restaurants : []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError(error.message || "Failed to load restaurants");
        setRestaurant([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopResaurant();
  }, []);

  // Handle retry
  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <>
        <style>{shimmerStyles}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <div className="h-7 sm:h-8 bg-gray-200 rounded w-64 md:w-96 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[...Array(8)].map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ErrorState error={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!restaurant.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
          Restaurant with online food delivery in Bangalore
        </h2>

        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {restaurant.length} restaurants found
        </div>
      </div>

      {/* Restaurant Grid - Responsive with better spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {restaurant.map((data, index) => (
          <RestaurantCard response={data} key={data?.info?.id || index} />
        ))}
      </div>
    </div>
  );
};

export default OnlineDelivery;
