import { CDN_URL } from "../utils/constant";
import Star from "./Star";

const RestaurantCard = (props) => {
  const { response } = props;

  // Add safety check for response and response.info
  if (!response || !response.info) {
    return null; // or return a placeholder/loading state
  }

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    sla,
    costForTwo,
    locality,
  } = response.info;

  // Optional: Add default values if some properties are missing
  const safeAvgRating = avgRating || "N/A";
  const safeDeliveryTime = sla?.deliveryTime || "N/A";
  const safeCuisines = cuisines?.join(", ") || "No cuisines listed";

  return (
    <div
      className="w-full sm:w-[273px] flex-shrink-0 mb-4 cursor-pointer group"
      role="article"
      aria-label={`Restaurant: ${name || "Restaurant"}`}
    >
      {/* Image Container */}
      <div className="relative h-[182px] rounded-[15px] overflow-hidden bg-gray-100">
        <img
          src={
            cloudinaryImageId
              ? CDN_URL + cloudinaryImageId
              : "/placeholder-restaurant.jpg"
          }
          alt={name || "Restaurant"}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder-restaurant.jpg";
            e.target.onerror = null;
          }}
        />

        {/* Offer Overlay */}
        {costForTwo && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <span className="text-white text-lg sm:text-xl font-bold tracking-tighter">
              {costForTwo}
            </span>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="mt-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {name || "Unknown Restaurant"}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <Star className="inline-block" />
          <span className="text-sm sm:text-base font-medium text-gray-700">
            {safeAvgRating}
          </span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-sm sm:text-base text-gray-600">
            {safeDeliveryTime} min
          </span>
        </div>

        <div className="text-sm text-gray-500 mt-1 space-y-0.5">
          <p className="truncate">{safeCuisines}</p>
          <p className="truncate">{locality || "Location not specified"}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
