// src/pages/_app.js
import '../styles/globals.css'; // Ensure global styles are imported

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
