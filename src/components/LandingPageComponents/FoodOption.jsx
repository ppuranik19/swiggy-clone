// import React, { useEffect, useState, useRef } from "react";
// import EmptyState from "../common/EmptyState";
// import LoadingSkeleton from "../common/LoadingSkeleton";
// import ErrorState from "../common/ErrorState";
// import HeaderSkeleton from "../common/HeaderSkeleton";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// const FoodOption = () => {
//   const [foodOption, setFoodOption] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(6);
//   const carouselRef = useRef(null);
//   const isMountedRef = useRef(true);

//   // Fetch function without useCallback to avoid dependency issues
//   const fetchFoodOptions = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch("http://localhost:5000/foodOption");

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Only update state if component is still mounted
//       if (isMountedRef.current) {
//         if (Array.isArray(data)) {
//           setFoodOption(data);
//         } else if (data.foodOption && Array.isArray(data.foodOption)) {
//           setFoodOption(data.foodOption);
//         } else if (data.data && Array.isArray(data.data)) {
//           setFoodOption(data.data);
//         } else {
//           setFoodOption([data]);
//         }
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching food options:", error);
//       if (isMountedRef.current) {
//         setError(error.message || "Failed to load restaurants");
//         setFoodOption([]);
//         setLoading(false);
//       }
//     }
//   };

//   // Simple useEffect with empty dependencies - runs once on mount
//   useEffect(() => {
//     fetchFoodOptions();
//   }, []); // Empty dependency array - NO dependencies, runs once

//   // Handle responsive items per view - separate effect
//   useEffect(() => {
//     const updateItemsPerView = () => {
//       if (window.innerWidth >= 1280) {
//         setItemsPerView(6);
//       } else if (window.innerWidth >= 1024) {
//         setItemsPerView(5);
//       } else if (window.innerWidth >= 768) {
//         setItemsPerView(4);
//       } else if (window.innerWidth >= 640) {
//         setItemsPerView(3);
//       } else {
//         setItemsPerView(2);
//       }
//     };

//     updateItemsPerView();
//     window.addEventListener("resize", updateItemsPerView);
//     return () => window.removeEventListener("resize", updateItemsPerView);
//   }, []);

//   const nextSlide = () => {
//     if (currentIndex < Math.max(0, foodOption.length - itemsPerView)) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleRetry = () => {
//     fetchFoodOptions();
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <HeaderSkeleton />
//         <LoadingSkeleton itemsPerView={6} />
//         <hr className="my-8 border-gray-200" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <ErrorState error={error} onRetry={handleRetry} />
//         <hr className="my-8 border-gray-200" />
//       </div>
//     );
//   }

//   if (!foodOption.length) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <EmptyState />
//         <hr className="my-8 border-gray-200" />
//       </div>
//     );
//   }

//   return (
//     <React.Fragment>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Header with Navigation Arrows */}
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
//             Top Restaurant chains in Bangalore
//           </h2>

//           {/* Navigation Arrows - Parallel to Heading */}
//           {foodOption.length > itemsPerView && (
//             <div className="flex gap-2">
//               <button
//                 onClick={prevSlide}
//                 disabled={currentIndex === 0}
//                 className={`p-2 rounded-lg transition-all duration-300 ${
//                   currentIndex === 0
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-100 text-gray-700 hover:bg-orange-600 hover:text-white"
//                 }`}
//                 aria-label="Previous"
//               >
//                 <FaChevronLeft />
//               </button>

//               <button
//                 onClick={nextSlide}
//                 disabled={currentIndex >= foodOption.length - itemsPerView}
//                 className={`p-2 rounded-lg transition-all duration-300 ${
//                   currentIndex >= foodOption.length - itemsPerView
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-100 text-gray-700 hover:bg-orange-600 hover:text-white"
//                 }`}
//                 aria-label="Next"
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Carousel Container */}
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div
//               ref={carouselRef}
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
//               }}
//             >
//               {foodOption.map((item, index) => (
//                 <div
//                   key={item?.id || index}
//                   className="shrink-0 cursor-pointer group"
//                   style={{ width: `${100 / itemsPerView}%` }}
//                 >
//                   <div className="flex flex-col items-center px-3">
//                     <div className="w-full aspect-square bg-gray-100 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 overflow-hidden">
//                       <img
//                         src={
//                           item?.image?.startsWith("http")
//                             ? item.image
//                             : `http://localhost:5000${item?.image || ""}`
//                         }
//                         alt={item?.title || item?.titleName || "Food item"}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <hr className="my-8 border-gray-200" />
//       </div>
//     </React.Fragment>
//   );
// };

// export default FoodOption;
// src/components/FoodOption.jsx
// src/components/FoodOption.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import LoadingSkeleton from "../common/LoadingSkeleton";
import ErrorState from "../common/ErrorState";
import HeaderSkeleton from "../common/HeaderSkeleton";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const FoodOption = () => {
  const navigate = useNavigate();
  const [foodOption, setFoodOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const carouselRef = useRef(null);
  const isMountedRef = useRef(true);

  // Fetch function - simplified and fixed
  const fetchFoodOptions = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching food options from API...");
      const response = await fetch("http://localhost:5000/foodOption");

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full API Response:", data);

      // Only update state if component is still mounted
      if (isMountedRef.current) {
        let processedData = [];

        if (Array.isArray(data)) {
          processedData = data;
        } else if (data.foodOption && Array.isArray(data.foodOption)) {
          processedData = data.foodOption;
        } else if (data.data && Array.isArray(data.data)) {
          processedData = data.data;
        } else if (data && typeof data === "object") {
          processedData = [data];
        }

        console.log("Processed data:", processedData);
        setFoodOption(processedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching food options:", error);
      if (isMountedRef.current) {
        setError(error.message || "Failed to load restaurants");
        setFoodOption([]);
        setLoading(false);
      }
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    isMountedRef.current = true;
    fetchFoodOptions();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // Empty dependency array - runs once on mount

  // Handle responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(6);
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(5);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => {
    if (currentIndex < Math.max(0, foodOption.length - itemsPerView)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRetry = () => {
    fetchFoodOptions();
  };

  const handleCardClick = (item) => {
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    navigate(`/foodoption/${slug}`, { state: { cardData: item } });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeaderSkeleton />
        <LoadingSkeleton itemsPerView={6} />
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

  if (!foodOption.length) {
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
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Top Restaurant chains in Bangalore
          </h2>

          {foodOption.length > itemsPerView && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-600 hover:text-white"
                }`}
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= foodOption.length - itemsPerView}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentIndex >= foodOption.length - itemsPerView
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-600 hover:text-white"
                }`}
                aria-label="Next"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {foodOption.map((item, index) => (
                <div
                  key={item?.id || index}
                  className="shrink-0 cursor-pointer group"
                  style={{ width: `${100 / itemsPerView}%` }}
                  onClick={() => handleCardClick(item)}
                >
                  <div className="flex flex-col items-center px-3">
                    <div className="w-full aspect-square bg-gray-100 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <img
                        src={
                          item?.image?.startsWith("http")
                            ? item.image
                            : `http://localhost:5000${item?.image || ""}`
                        }
                        alt={item?.title || "Food item"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                    </div>
                    <p className="mt-3 text-center font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                      {item?.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />
      </div>
    </React.Fragment>
  );
};

export default FoodOption;
