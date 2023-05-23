import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import myPhoto from '../../assets/myphoto.jpeg'; // Replace with the path to your photo

const About = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={4}>
          <img src={myPhoto} className="img-fluid rounded-circle" alt="Your name"/>
        </Col>
        <Col md={8}>
          <h2>About World Tour</h2>
          <p>
            Our website is engaged in organizing tours, connecting between the organizer and the traveler.
            It provides good suggestions for the preferred countries. Our site also helps elderly people who 
            do not quite understand how to book flights and do not settle abroad, so we have good organizers 
            who can help with this depending on the amount of money. 
            {/* Add more of your project description here */}
          </p>
          <h4>Goals of the system:</h4>
          <ul>
            <li>Provide travelers with all details about the guide to provide quick and convenient access.</li>
            <li>Organize the trip according to a specific need.</li>
            <li>Rate the guide after the trip.</li>
            {/* Add more of your goals here */}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
