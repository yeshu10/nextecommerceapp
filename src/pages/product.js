import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

// Fetch products from the API
export async function getStaticProps() {
  // Fetch data from the API
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}

export default function Products({ products }) {
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext

  return (
    <div className={`w-full p-12 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'} overflow-hidden`}>
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Products</h1>
      </header>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
