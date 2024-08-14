// src/utils/currencyUtils.js
import axios from 'axios';

const API_KEY = ' 08954b031effd48bf1c4b22d'; // Replace with your API key
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Example base URL

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

export const convertToINR = (amount, rate) => amount * rate;
