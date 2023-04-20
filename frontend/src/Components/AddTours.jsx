import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';

export default function AddTour({ user }) {
  const { register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'days' });

  const [locations, setLocations] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [timelinePreview, setTimelinePreview] = useState(null);
  const [mainLocation, setMainLocation] = useState(null);

  const handleMainLocationSelect = (place) => {
    const newMainLocation = {
      locationName: place.name,
      long: place.geometry.location.lng(),
      lat: place.geometry.location.lat(),
    };
    setMainLocation(newMainLocation);
  };

  const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`
};

const onSubmit = async (data) => {
    console.groupCollapsed(data);
    try {
      const formData = new FormData();
      formData.append('organizerId', data.organizerId);
      formData.append('name', data.name);
      formData.append('desc', data.desc);
      formData.append('mainLocation', JSON.stringify(mainLocation));

      // Check if photoTimeline is undefined before using it
      if (data.photoTimeline && data.photoTimeline[0]) {
        formData.append('photoTimeline', data.photoTimeline[0]);
      }

      formData.append('days', JSON.stringify(data.days.map((day, index) => ({
        dayName: day.dayName,
        photo: Array.isArray(day.photo) && day.photo.length > 0 ? day.photo[0] : '', // Use default value if photo is an empty array
        location: day.location,
        desc: day.desc
      }))));

      formData.append('location', JSON.stringify(locations));

      const response = await axios.post('/api/create-tour', formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };
  
  const handleLocationSelect = (place, index) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = {
      locationName: place.name,
      long: place.geometry.location.lng(),
      lat: place.geometry.location.lat(),
    };
    setLocations(updatedLocations);
  };

  const handlePreview = (e, index = null) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (index === null) {
        setTimelinePreview(reader.result);
      } else {
        const newPreviewImages = [...previewImages];
        newPreviewImages[index] = reader.result;
        setPreviewImages(newPreviewImages);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="organizerId">
        <Form.Control
          {...register('organizerId')}
          defaultValue={user._id}
          hidden
        />
      </Form.Group>
  
      <Form.Group controlId="name">
        <Form.Label>Tour Name</Form.Label>
        <Form.Control {...register('name')} required />
      </Form.Group>
  
      <Form.Group controlId="desc">
        <Form.Label>Description</Form.Label>
        <Form.Control {...register('desc')} required />
      </Form.Group>
  
      <Form.Group controlId="mainLocation">
        <Form.Label>Main Location</Form.Label>
        <GooglePlaceAutocomplete
          onLocationSelect={handleMainLocationSelect}
          field={{ ...register('mainLocation') }}
          className="form-control"
        />
      </Form.Group>
  
      <Form.Group controlId="photoTimeline">
        <Form.Label>Photo Timeline</Form.Label>
        <Form.Control
          type="file"
          onChange={handlePreview}
          {...register('photoTimeline')}
          required
        />
        {timelinePreview && (
          <Image
            src={timelinePreview}
            thumbnail
            className="mt-3"
            alt="Photo Timeline Preview"
          />
        )}
      </Form.Group>
  
      {fields.map((field, index) => (
        <div key={field.id}>
          <h3 className="mt-3">Day {index + 1}</h3>
          <Form.Group controlId={`day-${index}-name`}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register(`days.${index}.dayName`)}
              required
            />
          </Form.Group>
          <Form.Group controlId={`day-${index}-photo`}>
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handlePreview(e, index)}
              {...register(`days.${index}.photo`)}
              required
            />
            {previewImages[index] && (
              <Image
                src={previewImages[index]}
                thumbnail
                className="mt-3"
                alt={`Day ${index + 1} Preview`}
              />
            )}
          </Form.Group>
  
          <Form.Group controlId={`day-${index}-location`}>
            <Form.Label>Location</Form.Label>
            <GooglePlaceAutocomplete
              onLocationSelect={(place) => handleLocationSelect(place, index)}
              field={{ ...register(`days.${index}.location`) }}
              className="form-control"
            />
          </Form.Group>
  
          <Form.Group controlId={`day-${index}-desc`}>
            <Form.Label>Description</Form.Label>
            <Form.Control {...register(`days.${index}.desc`)} required />
          </Form.Group>
  
          <Button
            variant="danger"
            type="button"
            onClick={() => remove(index)}
          >
            Remove Day
          </Button>
        </div>
      ))}
  
      <Button
        className="mt-3"
        variant="success"
        type="button"
        onClick={() => append({})}
      >
        Add Day
      </Button>
  
      <input
        type="hidden"
        value={JSON.stringify(locations)}
        {...register('location')}
      />
  
      <Button className="mt-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
            }
            