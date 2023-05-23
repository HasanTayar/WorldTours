import { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import "./PaymentMethodForm.scss";

const PaymentMethodForm = ({
  hasPaymentMethod,
  redirectToProfile,
  savedCards,
  handlePaymentSubmit,
  setSelectedCard
}) => {
  const [selectedCard, setCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePaymentSubmit(selectedCard);
  };

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <Container className="payment-method-form">
      <br/>
      {hasPaymentMethod ? (
        <Form onSubmit={handleSubmit}>
          {savedCards && savedCards.map((card) => (
            <Row key={card._id} className="mb-3">
              <Col>
                <Card>
                  <Card.Body>
                    <Form.Check 
                      type="radio"
                      id={`card-${card._id}`}
                      name="paymentMethod"
                      value={card._id}
                      onChange={() => handleCardSelect(card._id)}
                      required
                      label={`Card ending in ${card.cardNumber.slice(-4)}`}
                      className="ml-2"
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
          <Button variant="primary" type="submit">Proceed</Button>
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
