import { useState } from "react";
import GooglePlaceAutocomplete from "../../Services/Google/GooglePlaceAutocomplete";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Days from "../../Components/Tour/Days";
import "./createtour.scss";
import { createTour } from "../../Services/tourService";
import Tags from "../../Components/Tour/Tags";
import TourForm from "../../Components/Tour/TourForm";

const CreateTour = ({ user }) => {
  const [formData, setFormData] = useState({
    organizerId: user._id,
    name: "",
    desc: "",
    price: "",
    days: [],
    locations: [],
    tags: [],
    photoTimeline: null, // Added photoTimeline field
  });

  const [tags, setTags] = useState([]);
  const [dayCount, setDayCount] = useState(1);
  const [timelinePhoto, setTimelinePhoto] = useState(null);
  const [dayPhotos, setDayPhotos] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDayInputChange = (event, index) => {
    const { name, value } = event.target;
    const days = [...formData.days];
    days[index] = { ...days[index], [name]: value };
    setFormData({ ...formData, days });
  };

  const handleDayPhotoChange = (event, index) => {
    const file = event.target.files[0];
    const updatedDayPhotos = [...dayPhotos];
    updatedDayPhotos[index] = file;
    setDayPhotos(updatedDayPhotos);
  };

  const handleLocationSelect = (location, index) => {
    const { name } = location;
    const { lat, lng } = location.geometry.location;
    const newLocation = { locationName: name, lat: lat(), long: lng() };

    const locations = [...formData.locations];
    locations[index] = newLocation;
    setFormData({ ...formData, locations });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "tags") {
        formData[key].forEach((tag) => {
          data.append("tags[]", tag);
        });
      } else {
        if (key === "days" || key === "locations") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
    }
    data.append("timelinePhoto", timelinePhoto);
    dayPhotos.forEach((photo, index) => {
      data.append(`dayPhotos[${index}]`, photo);
    });

    const response = await createTour(data);
    if (response.success) {
      setSuccessMessage(response.message);
      setErrorMessage("");
    } else {
      setSuccessMessage("");
      setErrorMessage(response.message);
    }
  };

  const addDay = () => {
    setDayCount(dayCount + 1);
  };

  const removeDay = () => {
    setDayCount(dayCount - 1);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="mt-4">
            <Card.Body>
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <h2 className="text-center mb-4">Create Tour</h2>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <TourForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setTimelinePhoto={setTimelinePhoto}
                />
                <GooglePlaceAutocomplete
                  controlId="location"
                  label="Location"
                  onLocationSelect={(location) =>
                    handleLocationSelect(location, 0)
                  }
                />

                <Tags
                  tags={tags}
                  setTags={setTags}
                  formData={formData}
                  setFormData={setFormData}
                />

                {[...Array(dayCount)].map((_, index) => (
                  <Days
                    key={index}
                    index={index}
                    handleDayInputChange={handleDayInputChange}
                    handleDayPhotoChange={handleDayPhotoChange}
                    handleLocationSelect={handleLocationSelect}
                    removeDay={removeDay}
                  />
                ))}
                <Button
                  className="mb-3"
                  variant="secondary"
                  type="button"
                  onClick={addDay}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Day
                </Button>

                <Button className="w-100" type="submit">
                  Create Tour
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTour;
