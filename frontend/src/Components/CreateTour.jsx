import { useState } from 'react';
import axios from 'axios';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FormGroup,
  FormControl,
  FormLabel,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faImages, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/createtour.scss';

const Day = ({ index, handleDayInputChange, handleDayPhotoChange, handleLocationSelect, removeDay }) => {
  return (
    <div>
      <FormGroup>
        <FormLabel>{`Day ${index + 1} Name`}</FormLabel>
        <FormControl type="text" name="dayName" onChange={(e) => handleDayInputChange(e, index)} />
      </FormGroup>

      <GooglePlaceAutocomplete
        controlId={`location-day-${index + 1}`}
        label={`Day ${index + 1} Location`}
        onLocationSelect={(location) => handleLocationSelect(location, index + 1)}
      />
      <FormGroup>
        <FormLabel>{`Day ${index + 1} Description`}</FormLabel>
        <FormControl as="textarea" name="desc" onChange={(e) => handleDayInputChange(e, index)} />
      </FormGroup>
      <FormGroup>
        <FormLabel>{`Day ${index + 1} Photo`}</FormLabel>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faImages} />
          </InputGroup.Text>
          <FormControl type="file" name="dayPhoto" onChange={(e) => handleDayPhotoChange(e, index)} />
        </InputGroup>
      </FormGroup>
      <Button className="mb-3" variant="danger" type="button" onClick={removeDay}>
        <FontAwesomeIcon icon={faTrash} />
        Remove Day
      </Button>
    </div>
  );
};
const CreateTour = ({ user }) => {
  const [formData, setFormData] = useState({
    organizerId: user._id,
    name: '',
    desc: '',
    price: '',
    days: [],
    locations: [],
    tags: [],
  });
  const [tags, setTags] = useState([]);
  const [dayCount, setDayCount] = useState(1);
  const [timelinePhoto, setTimelinePhoto] = useState(null);
  const [dayPhotos, setDayPhotos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === 'tags') {
          formData[key].forEach((tag) => {
            data.append('tags[]', tag);
          });
        } else {
          data.append(key, JSON.stringify(formData[key]));
        }
      }
      data.append('timelinePhoto', timelinePhoto);
   
      dayPhotos.forEach((photo, index) => {
        data.append(`dayPhotos[${index}]`, photo);
      });
  
      const response = await axios.post('/api/create-tour', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Tour created successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating tour:', error);
      setSuccessMessage('');
      setErrorMessage('Something went wrong. Please try again.');
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
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <h2 className="text-center mb-4">Create Tour</h2>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormGroup>
                  <FormLabel>Tour Name</FormLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Tour Price</FormLabel>
                  <FormControl
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <GooglePlaceAutocomplete
                  controlId="location"
                  label="Location"
                  onLocationSelect={(location) => handleLocationSelect(location, 0)}
                />
                <FormGroup>
                  <FormLabel>Tour Description</FormLabel>
                  <FormControl
                    as="textarea"
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Timeline Photo</FormLabel>
                  <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={faImages} /></InputGroup.Text>
                    <FormControl
                      type="file"
                      name="timelinePhoto"
                      onChange={(e) => setTimelinePhoto(e.target.files[0])}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Tags</FormLabel>
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="tagInput"
                      placeholder="Enter a tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          addTag(e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                    <InputGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={(e) => {
                          const input = e.target.previousElementSibling;
                          addTag(input.value.trim());
                          input.value = '';
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add Tag
                      </Button>
                    </InputGroup>
                  </InputGroup>
                  <div className="mt-2">
                    {tags.map((tag) => (
                      <span key={tag} className="badge badge-primary mr-2">
                        {tag}{' '}
                        <FontAwesomeIcon
                          icon={faMinus}
                          onClick={() => removeTag(tag)}
                          style={{ cursor: 'pointer' }}
                        />
                      </span>
                    ))}
                  </div>
                </FormGroup>
  
                {[...Array(dayCount)].map((_, index) => (
                  <Day
                    key={index}
                    index={index}
                    handleDayInputChange={handleDayInputChange}
                    handleDayPhotoChange={handleDayPhotoChange}
                    handleLocationSelect={handleLocationSelect}
                    removeDay={removeDay}
                  />
                ))}
                <Button className="mb-3" variant="secondary" type="button" onClick={addDay}>
                  <FontAwesomeIcon icon={faPlus} /> Add Day
                </Button>
  
                <Button className="w-100" type="submit">Create Tour</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
};

export default CreateTour;

