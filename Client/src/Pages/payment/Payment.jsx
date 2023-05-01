import  { useEffect, useState } from 'react';
import axios from 'axios';
import './PaymentSettings.scss';
import { Form, Button } from 'react-bootstrap';
import CardPreview from '../../Components/Payment/CardPreview';
import SavedCards from '../../Components/Payment/SavedCards';


const Payment = ({ id }) => {
  const [userId, setUserId] = useState(id);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addPaymentMethod', { userId, cardNumber, expiryDate, cvv });
      if (response.status === 201) {
        
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
      }
    } catch (error) {
      console.error('Error adding payment method', error);
    }
  };
  useEffect(() => {
    const getCridets = async () => {
      try {
        const response = await axios.get(`/api/user/${id}/hasPaymentRef`);
        if (response.status === 200) {
          console.log("Fetched data:", response.data); // Debugging message
          setSavedCards(response.data);
        }
      } catch (error) {
        console.log("Error with fetching data:", error);
      }
    };
    getCridets();
  }, []);
  
  
  
  
  const handleDeleteCard = async (cardId) => {
    try {
      const response = await axios.delete(`/api/delete/${cardId}`);
      console.log(cardId);
      if (response) {
        setSavedCards(savedCards.filter((card) => card._id !== cardId));
      }
    } catch (error) {
      console.error('Error deleting payment method', error);
    }
  };


  return (
    <div className="add-payment-form">
      <SavedCards savedCards={savedCards} handleDeleteCard={handleDeleteCard} />
      <Button variant="success" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide form' : 'Add new card'}
      </Button>
      {showForm && (
        <>
          <CardPreview cardNumber={cardNumber} expiryDate={expiryDate} cvv={cvv} />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$"
                required
              />
            </Form.Group>
            <Form.Group controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="month"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="cvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                pattern="\d{3,4}"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Payment Method
            </Button>
          </Form>
        </>
      )}
    </div>
  );
  
  
};

export default Payment;
