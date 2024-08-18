import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query; // Get the query from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use ThemeContext
  const { isDarkMode } = useContext(ThemeContext); 

  useEffect(() => {
    if (!query) {
      // No query to search for
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const filteredProducts = data.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <p className={`text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Loading...</p>;
  if (error) return <p className={`text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Error: {error}</p>;

  return (
    <div className={`min-h-screen bg-${isDarkMode ? 'gray-900 text-white' : 'white text-black'}`}>
      <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <header className="mb-4">
          <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
        </header>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className={`border rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
                  <div className="relative h-64">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold truncate">{product.title}</h3>
                    <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                    <Link href={`/products/${product.id}`}>
                      <div className={`mt-4 inline-block py-2 px-4 rounded-lg text-center ${isDarkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}>
                        View Details
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
