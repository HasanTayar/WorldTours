import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./BookingForm.scss";
import PaymentMethodForm from "./PaymentMethodForm";
const BookingForm = ({
  onSubmit,
  hasPaymentMethod,
  redirectToProfile,
  savedCards,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e, selectedCard) => {
    e.preventDefault();
    onSubmit({ name, email, phone, paymentMethod: selectedCard });
  };

  return (
    <Container>
      <Form className="booking-form" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <PaymentMethodForm
        onSubmit={handleSubmit}
        hasPaymentMethod={hasPaymentMethod}
        redirectToProfile={redirectToProfile}
        savedCards={savedCards}
      />
    </Container>
  );
};

export default BookingForm;
