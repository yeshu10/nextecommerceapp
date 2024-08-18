import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
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
              <div key={item.id} className="border rounded-lg p-4 mb-4 shadow-lg flex items-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-700">
                    {getCurrencySymbol()}{Number(convertedPrice).toFixed(2)}
                  </p>
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
                  className="text-red-500 px-4  ml-4 "
                >
                  <FaTimes  size={24}/>
                </button>
              </div>
            );
          })}
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border rounded px-2 py-1 mr-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-pink-400 text-white py-2 px-4 rounded"
              >
                Apply Coupon
              </button>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">
                Subtotal: {getCurrencySymbol()}{subtotal.toFixed(2)}
              </p>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              {discount > 0 && (
                <p className="text-green-500 mb-2 text-xl font-bold">
                  Discount: {getCurrencySymbol()}{discount.toFixed(2)}
                </p>
              )}
              <p className="text-xl font-bold">
                Total: {getCurrencySymbol()}{(total).toFixed(2)}
              </p>
              <Link href="/checkout">
                <button className="bg-pink-600 text-white py-2 px-4 rounded mt-4">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
