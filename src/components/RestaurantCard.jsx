import Star from "./Star";

const RestaurantCard = ({
  image,
  offer,
  title,
  rating,
  minTime,
  maxTime,
  name,
  place,
  onClick,
}) => {
  return (
    <div
      className="w-full sm:w-[273px] flex-shrink-0 mb-4 cursor-pointer group"
      onClick={onClick}
      role="article"
      aria-label={`Restaurant: ${title}`}
    >
      {/* Image Container */}
      <div className="relative h-[182px] rounded-[15px] overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:5000/images/${image}`}
          alt={title || "Restaurant"}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder-restaurant.jpg";
            e.target.onerror = null;
          }}
        />

        {/* Offer Overlay */}
        {offer && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <span className="text-white text-lg sm:text-xl font-bold tracking-tighter">
              {offer}
            </span>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="mt-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {title}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <Star className="inline-block" />
          <span className="text-sm sm:text-base font-medium text-gray-700">
            {rating}
          </span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-sm sm:text-base text-gray-600">
            {minTime}-{maxTime} min
          </span>
        </div>

        <div className="text-sm text-gray-500 mt-1 space-y-0.5">
          <p className="truncate">{name}</p>
          <p className="truncate">{place}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
