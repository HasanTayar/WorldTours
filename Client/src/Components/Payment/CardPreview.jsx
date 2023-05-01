import React from 'react';
import './CardPreview.scss';

const CardPreview = ({ cardNumber, expiryDate, cvv }) => {
  return (
    <div className="card-preview">
      <div className="card-number">{cardNumber || 'XXXX XXXX XXXX XXXX'}</div>
      <div className="expiry-date">
        Expiry Date: {expiryDate || 'MM/YYYY'}
      </div>
      <div className="cvv">CVV: {cvv || 'XXX'}</div>
    </div>
  );
};

export default CardPreview;
