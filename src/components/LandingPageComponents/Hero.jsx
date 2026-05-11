import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import one from "../../../public/images/Veggies_new.avif";
import two from "../../../public/images/Sushi_replace.avif";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <React.Fragment>
      <div className="relative bg-[#FC8019] min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Left Image */}
        <img src={one} className="absolute left-0 bottom-0 w-40 md:w-64" />

        {/* Right Image */}
        <img src={two} className="absolute right-0 top-20 w-40 md:w-64" />

        {/* Content */}
        <h1 className="text-white text-3xl md:text-5xl font-bold max-w-3xl leading-snug">
          Order food & groceries. Discover best restaurants. Swiggy it!
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-3xl">
          {/* Location */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 flex-1 shadow-md">
            <FaMapMarkerAlt className="text-primary mr-2 text-[#FC8019]" />
            <input
              type="text"
              placeholder="Enter your location"
              className="outline-none w-full"
            />
          </div>

          {/* Search */}
          <Link to="/search">
            <button className="flex items-center cursor-pointer bg-white rounded-xl px-4 py-3 flex-2 shadow-md w-full">
              <span className="outline-none w-full text-left text-gray-400">
                Search for restaurant, item or more
              </span>
              <FaSearch className="text-gray-500" />
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;
