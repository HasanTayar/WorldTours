import { useState, useEffect } from "react";
import { Card, Container, Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TourList = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  const handleSearch = () => {
    fetchTours(undefined, undefined, searchTerm);
  };

  const fetchTours = async (price, rating, location) => {
    try {
      const queryParams = new URLSearchParams();

      if (price) {
        queryParams.append("price", price);
      }
      if (rating) {
        queryParams.append("rating", rating);
      }
      if (location) {
        queryParams.append("location", location);
      }

      const response = await axios.get(`/api/tours/search?${queryParams.toString()}`);
      setTours(response.data.data.tours);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  console.table(tours);
  return (
    <Container>
    {/* <div className="row mb-3">
  <div className="col-sm-8">
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      aria-label="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  <div className="col-sm-4">
    <button
      type="button"
      className="btn btn-secondary btn-block"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>
</div> */}
      <Row>
        {tours.map((tour) => (
          <Col key={tour._id} sm={12} md={6} lg={4} onClick={() => handleTourClick(tour._id)}>
            <Card className="mb-4">
              <Card.Img variant="top" src={tour.photoTimeline} />
              <Card.Body>
                <Card.Title>{tour.name}</Card.Title>
                <Card.Text>Country:<b> {tour.locations[0].locationName}</b></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TourList;
