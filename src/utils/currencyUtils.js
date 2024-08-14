// utils/currencyUtils.js

const API_KEY = '08954b031effd48bf1c4b22d'; // Replace with your actual API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`; // Updated API endpoint

/**
 * Fetches exchange rates from the API.
 * @returns {Promise<Object>} An object containing exchange rates.
 */
export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    console.log('Fetched exchange rates:', data.rates); // Debugging line
    return data.rates; // Returns rates object e.g. { INR: 74.85 }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

/**
 * Converts a price from USD to INR or vice versa based on the exchange rate.
 * @param {number} price - The price to convert.
 * @param {number} exchangeRate - The exchange rate for conversion.
 * @param {boolean} toINR - If true, converts from USD to INR. If false, converts from INR to USD.
 * @returns {number} - The converted price.
 */
export const convertCurrency = (price, exchangeRate, toINR) => {
  console.log('Converting price:', price, 'using exchange rate:', exchangeRate, 'toINR:', toINR); // Debugging line
  if (toINR) {
    const converted = (price * exchangeRate).toFixed(2);
    console.log('Converted to INR:', converted); // Debugging line
    return converted;
  } else {
    const converted = (price / exchangeRate).toFixed(2);
    console.log('Converted to USD:', converted); // Debugging line
    return converted;
  }
};
