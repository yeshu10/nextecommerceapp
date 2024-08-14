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
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Left side for the image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-4 lg:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-2/3 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Right side for the product details */}
        <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4 text-center lg:text-left">{product.description}</p>
          <div className="mb-4">
            <p className="text-xl font-semibold">Price: ₹{product.price}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
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
