import { useEffect, useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);
  const containerRef = useRef(null);

  // Responsive visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleItems(2);
      else if (width < 768) setVisibleItems(3);
      else if (width < 1024) setVisibleItems(4);
      else if (width < 1280) setVisibleItems(5);
      else setVisibleItems(6);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const itemWidth = 150;
  const gap = 16;
  const maxIndex = Math.max(0, categories.length - visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  if (!categories.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
          What's on your mind
        </h2>

        <div className="flex gap-2">
          <button
            onClick={previousSlide}
            disabled={!canGoPrev}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-200
              ${
                canGoPrev
                  ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
            aria-label="Previous slide"
          >
            <FaArrowLeft size={14} />
          </button>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-200
              ${
                canGoNext
                  ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
            aria-label="Next slide"
          >
            <FaArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={category.id || index}
              className="flex-shrink-0 w-[150px] group cursor-pointer"
              style={{ width: `${itemWidth}px` }}
            >
              <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src={`http://localhost:5000/images/${category.image}`}
                  alt={category.name || "Category"}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                    e.target.onerror = null;
                  }}
                />
              </div>
              {category.name && (
                <p className="text-center mt-2 text-sm text-gray-600 truncate">
                  {category.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      {categories.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({
            length: Math.ceil(categories.length / visibleItems),
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * visibleItems)}
              className={`
                h-1 rounded-full transition-all duration-300
                ${
                  Math.floor(currentIndex / visibleItems) === idx
                    ? "w-6 bg-gray-600"
                    : "w-4 bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={`Go to slide group ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <hr className="my-8 border-gray-200" />
    </section>
  );
};

export default Category;
