import { Form, Button } from "react-bootstrap";
import GooglePlaceAutocomplete from "../../Services/Google/GooglePlaceAutocomplete";
import { useState } from "react";

const LocationField = ({ user, newLocation, handleLocationSelect }) => {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  if (editing || !user.location) {
    return (
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <GooglePlaceAutocomplete
          onLocationSelect={(place) => handleLocationSelect(place)}
          field={{ value: newLocation }}
          className="form-control"
        />
      </Form.Group>
    );
  } else {
    return (
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" defaultValue={user.location} readOnly />
        <Button onClick={handleEditClick} variant="primary">Edit</Button>
      </Form.Group>
    );
  }
};

export default LocationField;
