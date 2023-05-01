import { useState, useEffect } from "react";
import { Card, Container, Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag , faMoneyBill1Wave} from "@fortawesome/free-solid-svg-icons";
const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchAllTours();
  }, []);

  const fetchAllTours = async () => {
    try {
      const response = await axios.get('/api/tours');
      console.log(response.data);
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  console.table(tours);
  return (
    <Container>
      <Row>
        {tours.map((tour) => (
          <Col key={tour._id} sm={12} md={6} lg={4} onClick={() => handleTourClick(tour._id)}>
            <Card className="mb-4">
              <Card.Img variant="top" src={tour.photoTimeline} />
              <Card.Body>
                <Card.Title>{tour.name}</Card.Title>
                <Card.Text>
                <FontAwesomeIcon icon={faFlag}/>
                Country:<b> {tour.locations[0].locationName}</b>
                </Card.Text>
                <Card.Text>
                <FontAwesomeIcon icon={faMoneyBill1Wave}/>
                Price:<b> {tour.price}</b>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TourList;
