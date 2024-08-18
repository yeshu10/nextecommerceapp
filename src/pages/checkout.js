import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import CustomerInfoForm from '../components/CustomerInfoForm';
import PaymentInfoForm from '../components/PaymentInfoForm';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

export default function Checkout() {
  const { cart, currentCurrency, exchangeRate } = useCart();
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext for dark mode

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleConfirmOrder = () => {
    // Here, you would typically handle order confirmation logic, e.g., making an API call
    toast.success('Order placed successfully!');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`container mx-auto p-4 lg:px-8 lg:py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Customer Information Form */}
          <div className="lg:w-1/2 mb-4 lg:mb-0">
            <div className={`p-4 shadow rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-black'}`}>
              <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
              <CustomerInfoForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
            </div>
          </div>

          {/* Right Column: Order Summary and Payment Info */}
          <div className="lg:w-1/2">
            {/* Order Summary */}
            <div className={`p-4 shadow rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-black'}`}>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <OrderSummary
                cart={cart}
                currentCurrency={currentCurrency}
                exchangeRate={exchangeRate}
              />
            </div>

            {/* Payment Information Form */}
            <div className={`p-4 shadow rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-black'}`}>
              <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
              <PaymentInfoForm paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />
            </div>
          </div>
        </div>

        <div className="text-right mt-8">
          <button
            className={`py-2 px-4 rounded ${isDarkMode ? 'bg-black text-white' : 'bg-custom-green text-white'}`}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
