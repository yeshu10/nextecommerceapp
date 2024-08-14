import React from 'react';
import { useCart } from '../context/CartContext';
import { convertCurrency } from '../utils/currencyUtils'; // Ensure correct path
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart, currentCurrency, exchangeRate } = useCart();

  // Determine whether to convert the price based on the current currency
  const convertedPrice = currentCurrency === 'INR'
    ? convertCurrency(product.price, exchangeRate, true) // Convert from USD to INR
    : convertCurrency(product.price, exchangeRate, false); // Convert from INR to USD

  console.log('Product:', product); // Debugging line
  console.log('Current Currency:', currentCurrency); // Debugging line
  console.log('Exchange Rate:', exchangeRate); // Debugging line
  console.log('Converted Price:', convertedPrice); // Debugging line

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      {/* Product Image and Details */}
      <Link href={`/products/${product.id}`}>
      <div className="flex-grow cursor-pointer">
        <div className="relative w-full h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
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

      {/* Add to Cart Button */}
      <div className="p-4 bg-gray-100 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-custom-green text-white py-2 px-4 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
