// src/pages/index.js
import Link from 'next/link';
import Carousel from '../components/Carousel'; // Import the Carousel component

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to Poshak</h1>
      
      {/* Carousel Component */}
      <div className="mt-4">
        <Carousel />
      </div>
      
      {/* Example products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Link href="/products/1" className="block border p-4 rounded hover:shadow-lg text-blue-500">
          View Product 1
        </Link>
        <Link href="/products/2" className="block border p-4 rounded hover:shadow-lg text-blue-500">
          View Product 2
        </Link>
        {/* Add more product links here */}
      </div>
    </div>
  );
}
