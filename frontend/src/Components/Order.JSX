import React, { useState } from 'react';

const Order = ({ tourId, selectedDate, price }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate a fake payment process
    console.log('Payment processed successfully');
    // You can call your API to save the order details in the database
  };

  return (
    <div className="order-component">
      <h2>Order</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Tour ID: {tourId}<br />
          Selected Date: {selectedDate.toLocaleDateString()}<br />
          Price: {price}
        </p>
        <div>
          <label htmlFor="payment-method">Payment Method: </label>
          <select
            name="payment-method"
            id="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Order;
