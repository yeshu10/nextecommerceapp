import React, { createContext, useContext, useReducer, useState } from 'react';
import { convertCurrency } from '../utils/currencyUtils'; // Adjust the path based on your project structure
import { toast } from 'react-toastify'; 

const CartContext = createContext();

const exchangeRateUSDToINR = 74.85; // Fixed exchange rate

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
      return { ...state, currency: action.payload.currency };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], currency: 'USD' });
  const [loading, setLoading] = useState(false);

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
    dispatch({ type: 'SET_CURRENCY', payload: { currency } });
  };

  const getCartItemsWithConvertedPrices = () => {
    const toINR = state.currency === 'INR';
    return state.items.map(item => ({
      ...item,
      price: convertCurrency(item.price, exchangeRateUSDToINR, toINR)
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
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
