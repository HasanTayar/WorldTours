import React from "react";
import { Container } from "react-bootstrap";

const Header = () => (
  <div className="sticky-top bg-dark text-white py-3">
    <Container>
      <h1 className="text-center">Welcome to WorldTours</h1>
      <p className="text-center">Your travel adventure starts here.</p>
    </Container>
  </div>
);

export default Header;
