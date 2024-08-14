// src/components/ProductCard.js
import { useCart } from '../context/CartContext'; 
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      {/* First Part: Image, Title, and Price */}
      <Link href={`/products/${product.id}`}>
        <div className="flex-grow cursor-pointer">
          <div className="relative w-full h-48"> {/* Fixed height for image container */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold">{product.title}</h3>
            <p className="text-sm font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>

      {/* Second Part: Add to Cart Button */}
      <div className="p-4 bg-gray-100 mt-auto"> {/* Ensure button is at the bottom */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
