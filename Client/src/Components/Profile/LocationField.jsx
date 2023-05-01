
import { Form } from "react-bootstrap";
import GooglePlaceAutocomplete from "../../Services/Google/GooglePlaceAutocomplete";

const LocationField = ({ user, newLocation, handleLocationSelect }) => {
  if (user.location) {
    return (
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" defaultValue={user.location} readOnly />
      </Form.Group>
    );
  } else {
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
  }
};

export default LocationField;
