// src/pages/cart.js
import { useState } from 'react';

const initialCartItems = [
  {
    id: 1,
    name: 'Product 1',
    image: '/images/sample-product.jpg',
    price: 29.99,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/images/sample-product.jpg',
    price: 39.99,
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    ));
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </header>
      <section>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg flex items-center p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-700 mt-2">${item.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 bg-red-500 text-white py-1 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Subtotal: ${subtotal.toFixed(2)}</h2>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Checkout</button>
        </div>
      </section>
    </div>
  );
}
