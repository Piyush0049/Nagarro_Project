import React from 'react';
import { motion } from 'framer-motion';

const FoodCard = ({ item, addToCart }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={item.image || `https://source.unsplash.com/400x300/?₹{item.category},₹{item.name}`} 
          alt={item.name} 
          className="w-full h-48 object-cover"
        />
        {item.isVegetarian && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Veg
          </span>
        )}
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.discount}% OFF
          </span>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium ml-1">{item.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{item.description}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-500">{item.prepTime} min</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">{item.calories} cal</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="font-bold text-xl">
            ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
            {item.discount > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">₹{item.price.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={() => addToCart(item)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;