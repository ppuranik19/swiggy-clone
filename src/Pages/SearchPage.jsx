import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchPage = () => {
  const [cuisines, setCuisines] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCuisines = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=13.08950&lng=80.27390",
      );

      const data = await response.json();

      const cuisineData =
        data?.data?.cards?.find(
          (item) => item?.card?.card?.header?.title === "Popular Cuisines",
        )?.card?.card?.imageGridCards?.info || [];

      setCuisines(cuisineData);
      setFilteredData(cuisineData);
    } catch (error) {
      console.log("Error fetching cuisines:", error);
    } finally {
      setLoading(false);
    }
  };

  // Real Time Search
  useEffect(() => {
    const filtered = cuisines.filter((item) =>
      item?.action?.text?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredData(filtered);
  }, [search, cuisines]);

  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#f5f5f5] px-4 sm:px-8 md:px-14 lg:px-24 py-10">
        {/* Search */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for restaurants and food"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 sm:h-16 bg-white border border-gray-300 rounded-md pl-6 pr-14 text-base sm:text-lg font-medium outline-none focus:border-black"
            />

            <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl text-gray-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-6xl mx-auto mt-14">
          <h2 className="text-3xl font-bold text-[#1c1c1c]">
            Popular Cuisines
          </h2>

          {/* Loading */}
          {loading ? (
            <div className="flex gap-8 mt-10 overflow-x-auto scrollbar-hide">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center animate-pulse"
                >
                  <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded mt-3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-8 mt-10 overflow-x-auto scrollbar-hide pb-4">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center min-w-[90px] cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-full overflow-hidden shadow-md transition duration-300 group-hover:scale-105">
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.imageId}`}
                        alt={item?.action?.text}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title */}
                    <p className="mt-3 text-sm sm:text-base text-center leading-5 font-medium text-[#333]">
                      {item?.action?.text}
                    </p>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center py-10">
                  <p className="text-gray-500 text-lg">No cuisines found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
