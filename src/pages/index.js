// src/pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to the Poshak</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Example products */}
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
