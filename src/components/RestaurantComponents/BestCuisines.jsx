import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const BestCuisines = ({ response = [], heading }) => {
  const [showMore, setShowMore] = useState(false);

  // Ensure response is always an array
  const responseArray = Array.isArray(response) ? response : [];

  const visibleItems = showMore ? responseArray : responseArray.slice(0, 11);

  const handleCardClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  // Function to format the card text based on heading
  const formatCardText = (item) => {
    // If it's the Popular Places section, add "Best Restaurants in" prefix
    if (heading === "Popular Places" && item.text) {
      return `Best Restaurants in ${item.text}`;
    }
    return item.text;
  };

  return (
    <section className="w-full py-6 px-4">
      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold text-[#1c1c1c] px-2">{heading}</h2>

      {/* Grid - 4 cards in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(item.link)}
            className="
              min-h-20
              w-full
              rounded-xl
              bg-white
              px-4
              py-4
              text-center
              text-m
              font-medium
              leading-tight
              text-[#2b2b2b]
              transition-all
              duration-300
              hover:border-orange-500
              hover:text-orange-500
              hover:shadow-lg
              hover:scale-105
              shadow-md
              border
              border-gray-200
              cursor-pointer
            "
          >
            {formatCardText(item)}
          </button>
        ))}

        {/* Show More / Less */}
        {responseArray.length > 11 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="
              flex
              min-h-20
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              text-sm
              font-semibold
              text-orange-500
              transition-all
              duration-300
              hover:shadow-lg
              hover:scale-105
              shadow-md
              border
              border-gray-200
            "
          >
            {showMore ? "Show Less" : "Show More"}
            {showMore ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        )}
      </div>
    </section>
  );
};

export default BestCuisines;
