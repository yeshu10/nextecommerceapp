// src/pages/cart.js
export default function Cart() {
    // Example cart items
    const cartItems = [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 1, image: '/images/sample-product.jpg' },
    ];
  
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0; // Apply any discount logic here
    const total = subtotal - discount;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        {cartItems.map(item => (
          <div key={item.id} className="border p-4 mb-4 flex items-center">
            <img src={item.image} alt={item.name} className="w-24 h-24" />
            <div className="ml-4 flex-grow">
              <h2 className="text-xl">{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button className="bg-red-500 text-white py-1 px-3 rounded">Remove</button>
          </div>
        ))}
        <div className="mt-4">
          <h2 className="text-xl">Subtotal: ${subtotal.toFixed(2)}</h2>
          <h2 className="text-xl">Discount: ${discount.toFixed(2)}</h2>
          <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Checkout</button>
        </div>
      </div>
    );
  }
  