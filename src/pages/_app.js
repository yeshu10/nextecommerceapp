// src/pages/_app.js
import '../styles/globals.css'; // Import global styles if you have any
import { CartProvider } from '../context/CartContext'; // Adjust the path based on your project structure

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { WishlistProvider } from '@/context/WishlistContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <WishlistProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default MyApp;
