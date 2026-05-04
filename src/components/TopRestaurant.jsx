import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [slide, setSlide] = useState(0);
  // const itemWidth = 150; // width of each card
  const visibleItems = 6; // number of visible items
  // const gap = 16; // gap between items (Tailwind gap-4 = 16px)

  useEffect(() => {
    const fetchTopResaurant = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/top-restaurant-chains",
        );
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchTopResaurant();
  }, []);
  const nextSlide = () => {
    if (slide >= restaurant.length - visibleItems) return;
    setSlide((prev) => prev + 1);
  };

  const previousSlide = () => {
    if (slide <= 0) return;
    setSlide((prev) => prev - 1);
  };
  return (
    <React.Fragment>
      <div className="max-w-300mx-auto px-4 mb-25">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[25px] font-semibold">
            Top Restaurant chains in Bangalore
          </div>

          <div className="flex">
            <div
              className="w-8 h-8 bg-gray-200 rounded-full mx-2 flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={previousSlide}
            >
              <FaArrowLeft />
            </div>

            <div
              className="w-8 h-8 bg-gray-200 rounded-full mx-2 flex justify-center items-center cursor-pointer hover:bg-gray-300"
              onClick={nextSlide}
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div className="flex gap-5 overflow-hidden">
          {restaurant.map((data, index) => {
            return (
              <>
                <RestaurantCard {...data} key={index} />
              </>
            );
          })}
        </div>
        <hr className="my-4 border text-gray-100" />
      </div>
    </React.Fragment>
  );
};

export default TopRestaurant;
