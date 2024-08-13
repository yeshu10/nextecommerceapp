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
    console.log('Search Query:', query); // Debugging line
    if (query) {
      setLoading(true);
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          console.log('Fetched Data:', data); // Debugging line
          const filteredProducts = data.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          console.log('Filtered Products:', filteredProducts); // Debugging line
          setProducts(filteredProducts);
          setLoading(false);
        })
        .catch(err => {
          console.error('Fetch Error:', err); // Debugging line
          setError(err.message);
          setLoading(false);
        });
    }
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
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-gray-700 mt-2">{product.description}</p>
                  <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                  <Link href={`/products/${product.id}`}>
                    <div className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">
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
