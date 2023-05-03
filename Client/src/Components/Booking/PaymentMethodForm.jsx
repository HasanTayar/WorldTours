import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./PaymentMethodForm.scss";

const PaymentMethodForm = ({
  onSubmit,
  hasPaymentMethod,
  redirectToProfile,
  savedCards,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, selectedCard); // Pass the event object here
  };

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <Container>
      <h3>Payment Method</h3>
      {hasPaymentMethod ? (
        <Form onSubmit={handleSubmit}>
          {savedCards.map((card) => (
            <Row key={card._id}>
              <Col>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={card._id}
                  onChange={() => handleCardSelect(card._id)}
                  required
                />
                <label htmlFor={card._id}>
                  Card ending in {card.cardNumber.slice(-4)}
                </label>
              </Col>
            </Row>
          ))}
          <Button variant="primary" type="submit">
            Pay
          </Button>
        </Form>
      ) : (
        <>
          <p>Please add a payment method in your profile first.</p>
          <Button variant="warning" onClick={redirectToProfile}>
            Go to Profile
          </Button>
        </>
      )}
    </Container>
  );
};

export default PaymentMethodForm;
