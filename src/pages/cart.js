// src/pages/cart.js
import { useState } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure
import { useRouter } from 'next/router';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0); // Discount in dollars
  const [error, setError] = useState('');
  const router = useRouter();

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);

  // Handle coupon code application
  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.10); // 10% discount
      setError('');
    } else if (couponCode === 'FIXED10') {
      setDiscount(10); // $10 discount
      setError('');
    } else {
      setError('Invalid coupon code');
      setDiscount(0);
    }
  };

  // Calculate total after discount
  const total = subtotal - discount;

  // Handle checkout button click
  const handleCheckout = () => {
    router.push('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 mb-4 shadow-lg flex items-center">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700">${Number(item.price).toFixed(2)}</p> {/* Ensure price is a number */}
                <div className="mt-2 flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity || 1}
                    onChange={(event) => handleQuantityChange(item, event)}
                    className="border rounded px-2 py-1"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 text-white py-2 px-4 rounded ml-4"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
            <div className="mt-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border rounded px-2 py-1"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
              >
                Apply Coupon
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {discount > 0 && (
                <p className="text-green-500 mt-2">
                  Discount: ${discount.toFixed(2)}
                </p>
              )}
            </div>
            <p className="text-xl font-bold mt-2">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-4 rounded mt-4"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
