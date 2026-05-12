import React, { useEffect, useState, useCallback, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const SearchPage = () => {
  const [cuisines, setCuisines] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchCuisines();

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const fetchCuisines = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=13.08950&lng=80.27390",
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let cuisineData = [];

      const popularCuisineCard = data?.data?.cards?.find(
        (item) => item?.card?.card?.header?.title === "Popular Cuisines",
      );

      if (popularCuisineCard) {
        cuisineData =
          popularCuisineCard?.card?.card?.imageGridCards?.info || [];
      }

      if (cuisineData.length === 0) {
        const anyCuisineCard = data?.data?.cards?.find(
          (item) => item?.card?.card?.imageGridCards?.info?.length > 0,
        );
        if (anyCuisineCard) {
          cuisineData = anyCuisineCard?.card?.card?.imageGridCards?.info || [];
        }
      }

      const validCuisineData = cuisineData.filter(
        (item) => item?.action?.text && item?.imageId,
      );

      setCuisines(validCuisineData);
      setFilteredData(validCuisineData);

      if (validCuisineData.length === 0) {
        setError("No cuisines found. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      setError(
        "Failed to load cuisines. Please check your internet connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    (searchTerm) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        if (!searchTerm.trim()) {
          setFilteredData(cuisines);
          return;
        }

        const filtered = cuisines.filter((item) => {
          const cuisineName = item?.action?.text?.toLowerCase() || "";
          const searchLower = searchTerm.toLowerCase();
          return cuisineName.includes(searchLower);
        });

        setFilteredData(filtered);
      }, 300);
    },
    [cuisines],
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredData(cuisines);
    setSelectedCuisine(null);
  };

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
    console.log("Selected cuisine:", cuisine?.action?.text);
  };

  const handleRetry = () => {
    fetchCuisines();
  };

  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#f5f5f5] px-4 sm:px-8 md:px-14 lg:px-24 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Search Section */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for restaurants and food..."
              value={search}
              onChange={onSearchChange}
              aria-label="Search restaurants and cuisines"
              className="w-full h-14 sm:h-16 bg-white border border-gray-300 rounded-md pl-6 pr-14 text-base sm:text-lg font-medium outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 transition-all duration-200"
            />

            <FiSearch
              className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl text-gray-600 pointer-events-none"
              aria-hidden="true"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Results Section */}
          <div className="mt-14">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-[#1c1c1c]">
                Popular Cuisines
              </h2>
              {!loading && !error && filteredData.length > 0 && (
                <p className="text-gray-500 text-sm">
                  {filteredData.length} cuisine
                  {filteredData.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

            {error && (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
                <p className="text-gray-700 text-lg mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            )}

            {loading && (
              <div className="flex gap-8 mt-6 overflow-x-auto scrollbar-hide pb-4">
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center animate-pulse"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded mt-3"></div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && (
              <>
                {filteredData.length > 0 ? (
                  <div className="flex gap-8 mt-6 overflow-x-auto scrollbar-hide pb-6">
                    {filteredData.map((item, index) => (
                      <button
                        key={item?.id || index}
                        onClick={() => handleCuisineClick(item)}
                        className="flex flex-col items-center min-w-22.5 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded-lg transition-all duration-200"
                        aria-label={`Browse ${item?.action?.text} cuisine`}
                      >
                        {/* Image Container */}
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-focus:scale-105">
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.imageId}`}
                              alt={item?.action?.text}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/80x80?text=No+Image";
                                e.target.onerror = null;
                              }}
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 text-lg mb-2">
                      No cuisines found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Try searching for something else
                    </p>
                    {search && (
                      <button
                        onClick={clearSearch}
                        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {selectedCuisine && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-xl font-bold mb-4">
                  {selectedCuisine?.action?.text}
                </h3>
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${selectedCuisine?.imageId}`}
                  alt={selectedCuisine?.action?.text}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <button
                  onClick={() => setSelectedCuisine(null)}
                  className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
