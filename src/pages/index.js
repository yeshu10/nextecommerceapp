// src/pages/index.js
import Carousel from '../components/Carousel'; 
import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

// Fetch products from the API
export async function getStaticProps() {
  // Fetch data from the API
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  // Limit to only the first three products
  const limitedProducts = products.slice(0, 3);

  return {
    props: {
      products: limitedProducts,
    },
  };
}

export default function Home({ products }) {
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext

  return (
    <div className={`w-full min-h-screen p-12 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Welcome to Poshak</h1>
      
      {/* Carousel Component */}
      <div className="mt-4">
        <Carousel />
      </div>
      
      {/* Display products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
