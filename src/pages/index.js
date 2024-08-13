// src/pages/index.js
export default function Home() {
    return (
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-3xl font-bold">Welcome to Our E-Commerce Store</h1>
          <p className="text-lg mt-2">Explore our range of products and enjoy shopping!</p>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Product cards will go here */}
          </div>
        </section>
      </div>
    );
  }
  