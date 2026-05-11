import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import ShimmerCard from "../common/ShimmerCard";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

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
