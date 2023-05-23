import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PaymentSuccess.scss";
import { Link } from "react-router-dom";
const PaymentSuccess = () => {
  return (
    <Container className="payment-success">
      <Row>
        <Col>
          <h1>Payment Successful</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Thank you for your payment.</p>
          <p>Please wait for the organizer's response.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/Tours" className="btn btn-primary">Continue</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
