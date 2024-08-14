import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure
import { AiOutlineSearch } from 'react-icons/ai'; // Make sure to install react-icons if you haven't already
import { IoMdCart } from "react-icons/io";

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
    <header className="bg-gradient-to-r from-pink-200 via-blue-200 to-green-200 text-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center flex-grow">
          <h1 className="text-xl font-bold mr-4">Poshak</h1>
          <form onSubmit={handleSearchSubmit} className="flex items-center flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 rounded border border-white w-64" // Adjust the width here
            />
            <button type="submit" className="text-black p-2 rounded ml-2">
              <AiOutlineSearch size={25} />
            </button>
          </form>
        </div>
        <nav className="flex items-center space-x-4"> {/* Add space between nav items */}
          <Link href="/product">
            <span className="text-black cursor-pointer">Products</span>
          </Link>
          <Link href="/cart">
            <div className="relative text-black cursor-pointer flex items-center">
              <IoMdCart size={30} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
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
