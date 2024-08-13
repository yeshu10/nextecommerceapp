// src/pages/products/[id].js
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext'; // Adjust the path based on your project structure

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 }); // Add product with default quantity of 1
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-1/2 mt-4" />
      <p className="mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
}

export async function getStaticPaths() {
  const products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
  const paths = products.map(product => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const product = await fetch(`https://fakestoreapi.com/products/${params.id}`).then(res => res.json());
  return { props: { product } };
}
