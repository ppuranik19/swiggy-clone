import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { FaStar, FaChevronUp } from "react-icons/fa";

const recommendedItems = [
  {
    id: 1,
    name: "Curd Vadai [1 Pc]",
    price: 85,
    rating: 4.6,
    reviews: 106,
    description:
      "Serves 1 | Crispy Medu Vadas are soaked and absorb the creamy yogurt to become soft and flavorful, Seasoned with Carrot and Corriander.",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1200&auto=format&fit=crop",
    veg: true,
  },
  {
    id: 2,
    name: "Medhu Vadai",
    price: 65,
    rating: 4.6,
    reviews: "2.7K+",
    description:
      "Serves 1 | A crispy, golden-brown doughnut-shaped fritter made from a batter of urad dal and seasoned. Served with Chutney and sambar.",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
    veg: true,
  },
];

const RecommendedAccordion = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Prevent background scroll when modal opens
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <React.Fragment>
      <section className="w-full bg-white">
        {/* Accordion Header */}
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-5 text-left sm:px-6"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Recommended (20)
          </h2>

          <FaChevronUp
            className={`h-6 w-6 text-gray-700 transition-transform duration-300 ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Accordion Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[2000px]" : "max-h-0"
          }`}
        >
          {recommendedItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-start md:justify-between ${
                index !== recommendedItems.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              {/* Left Content */}
              <div className="flex-1">
                {/* Veg Icon */}
                <div className="mb-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-green-600">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold leading-snug text-gray-900">
                  {item.name}
                </h3>

                {/* Price */}
                <p className="mt-2 text-2xl font-bold text-black">
                  ₹{item.price}
                </p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  <FaStar className="fill-green-700 text-green-700" size={18} />

                  <span className="font-semibold text-green-700">
                    {item.rating}
                  </span>

                  <span className="font-medium text-gray-500">
                    ({item.reviews})
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                  {item.description}
                </p>
              </div>

              {/* Right Image */}
              <div className="relative mx-auto w-full max-w-[220px] md:mx-0">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-200"
                  aria-label={`Open image preview for ${item.name}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-52 w-full rounded-2xl object-cover transition duration-300 group-hover:scale-105"
                  />
                </button>

                {/* Add Button */}
                <button
                  type="button"
                  className="absolute bottom-[-18px] left-1/2 flex h-14 w-[80%] -translate-x-1/2 items-center justify-center rounded-2xl border border-gray-300 bg-white text-3xl font-bold text-green-600 shadow-md transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-200"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300"
              aria-label="Close modal"
            >
              <MdCancel size={28} className="text-gray-700" />
            </button>

            {/* Image */}
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="h-[300px] w-full object-cover sm:h-[500px]"
            />

            {/* Content */}
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
              <div className="flex-1">
                {/* Veg */}
                <div className="mb-3 flex items-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-green-600">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  </div>
                </div>

                <h2
                  id="modal-title"
                  className="text-3xl font-bold text-gray-900"
                >
                  {selectedItem.name}
                </h2>

                <p className="mt-2 text-3xl font-bold text-black">
                  ₹{selectedItem.price}
                </p>

                <div className="mt-3 flex items-center gap-1">
                  <FaStar className="fill-green-700 text-green-700" size={18} />

                  <span className="font-semibold text-green-700">
                    {selectedItem.rating}
                  </span>

                  <span className="font-medium text-gray-500">
                    ({selectedItem.reviews})
                  </span>
                </div>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  {selectedItem.description}
                </p>
              </div>

              {/* Add Button */}
              <div className="sm:pl-6">
                <button
                  type="button"
                  className="flex h-16 w-full min-w-[180px] items-center justify-center rounded-2xl border border-gray-300 bg-white px-10 text-3xl font-bold text-green-600 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-200"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RecommendedAccordion;
