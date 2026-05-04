import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const OnlineDelivery = () => {
  const [restaurant, setRestaurant] = useState([]);

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
  return (
    <React.Fragment>
      <div className="max-w-300mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[25px] font-semibold">
            Restaurant with online food delivery in Bangalore
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {restaurant.map((data, index) => {
            return (
              <>
                <RestaurantCard {...data} key={index} />
              </>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OnlineDelivery;
