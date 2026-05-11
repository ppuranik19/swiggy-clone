import React, { useEffect, useState } from "react";
import Category from "../components/RestaurantComponents/Category";
import OnlineDelivery from "../components/RestaurantComponents/OnlineDelivery";
import TopRestaurant from "../components/RestaurantComponents/TopRestaurant";
import BestCuisines from "../components/RestaurantComponents/BestCuisines";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import ShimmerCard from "../components/common/ShimmerCard";

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

const RestaurantPage = () => {
  const [place, setPlace] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function to avoid duplicate code
  const fetchData = async (cardIndex, setterFunction, errorMessage) => {
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

      const items =
        data?.data?.cards[cardIndex]?.card?.card?.brands ||
        data?.data?.cards[cardIndex]?.card?.card?.cities;

      setterFunction(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error(`Error fetching ${errorMessage}:`, error);
      setError(error.message || `Failed to load ${errorMessage}`);
      setterFunction([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
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

        const places = data?.data?.cards[10]?.card?.card?.cities;
        const restaurants = data?.data?.cards[8]?.card?.card?.brands;
        const topCuisines = data?.data?.cards[7]?.card?.card?.brands;

        setPlace(Array.isArray(places) ? places : []);
        setRestaurant(Array.isArray(restaurants) ? restaurants : []);
        setCuisines(Array.isArray(topCuisines) ? topCuisines : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load data");
        setPlace([]);
        setRestaurant([]);
        setCuisines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Handle retry
  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ErrorState error={error} onRetry={handleRetry} />
      </div>
    );
  }

  // Empty state
  if (!restaurant.length && !place.length && !cuisines.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmptyState />
      </div>
    );
  }

  // Success state
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Category />
      <OnlineDelivery />
      <TopRestaurant />

      {/* Places Section */}
      {place.length > 0 && (
        <div className="mb-8">
          <BestCuisines response={place} heading="Popular Places" />
        </div>
      )}
      <hr className="my-4 border-gray-200" />

      {/* Restaurants Section */}
      {restaurant.length > 0 && (
        <div className="mb-8">
          <BestCuisines response={restaurant} heading="Top Restaurants" />
        </div>
      )}
      <hr className="my-4 border-gray-200" />

      {/* Cuisines Section */}
      {cuisines.length > 0 && (
        <div className="mb-8">
          <BestCuisines response={cuisines} heading="Best Cuisines" />
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
