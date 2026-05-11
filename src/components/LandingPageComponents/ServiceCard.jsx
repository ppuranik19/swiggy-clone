import React from "react";

const ServiceCard = ({ image, onCardClick }) => {
  return (
    <React.Fragment>
      <div
        className="bg-white rounded-xl overflow-hidden hover:scale-105 transition duration-300 cursor-pointer shadow-lg w-full"
        onClick={onCardClick}
      >
        <div className="h-80 md:h-96">
          <img
            src={image}
            className="w-full h-full object-cover"
            alt="service"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServiceCard;
