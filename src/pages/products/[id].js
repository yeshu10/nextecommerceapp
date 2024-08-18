import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext'; // Adjust the path based on your project structure
import { useWishlist } from '../../context/WishlistContext'; // Import WishlistContext
import { convertCurrency } from '../../utils/currencyUtils'; // Ensure correct path
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import icons

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { currentCurrency, addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist(); // Use WishlistContext

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Convert the price based on the current currency
  const convertedPrice = currentCurrency === 'INR'
    ? convertCurrency(product.price, true) // Convert from USD to INR
    : convertCurrency(product.price, false); // Convert from INR to USD

  // Check if the product is in the wishlist
  const isFavorited = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    // Add the product to the cart with the correct price and quantity
    addToCart({ ...product, quantity: 1 });
  };

  const toggleWishlist = () => {
    if (isFavorited) {
      removeFromWishlist(product); // Remove from wishlist
    } else {
      addToWishlist(product); // Add to wishlist
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start mt-8">
        {/* Left side for the image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-4 lg:mb-0 mt-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-1/2 h-auto object-cover rounded-lg shadow-lg" // Decreased image width
          />
        </div>
        {/* Right side for the product details */}
        <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col items-center lg:items-start mt-4">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4 text-center lg:text-left">{product.description}</p>
          <div className="mb-4">
            <p className="text-xl font-semibold">
              Price: {currentCurrency === 'INR' ? '₹' : '$'}{convertedPrice}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <button
              onClick={handleAddToCart}
              className="bg-custom-green text-white py-2 px-4 rounded mr-4"
            >
              Add to Cart
            </button>
            <button
              onClick={toggleWishlist}
              className="text-2xl"
            >
              {isFavorited ? (
                <AiFillHeart className="text-pink-500" /> // Filled heart icon when favorited
              ) : (
                <AiOutlineHeart className="text-gray-500" /> // Outline heart icon when not favorited
              )}
            </button>
          </div>
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
