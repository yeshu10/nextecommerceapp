const exchangeRateUSDToINR = 74.85; // Fixed exchange rate for USD to INR
const exchangeRateINRToUSD = 1 / exchangeRateUSDToINR; // Inverse of the above for INR to USD

/**
 * Converts a price from USD to INR or vice versa based on the fixed exchange rate.
 * @param {number} price - The price to convert.
 * @param {boolean} toINR - If true, converts from USD to INR. If false, converts from INR to USD.
 * @returns {number} - The converted price.
 */
export const convertCurrency = (price, toINR) => {
  if (toINR) {
    return parseFloat((price * exchangeRateUSDToINR).toFixed(2)); // Convert to number
  } else {
    return parseFloat((price * exchangeRateINRToUSD).toFixed(2)); // Convert to number
  }
};
