import React, { useState } from 'react';
import axios from 'axios';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import { Form, FormGroup, Label, Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const TourForm = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [days, setDays] = useState([{ dayName: '', desc: '', location: '', photo: null }]);
  const [locations, setLocations] = useState([{ locationName: '', lat: 0, long: 0 }]);
  const [timelinePhoto, setTimelinePhoto] = useState(null);

  const handleTimelinePhotoChange = (e) => {
    setTimelinePhoto(e.target.files[0]);
  };

  const handleDayPhotoChange = (index, e) => {
    const file = e.target.files[0];
    const newDays = [...days];
    newDays[index].photo = file;
    setDays(newDays);
  };

  const addDay = () => {
    setDays([...days, { dayName: '', desc: '', location: '', photo: null }]);
  };

  const removeDay = (index) => {
    setDays(days.filter((_, i) => i !== index));
  };

  const handleDayChange = (index, field, value) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('days', JSON.stringify(days));
    formData.append('locations', JSON.stringify(locations));
    formData.append('timelinePhoto', timelinePhoto);
  
    days.forEach((day, index) => {
      formData.append(`dayPhotos[${index}]`, day.photo);
    });
  
    // Add console.log statements to check the JSON strings
    console.log('Days JSON:', JSON.stringify(days));
    console.log('Locations JSON:', JSON.stringify(locations));
  
    try {
      const response = await axios.post('/api/create-tour', formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Tour Name</Label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter tour name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="desc">Tour Description</Label>
        <input
          type="textarea"
          name="desc"
          id="desc"
          placeholder="Enter tour description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="timelinePhoto">Timeline Photo</Label>
        <input
          type="file"
          name="timelinePhoto"
          id="timelinePhoto"
          onChange={handleTimelinePhotoChange}
        />
      </FormGroup>
      {days.map((day, index) => (
        <div key={index}>
          <Row>
            <Col>
              <FormGroup>
                <Label for={`dayName${index}`}>Day {index + 1} Name</Label>
                <input
                  type="text"
                  name={`dayName${index}`}
                  id={`dayName${index}`}
                  placeholder={`Enter day ${index + 1} name`}
                  value={day.dayName}
                  onChange={(e) => handleDayChange(index, 'dayName', e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for={`dayPhoto${index}`}>Day {index + 1} Photo</Label>
                <input
                  type="file"
                  name={`dayPhoto${index}`}
                  id={`dayPhoto${index}`}
                  onChange={(e) => handleDayPhotoChange(index, e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for={`dayDesc${index}`}>Day {index + 1} Description</Label>
            <input
              type="textarea"
              name={`dayDesc${index}`}
              id={`dayDesc${index}`}
              placeholder={`Enter day ${index + 1} description`}
              value={day.desc}
              onChange={(e) => handleDayChange(index, 'desc', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for={`dayLocation${index}`}>Day {index + 1} Location</Label>
            <GooglePlaceAutocomplete
              id={`dayLocation${index}`}
              onLocationSelect={(locationData) => {
                handleDayChange(index, 'location', locationData.location);
                setLocations([...locations, locationData]);
              }}
            />
          </FormGroup>
          {days.length > 1 && (
            <Button color="danger" onClick={() => removeDay(index)}>
              <FontAwesomeIcon icon={faTimes} /> Remove Day {index + 1}
            </Button>
          )}
          <hr />
        </div>
      ))}
      <Button color="primary" onClick={addDay}>
        <FontAwesomeIcon icon={faPlus} /> Add Day
      </Button>
      <hr />
      <Button type="submit" color="success">
        Save Tour
      </Button>
    </Form>
  );
};

export default TourForm;

