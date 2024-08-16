import React from 'react';
import { convertCurrency } from '../utils/currencyUtils';

const OrderSummary = ({ cart, currentCurrency, exchangeRate }) => {
  // Calculate the total price before discount
  const totalBeforeDiscount = cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);

  // Convert the total price based on the current currency
  const totalPrice = convertCurrency(totalBeforeDiscount, exchangeRate, currentCurrency === 'INR');
  
  // Ensure totalPrice is a number
  const formattedTotalPrice = typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00';

  return (
    <div className="flex-1 mb-4 lg:mb-0">
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 mb-4 shadow-lg flex items-center">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-700">
                  {currentCurrency === 'INR' ? '₹' : '$'}{convertCurrency(Number(item.price), exchangeRate, currentCurrency === 'INR')} x {item.quantity || 1}
                </p>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: {currentCurrency === 'INR' ? '₹' : '$'}{formattedTotalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
