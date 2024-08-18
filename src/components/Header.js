import { useState , useContext  } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import { AiOutlineSearch, AiFillProduct } from 'react-icons/ai';
import { IoMdCart } from 'react-icons/io';
import { BsSun, BsMoon } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';

export default function Header() {
  const { cart } = useCart();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect or handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <header className={`p-4 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gradient-to-r from-pink-200 via-blue-100 to-custom-green text-gray-700'}`}>
      <div className="container mx-auto flex items-center relative">
        {/* Toggle Button for Sidebar on Small Screens */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 text-[22px] dark:text-gray-200"
        >
          ☰
        </button>

        {/* Sidebar for Small Screens */}
        {isSidebarOpen && (
          <div className={`fixed top-0 left-0 w-56 h-full p-4 z-50 shadow-lg ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gradient-to-b from-custom-green via-blue-100 to-pink-200'}`}>
            <button
              onClick={toggleSidebar}
              className="text-red-500 text-xl absolute top-2 right-2"
            >
              ×
            </button>
            <nav>
              <Link href="/product">
                <span className="flex items-center mt-2 dark:text-gray-200">
                  <AiFillProduct className="mr-2" />
                  Products
                </span>
              </Link>
              <Link href="/wishlist">
                <span className="flex items-center mt-2 dark:text-gray-200">
                  <FaHeart className="text-pink-500 mr-2" />
                  Wishlist
                </span>
              </Link>
              <Link href="/cart">
                <span className="flex items-center mt-2 dark:text-gray-200">
                  <IoMdCart className="mr-2" />
                  Cart ({itemCount})
                </span>
              </Link>
            </nav>
          </div>
        )}

        {/* Logo and Search */}
        <div className="flex items-center flex-grow">
          <Link href="/">
            <h1 className="text-xl font-bold cursor-pointer ml-2 mr-2 dark:text-gray-200">Poshak</h1>
          </Link>
          <form onSubmit={handleSearchSubmit} className="flex items-center flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 rounded border border-white w-full md:w-64 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
            />
            <button type="submit" className="text-black p-2 rounded ml-1 dark:bg-gray-600 dark:text-gray-200">
              <AiOutlineSearch size={20} />
            </button>
          </form>
        </div>

        {/* Navigation Links and Dark Mode Toggle */}
        <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/product" className="dark:text-gray-200">Products</Link>
            <Link href="/wishlist">
              <span className="flex items-center dark:text-gray-200">
                <FaHeart size={24} className="text-pink-500 mr-2" />
              </span>
            </Link>
            <Link href="/cart">
              <span className="flex items-center dark:text-gray-200">
                <IoMdCart size={30} />
                {itemCount > 0 && (
                <span className="absolute top-0 right-6 transform -translate-x-1 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {itemCount}
                </span>
                )}
              </span>
            </Link>
          </nav>
          <button
            onClick={toggleDarkMode}
            className="text-2xl ml-2 dark:text-gray-200"
          >
            {isDarkMode ? <BsMoon /> : <BsSun />}
          </button>
        </div>
      </div>
    </header>
  );
}
