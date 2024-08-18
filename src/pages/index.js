// src/pages/index.js
import Link from 'next/link';
import Carousel from '../components/Carousel'; // Import the Carousel component
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

export default function Home() {
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext for dark mode

  return (
    <div className={`w-full min-h-screen p-12 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Welcome to Poshak</h1>
      
      {/* Carousel Component */}
      <div className="mt-4">
        <Carousel />
      </div>
      
      {/* Example products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Link href="/products/1" passHref>
          <div className={`border p-4 rounded-lg hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-blue-400' : 'bg-white border-gray-300 text-blue-500'}`}>
            <div className="text-center">View Product 1</div>
          </div>
        </Link>
        <Link href="/products/2" passHref>
          <div className={`border p-4 rounded-lg hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-blue-400' : 'bg-white border-gray-300 text-blue-500'}`}>
            <div className="text-center">View Product 2</div>
          </div>
        </Link>
        {/* Add more product links here */}
      </div>
    </div>
  );
}
