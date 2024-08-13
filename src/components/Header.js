// src/components/Header.js
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure
import { AiOutlineSearch } from 'react-icons/ai'; // Make sure to install react-icons if you haven't already

export default function Header() {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect or handle the search logic here
    // For example, navigate to a search results page
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Store</h1>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded border border-gray-600"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            <AiOutlineSearch />
          </button>
        </form>
        <nav>
          <Link href="/cart">
            <div className="relative bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
              View Cart
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
