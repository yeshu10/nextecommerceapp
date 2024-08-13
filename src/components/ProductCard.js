// src/components/ProductCard.js
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Add to Cart
        </button>
        <Link href={`/products/${product.id}`}>
          <div className="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer">
            View Details
          </div>
        </Link>
      </div>
    </div>
  );
}
