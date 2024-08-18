import React, { useContext } from 'react';
import { useCart } from '../context/CartContext'; // Ensure correct path
import { useWishlist } from '../context/WishlistContext'; // Import WishlistContext
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import Link from 'next/link';
import { convertCurrency } from '../utils/currencyUtils'; // Ensure correct path
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import icons

export default function ProductCard({ product }) {
  const { currentCurrency, handleAddToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist(); // Use WishlistContext
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext for dark mode
  const isFavorited = wishlist.some(item => item.id === product.id); // Check if product is in wishlist

  // Determine whether to convert the price based on the current currency
  const convertedPrice = currentCurrency === 'INR'
    ? convertCurrency(product.price, true) // Convert from USD to INR
    : convertCurrency(product.price, false); // Convert from INR to USD

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromWishlist(product); // Remove from wishlist
    } else {
      addToWishlist(product); // Add to wishlist
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg flex flex-col h-full ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
      {/* Product Image and Details */}
      <Link href={`/products/${product.id}`}>
        <div className="flex-grow cursor-pointer">
          <div className="relative w-full h-64">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold">{product.title}</h3>
            <p className="text-sm font-bold mt-2">
              {currentCurrency === 'INR' ? '₹' : '$'}{convertedPrice}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart and Favorite Button */}
      <div className={`p-4 mt-auto flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <button
          onClick={() => handleAddToCart(product)}
          className={`text-white py-2 px-4 rounded-lg flex-1 ${isDarkMode ? 'bg-black' : 'bg-custom-green'}`}
        >
          Add to Cart
        </button>
        <button
          onClick={toggleFavorite}
          className={`ml-4 text-2xl ${isDarkMode ? 'text-pink-400' : 'text-gray-500'}`}
        >
          {isFavorited ? (
            <AiFillHeart /> // Filled heart icon when favorited
          ) : (
            <AiOutlineHeart /> // Outline heart icon when not favorited
          )}
        </button>
      </div>
    </div>
  );
}
