import React, { useState } from 'react';
import axios from 'axios';
import '../css/PaymentSettings.scss'
import { Form } from 'react-bootstrap';
const Payment = ({id}) => {
  const [userId, setUserId] = useState(id);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [savedCard, setSavedCard] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addPaymentMethod', { userId, cardNumber, expiryDate, cvv });
      if (response.status === 201) {
        setSavedCard(cardNumber);
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
      }
    } catch (error) {
      console.error('Error adding payment method', error);
    }
  };

  const getCardType = (cardNumber) => {
    // Add logic to determine card type based on the card number
  };

  return (
    <div className="add-payment-form">
      {savedCard && (
        <div className="saved-card">
          <i className={`fa ${getCardType(savedCard)} fa-2x`} aria-hidden="true"></i>
          <span>{`**** **** **** ${savedCard.slice(-4)}`}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
         hidden
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <Form.Group>
        <input
          type="month"
          placeholder="Expiry month"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        </Form.Group>
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <button type="submit">Add Payment Method</button>
      </form>
    </div>
  );
};

export default Payment;
