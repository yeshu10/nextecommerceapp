import React from 'react';

const CustomerInfoForm = ({ customerInfo, setCustomerInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={customerInfo.city}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">State</label>
          <input
            type="text"
            name="state"
            value={customerInfo.state}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={customerInfo.zip}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;
