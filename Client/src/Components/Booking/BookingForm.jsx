import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./BookingForm.scss";

const BookingForm = ({
  onSubmit,
  setName,
  setEmail,
  setPhone,
  user,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
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
                value={user && user.firstName + user.lastName }
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
                value={user && user.email }

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
                value={user && user.phone }
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default BookingForm;
