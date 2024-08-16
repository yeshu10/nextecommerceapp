import React from 'react';

const PaymentInfoForm = ({ paymentInfo, setPaymentInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default PaymentInfoForm;
