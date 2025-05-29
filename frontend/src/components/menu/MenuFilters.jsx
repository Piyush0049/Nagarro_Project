import React from 'react';

const MenuFilters = ({ categories, activeCategory, setActiveCategory, filters, setFilters }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 sticky top-25">
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm uppercase font-semibold text-gray-600 mb-3 border-b pb-1">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === 'all'
                ? 'bg-green-500 text-white'
                : 'border border-gray-300 text-gray-700 hover:border-green-500'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-green-500 text-white'
                  : 'border border-gray-300 text-gray-700 hover:border-green-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="mb-6">
        <h3 className="text-sm uppercase font-semibold text-gray-600 mb-3 border-b pb-1">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.vegetarian}
              onChange={() => setFilters({ ...filters, vegetarian: !filters.vegetarian })}
              className="h-5 w-5 accent-green-500 rounded focus:ring-2 focus:ring-green-300"
            />
            <span className="text-gray-700">Vegetarian</span>
          </label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.vegan}
              onChange={() => setFilters({ ...filters, vegan: !filters.vegan })}
              className="h-5 w-5 accent-green-500 rounded focus:ring-2 focus:ring-green-300"
            />
            <span className="text-gray-700">Vegan</span>
          </label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.glutenFree}
              onChange={() => setFilters({ ...filters, glutenFree: !filters.glutenFree })}
              className="h-5 w-5 accent-green-500 rounded focus:ring-2 focus:ring-green-300"
            />
            <span className="text-gray-700">Gluten Free</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm uppercase font-semibold text-gray-600 mb-3 border-b pb-1">Price Range</h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="50"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none accent-green-500 cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>₹0</span>
            <span>₹{filters.maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;
