// src/pages/products/[id].js
import { useRouter } from 'next/router';

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-1/2 mt-4" />
      <p className="mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
      {/* Add to Cart Button */}
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Add to Cart
      </button>
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch product IDs from your data source
  const products = await fetch('/api/products').then(res => res.json());
  const paths = products.map(product => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch product data by ID
  const product = await fetch(`/api/products/${params.id}`).then(res => res.json());
  return { props: { product } };
}
