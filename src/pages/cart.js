import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon
import { ThemeContext } from '../context/ThemeContext';

const convertCurrency = (amount, toINR) => {
  const conversionRate = toINR ? 75 : 0.013; // Example rates: 1 USD = 75 INR, 1 INR = 0.013 USD
  return amount * conversionRate;
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, currentCurrency } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  const getCurrencySymbol = () => (currentCurrency === 'INR' ? '₹' : '$');

  // Calculate subtotal with price conversion
  const subtotal = cart.reduce((total, item) => {
    const convertedPrice = currentCurrency === 'INR'
      ? convertCurrency(item.price, true) // Convert from USD to INR
      : convertCurrency(item.price, false); // Convert from INR to USD
    return total + (convertedPrice * (item.quantity || 1));
  }, 0);

  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.10); // 10% discount
      setError('');
    } else if (couponCode === 'FIXED10') {
      const fixedDiscount = currentCurrency === 'INR' ? 750 : 10;  // ₹750 or $10 discount
      setDiscount(fixedDiscount);
      setError('');
    } else {
      setError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const total = subtotal - discount;

  const handleQuantityChange = (item, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateQuantity(item, quantity);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext for dark mode
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <div className="container mx-auto p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => {
              // Convert price based on current currency
              const convertedPrice = currentCurrency === 'INR'
                ? convertCurrency(item.price, true) // Convert from USD to INR
                : convertCurrency(item.price, false); // Convert from INR to USD

              return (
                <div key={item.id} className="border rounded-lg p-4 mb-6 shadow flex items-center">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-6 rounded" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-lg">
                      {getCurrencySymbol()}{Number(convertedPrice).toFixed(2)}
                    </p>
                    <div className="mt-4 flex items-center">
                      <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        value={item.quantity || 1}
                        onChange={(event) => handleQuantityChange(item, event)}
                        className="border rounded px-3 py-2 w-20 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-red-500 ml-4"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              );
            })}
            <div className="flex flex-col md:flex-row justify-between mt-8">
              <div className="flex items-center mb-4 md:mb-0">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border rounded px-3 py-2 mr-4"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-pink-400 text-white py-2 px-6 rounded"
                >
                  Apply Coupon
                </button>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold mb-2">
                  Subtotal: {getCurrencySymbol()}{subtotal.toFixed(2)}
                </p>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {discount > 0 && (
                  <p className="text-green-500 mb-2 text-xl font-bold">
                    Discount: {getCurrencySymbol()}{discount.toFixed(2)}
                  </p>
                )}
                <p className="text-xl font-bold mb-4">
                  Total: {getCurrencySymbol()}{total.toFixed(2)}
                </p>
                <Link href="/checkout">
                  <button className="bg-pink-600 text-white py-2 px-6 rounded">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
