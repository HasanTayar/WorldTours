import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faLocation,

  faCity,
} from "@fortawesome/free-solid-svg-icons";
import { fetchAllTours } from "../../Services/tourService";

const TourList = ({ user }) => {
  const [tours, setTours] = useState([]);
  const userId = user ? user._id : "";
  const userLocation = JSON.parse(localStorage.getItem("userLocation"));
  useEffect(() => {
    async function fetchTours() {
      const fetchedTours = await fetchAllTours();
      setTours(fetchedTours);
    }

    fetchTours();
  }, []);
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}?/&userId=${userId}`);
  };

  // Function to calculate distance - Add your own implementation
  const calculateDistance = (userLocation, tourLocation) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = tourLocation.lat;
    const lon2 = tourLocation.long;

    // Convert latitude and longitude to radians
    const radLat1 = toRadians(lat1);
    const radLon1 = toRadians(lon1);
    const radLat2 = toRadians(lat2);
    const radLon2 = toRadians(lon2);

    // Calculate the differences between coordinates
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers
    const distance = earthRadius * c;

    // Return the distance in kilometers
    return distance.toFixed();
  };

  // Helper function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return (
    <Container>
      <Row>
        {tours.map((tour) => (
          <Col
            key={tour._id}
            sm={12}
            md={6}
            lg={4}
            className="d-flex align-items-stretch"
            onClick={() => handleTourClick(tour._id)}
          >
            <Card className="mb-4 h-100">
              <Card.Img variant="top" src={tour.photoTimeline} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{tour.name}</Card.Title>
                <Card.Text>
                  <FontAwesomeIcon icon={faCity} /> &nbsp; Country:
                  <b> {tour.locations[0].locationName}</b>
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faMoneyBill1Wave} /> &nbsp; Price:
                  <b> {tour.price} $</b>
                </Card.Text>
                <Card.Text className="mt-auto">
                  <FontAwesomeIcon icon={faLocation} />
                  &nbsp; Distance:
                  <b> {calculateDistance(userLocation, tour.locations[0])}Km</b>
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
