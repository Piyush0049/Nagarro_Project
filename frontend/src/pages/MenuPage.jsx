import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FoodCard from '../components/menu/FoodCard';
import MenuFilters from '../components/menu/MenuFilters';
import Cart from '../components/menu/Cart';
import Chatbot from '../components/chatbot/Chatbot';
import { foodItems } from './sampleData';

const MenuPage = () => {
  const categories = ['Salads', 'Bowls', 'Wraps', 'Plates', 'Drinks'];
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState({ vegetarian: false, vegan: false, glutenFree: false, maxPrice: 5000 });
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(foodItems);

  useEffect(() => {
    let result = foodItems;
    if (activeCategory !== 'all') result = result.filter(item => item.category === activeCategory);
    if (filters.vegetarian) result = result.filter(item => item.isVegetarian);
    if (filters.vegan) result = result.filter(item => item.isVegan);
    if (filters.glutenFree) result = result.filter(item => item.isGlutenFree);
    result = result.filter(item => item.price * (1 - item.discount / 100) <= filters.maxPrice);
    setFilteredItems(result);
  }, [activeCategory, filters]);

  const addToCart = item => {
    const existing = cartItems.find(ci => ci.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = id => setCartItems(cartItems.filter(ci => ci.id !== id));
  const updateQuantity = (id, qty) => qty === 0 ? removeFromCart(id) : setCartItems(cartItems.map(ci => ci.id === id ? { ...ci, quantity: qty } : ci));

  return (
    <div className="min-h-screen bg-fixed bg-cover" style={{ backgroundImage: "url('/images/leaf-pattern.png')" }}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-8 drop-shadow">
          Our Menu
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <motion.div
            className="lg:w-1/4 bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MenuFilters
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              filters={filters}
              setFilters={setFilters}
            />
          </motion.div>
          {/* Items */}
          <motion.div
            className="lg:w-3/4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white bg-opacity-80 rounded-2xl shadow-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your filters to find something delicious!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <motion.div key={item.id} whileHover={{ scale: 1.05 }} className="p-2">
                    <FoodCard item={item} addToCart={addToCart} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
      <Chatbot />
    </div>
  );
};

export default MenuPage;
