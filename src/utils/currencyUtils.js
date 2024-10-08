const exchangeRateUSDToINR = 83.88 ; // Fixed exchange rate for USD to INR


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
    return parseFloat((price / exchangeRateUSDToINR).toFixed(2)); // Convert to number
  }
};
