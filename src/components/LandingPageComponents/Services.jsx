import React from "react";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="px-6 md:px-16 py-10 bg--[#FC8019]">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          <div className="flex-1">
            <ServiceCard
              image="/images/Dineout.avif"
              onCardClick={() => navigate(`/restaurant`)}
            />
          </div>
          <div className="flex-1">
            <ServiceCard
              image="/images/food.avif"
              onCardClick={() => navigate(`/food`)}
            />
          </div>
          <div className="flex-1">
            <ServiceCard
              image="/images/instamart.avif"
              onCardClick={() => navigate(`/instamart`)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Services;
