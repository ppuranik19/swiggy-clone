import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RestaurantCard from "./RestaurantCard";

// ✅ MOVED OUTSIDE: Loading Skeleton Component
const LoadingSkeleton = ({ itemsPerView }) => {
  return (
    <div className="flex gap-5">
      {[...Array(itemsPerView)].map((_, index) => (
        <div
          key={index}
          className="flex-shrink-0 animate-pulse"
          style={{
            width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 20) / itemsPerView}px)`,
          }}
        >
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-[4/3] bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ✅ MOVED OUTSIDE: Error State Component
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
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
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
        We couldn't find any restaurants at the moment. Please try again later.
      </p>
    </div>
  );
};

// ✅ MOVED OUTSIDE: Header Skeleton Component (optional but good practice)
const HeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

const TopRestaurant = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

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
        console.error("Error fetching categories:", error);
        setError(error.message || "Failed to load restaurants");
        setRestaurant([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopResaurant();
  }, []);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(4);
      } else {
        setItemsPerView(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < restaurant.length - itemsPerView) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const previousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Calculate if navigation buttons should be disabled
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= restaurant.length - itemsPerView;

  // Handle retry
  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeaderSkeleton />
        <LoadingSkeleton itemsPerView={itemsPerView} />
        <hr className="my-8 border-gray-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ErrorState error={error} onRetry={handleRetry} />
        <hr className="my-8 border-gray-200" />
      </div>
    );
  }

  if (!restaurant.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmptyState />
        <hr className="my-8 border-gray-200" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Top Restaurant chains in Bangalore
          </h2>

          <div className="flex gap-2">
            <button
              className={`w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300 ${
                isPrevDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              }`}
              onClick={previousSlide}
              disabled={isPrevDisabled}
              aria-label="Previous restaurants"
            >
              <FaArrowLeft size={16} />
            </button>

            <button
              className={`w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300 ${
                isNextDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              }`}
              onClick={nextSlide}
              disabled={isNextDisabled}
              aria-label="Next restaurants"
            >
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {restaurant.map((data, index) => (
              <div
                key={data?.info?.id || index}
                className="flex-shrink-0"
                style={{
                  width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 20) / itemsPerView}px)`,
                }}
              >
                <RestaurantCard response={data} />
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Dots indicator */}
        {restaurant.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({
              length: Math.ceil(restaurant.length / itemsPerView),
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * itemsPerView)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === idx
                    ? "w-8 bg-orange-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <hr className="my-8 border-gray-200" />
      </div>
    </React.Fragment>
  );
};

export default TopRestaurant;
