// src/pages/cart.js
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleQuantityChange = (item, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateQuantity(item, quantity);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 mb-4 shadow-lg flex items-center">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity || 1}
                    onChange={(event) => handleQuantityChange(item, event)}
                    className="border rounded px-2 py-1"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemove(item)}
                className="bg-red-500 text-white py-2 px-4 rounded ml-4"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
