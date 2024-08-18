import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query; // Get the query from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      </header>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
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
                    <div className="mt-4 inline-block bg-pink-500 text-white py-2 px-4 rounded-lg text-center">
                      View Details
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
