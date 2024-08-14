import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { fetchExchangeRates, convertCurrency } from '../utils/currencyUtils'; // Adjust the path based on your project structure
import { toast } from 'react-toastify'; 

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload.currency, exchangeRate: action.payload.exchangeRate };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], currency: 'USD', exchangeRate: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        // Assuming exchange rate for INR against USD is the rate we want
        dispatch({ type: 'SET_CURRENCY', payload: { currency: 'USD', exchangeRate: rates.INR || 1 } });
      }
      setLoading(false);
    };
    fetchRates();
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const updateQuantity = (product, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity } });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const switchCurrency = (currency) => {
    if (currency === 'USD') {
      // Ensure we convert based on current exchange rate
      dispatch({ type: 'SET_CURRENCY', payload: { currency: 'USD', exchangeRate: 1 / state.exchangeRate } });
    } else if (currency === 'INR') {
      // Set exchange rate to current
      dispatch({ type: 'SET_CURRENCY', payload: { currency: 'INR', exchangeRate: state.exchangeRate } });
    }
  };

  const getCartItemsWithConvertedPrices = () => {
    return state.items.map(item => ({
      ...item,
      price: convertCurrency(item.price, state.exchangeRate, state.currency === 'INR')
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart: getCartItemsWithConvertedPrices(),
        addToCart,
        removeFromCart,
        handleAddToCart,
        updateQuantity,
        switchCurrency,
        currentCurrency: state.currency,
        exchangeRate: state.exchangeRate,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
