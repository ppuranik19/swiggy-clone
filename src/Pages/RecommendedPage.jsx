// RestaurantMenuPage.jsx
import React, { useState, useMemo } from "react";
import { recommendData } from "../utils/recommedData";
import RecommendedHeader from "../components/Recommended/RecommendedHeader";
import RestaurantInfoCard from "../components/Recommended/RestaurantInfoCard";
import DealsSection from "../components/Recommended/DealsSection";
import SearchAndFilters from "../components/Recommended/SearchAndFilters";
import MenuSection from "../components/Recommended/MenuSection";
import FloatingMenuButton from "../components/Recommended/FloatingMenuButton";
import ItemModal from "../components/Recommended/ItemModal";

export default function RestaurantMenuPage() {
  const { restaurant } = recommendData;

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    veg: false,
    nonVeg: false,
    bestseller: false,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({
    Recommended: true,
  });

  const normalizedMenu = useMemo(() => {
    const categories = [];
    Object.entries(restaurant.menu).forEach(([categoryName, content]) => {
      let items = [];
      if (Array.isArray(content)) {
        content.forEach((item) => {
          if (item.items) {
            items = [...items, ...item.items];
          } else {
            items.push(item);
          }
        });
      }
      categories.push({ categoryName, items });
    });
    return categories;
  }, [restaurant.menu]);

  const filteredMenu = useMemo(() => {
    return normalizedMenu
      .map((category) => {
        const filteredItems = category.items.filter((item) => {
          const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesVeg = filters.veg ? item.isVeg !== false : true;
          const matchesNonVeg = filters.nonVeg ? item.isVeg === false : true;
          const matchesBestseller = filters.bestseller
            ? item.isBolt === true
            : true;

          return (
            matchesSearch && matchesVeg && matchesNonVeg && matchesBestseller
          );
        });
        return { ...category, items: filteredItems };
      })
      .filter((category) => category.items.length > 0);
  }, [normalizedMenu, searchQuery, filters]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    // Implement your cart logic here
  };

  return (
    <React.Fragment>
      <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white min-h-screen pb-24 relative">
        <RecommendedHeader restaurantName={restaurant.name} />
        <RestaurantInfoCard restaurant={restaurant} />
        <DealsSection offers={restaurant.offers} />

        <div className="flex items-center justify-center space-x-4 text-gray-400 mb-6 text-sm">
          <span className="block w-8 bg-gray-300"></span>
          <span className="tracking-widest">MENU</span>
          <span className="block w-8  bg-gray-300"></span>
        </div>

        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />

        <MenuSection
          filteredMenu={filteredMenu}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          onItemClick={setSelectedItem}
          onAddToCart={handleAddToCart}
        />

        <FloatingMenuButton />

        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </React.Fragment>
  );
}
