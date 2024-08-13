// src/pages/_app.js
import '../styles/globals.css'; // Import global styles if you have any
import { CartProvider } from '../context/CartContext'; // Adjust the path based on your project structure
import Header from '@/components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
        <Header/>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
