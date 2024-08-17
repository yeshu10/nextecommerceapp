import React from 'react';
import { useWishlist } from '../context/WishlistContext'; // Ensure correct path
import { useCart } from '../context/CartContext'; // Ensure correct path
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon

const convertCurrency = (amount, toINR) => {
  const conversionRate = toINR ? 75 : 0.013; // Example rates: 1 USD = 75 INR, 1 INR = 0.013 USD
  return amount * conversionRate;
};

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, currentCurrency } = useCart();

  const getCurrencySymbol = () => (currentCurrency === 'INR' ? '₹' : '$');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => {
            // Convert price based on current currency
            const convertedPrice = currentCurrency === 'INR'
              ? convertCurrency(item.price, true) // Convert from USD to INR
              : convertCurrency(item.price, false); // Convert from INR to USD

            return (
              <div key={item.id} className="relative border rounded-lg overflow-hidden shadow-lg flex flex-col">
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item)}
                  className="absolute top-2 right-2 text-red-500 text-xl bg-white p-1 rounded-full shadow-md"
                >
                  <FaTimes />
                </button>

                {/* Product Image and Details */}
                <Link href={`/products/${item.id}`}>
                  <div className="flex-grow cursor-pointer flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain h-48 w-48" // Adjust size as needed
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-sm font-bold mt-2">
                      {getCurrencySymbol()}{Number(convertedPrice).toFixed(2)}
                    </p>
                  </div>
                </Link>

                {/* Add to Cart Button */}
                <div className="p-4 bg-gray-100 mt-auto flex items-center justify-between">
  <button
    onClick={() => addToCart(item)}
    className="bg-custom-green text-white py-2 px-4 rounded-lg w-full" // Set width to full
  >
    Add to Cart
  </button>
</div>

              </div>
            );
          })}
          <div className="flex justify-between mt-4">
            <div>
              <Link href="/product">
                <button className="bg-pink-600 text-white py-2 px-4 rounded mt-4">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
