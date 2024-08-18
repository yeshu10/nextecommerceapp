import { useState, useEffect, useContext } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

export default function Footer() {
  const { currentCurrency, switchCurrency } = useCart();
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext to get the current theme
  const [isUSD, setIsUSD] = useState(currentCurrency === 'USD');

  useEffect(() => {
    // Sync state with currentCurrency from CartContext
    setIsUSD(currentCurrency === 'USD');
  }, [currentCurrency]);

  const handleToggleCurrency = () => {
    const newCurrency = isUSD ? 'INR' : 'USD';
    switchCurrency(newCurrency);
  };

  return (
    <footer className={`p-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gradient-to-r from-custom-green via-blue-200 to-pink-200 text-gray-700'}`}>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col items-center lg:items-start mb-4 lg:mb-0">
          <h2 className="text-xl font-bold mb-2">Poshak</h2>
          <p className="text-sm">© 2024 Poshak. All rights reserved.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start mb-4 lg:mb-0">
          <div className="flex space-x-4 mb-4 lg:mb-0">
            <Link href="https://facebook.com" passHref>
              <FaFacebookF size={20} className={`cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-black hover:text-gray-900'}`} />
            </Link>
            <Link href="https://instagram.com" passHref>
              <FaInstagram size={20} className={`cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-black hover:text-gray-900'}`} />
            </Link>
            <Link href="https://twitter.com" passHref>
              <FaTwitter size={20} className={`cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-black hover:text-gray-900'}`} />
            </Link>
            <Link href="https://linkedin.com" passHref>
              <FaLinkedinIn size={20} className={`cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-black hover:text-gray-900'}`} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-x-6 lg:space-y-0">
            <li>
              <Link href="/about" passHref>
                <span className={`hover:text-gray-900 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>About Us</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <span className={`hover:text-gray-900 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy" passHref>
                <span className={`hover:text-gray-900 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link href="/terms" passHref>
                <span className={`hover:text-gray-900 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Terms of Service</span>
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={handleToggleCurrency}
          className={`bg-pink-600 text-white py-2 px-4 rounded mt-4 lg:mt-0 text-2xl ${isDarkMode ? 'bg-pink-700' : 'bg-pink-600'}`}
        >
          {isUSD ? ' ₹ ' : '  $'}
        </button>
      </div>
    </footer>
  );
}
