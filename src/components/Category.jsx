import { useEffect, useState, useRef } from "react";
import { CDN_URL } from "../utils/constant";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// ✅ MOVED OUTSIDE: Loading Skeleton Component
const LoadingSkeleton = ({ itemsPerView }) => {
  return (
    <div className="flex gap-4">
      {[...Array(itemsPerView)].map((_, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[80px] sm:w-[90px] md:w-[100px] animate-pulse"
        >
          <div className="bg-gray-200 rounded-full w-full aspect-square"></div>
          <div className="h-2.5 bg-gray-200 rounded mt-2 w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

// ✅ MOVED OUTSIDE: Error State Component
const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="text-center py-6">
      <div className="text-red-500 text-4xl mb-3">⚠️</div>
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Failed to Load Categories
      </h3>
      <p className="text-gray-600 mb-4 text-sm">{error}</p>
      <button
        onClick={onRetry}
        className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
      >
        Try Again
      </button>
    </div>
  );
};

// ✅ MOVED OUTSIDE: Empty State Component
const EmptyState = () => {
  return (
    <div className="text-center py-6">
      <div className="text-gray-400 text-4xl mb-3">🍕</div>
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        No Categories Found
      </h3>
      <p className="text-gray-600 text-sm">
        We couldn't find any categories at the moment. Please try again later.
      </p>
    </div>
  );
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(8);
  const carouselRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
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
        console.log(data, "category");

        // Extract categories array - updated path to access info array
        const categoryData =
          data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;

        // Ensure we have an array
        let categoriesArray = [];
        if (Array.isArray(categoryData)) {
          categoriesArray = categoryData;
        } else if (categoryData && typeof categoryData === "object") {
          // If it's an object, try to find any array property
          categoriesArray =
            Object.values(categoryData).find(Array.isArray) || [];
        }

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message || "Failed to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(4);
      } else if (window.innerWidth < 768) {
        setItemsPerView(5);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(6);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(8);
      } else {
        setItemsPerView(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < categories.length - itemsPerView) {
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
  const isNextDisabled = currentIndex >= categories.length - itemsPerView;

  // Handle retry
  const handleRetry = () => {
    window.location.reload();
  };

  // Loading State
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="flex gap-1.5">
            <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <LoadingSkeleton itemsPerView={itemsPerView} />
        <hr className="my-4 border-gray-200" />
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ErrorState error={error} onRetry={handleRetry} />
        <hr className="my-4 border-gray-200" />
      </section>
    );
  }

  // Empty State
  if (!categories.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <EmptyState />
        <hr className="my-4 border-gray-200" />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
          What's on your mind
        </h2>

        <div className="flex gap-1.5">
          <button
            className={`w-7 h-7 rounded-full flex justify-center items-center transition-all duration-300 ${
              isPrevDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={previousSlide}
            disabled={isPrevDisabled}
            aria-label="Previous categories"
          >
            <FaArrowLeft size={12} />
          </button>

          <button
            className={`w-7 h-7 rounded-full flex justify-center items-center transition-all duration-300 ${
              isNextDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            }`}
            onClick={nextSlide}
            disabled={isNextDisabled}
            aria-label="Next categories"
          >
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={category?.id || index}
              className="flex-shrink-0 group cursor-pointer"
              style={{
                width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 16) / itemsPerView}px)`,
              }}
            >
              <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                <img
                  src={CDN_URL + category?.imageId}
                  alt={category?.name || "Category"}
                  className="w-full h-auto aspect-square object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/100?text=Image+Not+Found";
                    e.target.onerror = null;
                  }}
                />
              </div>
              {category?.name && (
                <p className="text-center mt-1.5 text-xs text-gray-600 truncate px-1">
                  {category.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4 border-gray-200" />
    </section>
  );
};

export default Category;
