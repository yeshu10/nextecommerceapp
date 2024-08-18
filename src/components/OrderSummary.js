import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const OrderSummary = ({ cart, currentCurrency }) => {
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext for dark mode

  // Function to convert currency
  const convertCurrency = (amount, toINR) => {
    const conversionRate = toINR ? 83.88 : 1; // Example rates: 1 USD = 75 INR, 1 INR = 0.013 USD
    return amount * conversionRate;
  };

  // Calculate the total price before discount
  const totalBeforeDiscount = cart.reduce((total, item) => total + (Number(item.price) * (item.quantity || 1)), 0);

  // Convert the total price based on the current currency
  const totalPrice = convertCurrency(totalBeforeDiscount, currentCurrency === 'INR');
  
  // Ensure totalPrice is a number
  const formattedTotalPrice = typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00';

  return (
    <div className={`flex-1 mb-4 lg:mb-0 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => {
            // Convert item price for display
            const itemPrice = convertCurrency(Number(item.price), currentCurrency === 'INR');

            return (
              <div key={item.id} className={`border rounded-lg p-4 mb-4 shadow-md flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentCurrency === 'INR' ? '₹' : '$'}{itemPrice.toFixed(2)} x {item.quantity || 1}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="text-right mt-4">
            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Total: {currentCurrency === 'INR' ? '₹' : '$'}{formattedTotalPrice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
