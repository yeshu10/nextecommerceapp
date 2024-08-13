// src/components/Header.js
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Store</h1>
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
