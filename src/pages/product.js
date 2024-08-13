import Link from 'next/link';

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
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.title}</h3>
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
