// components/MenuSection.jsx
import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import MenuItem from "./MenuItem";

export default function MenuSection({
  filteredMenu,
  expandedCategories,
  toggleCategory,
  onItemClick,
  onAddToCart,
}) {
  return (
    <React.Fragment>
      <div className="space-y-4">
        {filteredMenu.map((category, index) => (
          <div
            key={index}
            className="border-b-12 border-gray-100 pb-4 last:border-b-0"
          >
            <button
              onClick={() => toggleCategory(category.categoryName)}
              className="flex justify-between items-center w-full py-4 bg-white"
            >
              <h2 className="text-lg font-extrabold text-gray-900">
                {category.categoryName} ({category.items.length})
              </h2>
              {expandedCategories[category.categoryName] ? (
                <FaAngleUp size={24} />
              ) : (
                <FaAngleDown size={24} />
              )}
            </button>

            {expandedCategories[category.categoryName] && (
              <div className="space-y-6 mt-2">
                {category.items.map((item, i) => (
                  <MenuItem
                    key={item.id || i}
                    item={item}
                    onItemClick={onItemClick}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredMenu.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No items found matching your filters.
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
