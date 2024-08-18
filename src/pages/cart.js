import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon
import { ThemeContext } from '../context/ThemeContext';

const convertCurrency = (amount, toINR) => {
  const conversionRate = toINR ? 83.88 : 1; // Example rates: 1 USD = 75 INR, 1 INR = 0.013 USD
  return amount * conversionRate;
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, currentCurrency } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [showCoupons, setShowCoupons] = useState(false); // New state for showing coupon options

  const coupons = ['DISCOUNT10', 'FIRST10', 'FIXED']; // List of available coupons


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
    } else if (couponCode === 'FIRST10') {
      const first = subtotal * 0.10; ; // ₹750 or $10 discount
      setDiscount(first);
      setError('');
    } else if (couponCode === 'FIXED') {
      let discount = 0; // 10% discount  
      if (currentCurrency === 'USD' && subtotal > 15) {
        discount += 5; // Additional $5 discount if subtotal > $15
      } else if (currentCurrency === 'INR' && subtotal > 5000) {
        discount += 1000; // Additional ₹1000 discount if subtotal > ₹5000
      }
  
      setDiscount(discount);
      setError('');
    } else {
      setError('Invalid coupon code');
      setDiscount(0);
    }
    setShowCoupons(false);
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
  const handleCouponSelect = (coupon) => {
    setCouponCode(coupon); // Set the selected coupon as the input value
    setShowCoupons(false); // Hide the coupon list when a coupon is selected
  };
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext for dark mode
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <div className="w-full min-h-screen p-12">
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
  <div className="flex flex-col items-start md:flex-row md:items-center mb-4 md:mb-0 relative w-full md:w-auto">
    <input
      type="text"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      onFocus={() => setShowCoupons(true)} // Show coupon list on input focus
      placeholder="Enter coupon code"
      className="border rounded px-3 py-2 w-full md:w-auto text-black"
    />
    <button
      onClick={handleApplyCoupon}
      className="bg-pink-400 text-white py-2 px-6 rounded mt-4 md:mt-0 w-full md:w-auto"
    >
      Apply Coupon
    </button>

    {showCoupons && (
      <ul
        className="border rounded p-2 mt-1 bg-gray-50 dark:bg-gray-700 absolute z-10 w-full md:w-auto"
        style={{ top: '100%', left: '0', right: '0', maxWidth: 'calc(100% - 2px)' }}
      >
        {coupons.map((coupon) => (
          <li
            key={coupon}
            className="cursor-pointer py-1 hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => handleCouponSelect(coupon)}
          >
            {coupon}
          </li>
        ))}
      </ul>
    )}
  </div>

  <div className="w-full md:w-auto">
    <div className="text-left md:text-right mb-4 md:mb-0">
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
    </div>
    <Link href="/checkout">
      <button className="bg-pink-600 text-white py-2 px-6 rounded w-full md:w-auto">
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
