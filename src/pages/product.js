// src/pages/products.js
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: '/images/sample-product.jpg',
    price: 29.99,
    description: 'A great product.',
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/images/sample-product.jpg',
    price: 39.99,
    description: 'Another great product.',
  },
  // Add more products as needed
];

export default function Products() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Products</h1>
      </header>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                <Link href={`/products/${product.id}`}>
                  <span className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">
                    View Details
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
