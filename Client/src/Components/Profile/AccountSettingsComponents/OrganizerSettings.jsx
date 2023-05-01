import { Form } from "react-bootstrap";
import LocationField from "../LocationField";
import { useState } from "react";



const OrganizerSettings = ({
  user,
  setNewPhoneNumber,
  setNewLanguages,
  setNewCertifications,
  setNewSpecialties,
}) => {
  const [newLocation , setNewLocation] = useState(user.location);
  const handleLocationSelect = (place) => {
    setNewLocation(place.formatted_address);
  };
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          defaultValue={user.phoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
      </Form.Group>

      {
        <LocationField
          user={user}
          newLocation={newLocation}
          handleLocationSelect={handleLocationSelect}
        />
      }

      <Form.Group controlId="languages">
        <Form.Label>Languages</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your languages"
          defaultValue={user.languages}
          onChange={(e) => setNewLanguages(e.target.value.split(", "))}
        />
        <Form.Text className="text-muted">
          Separate multiple languages with commas (e.g. "English, Spanish,
          French")
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="certifications">
        <Form.Label>Certifications</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your certifications"
          defaultValue={user.certifications.join(",")}
          onChange={(event) =>
            setNewCertifications(event.target.value.split(","))
          }
        />
        <Form.Text className="text-muted">
          Separate multiple certifications with commas (e.g. "First Aid, CPR,
          Wilderness Guide")
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="specialties">
        <Form.Label>Specialties</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your Specialties"
          defaultValue={user.specialties.join(",")}
          onChange={(event) => setNewSpecialties(event.target.value.split(","))}
        />
        <Form.Text className="text-muted">
          Separate multiple Specialties with commas (e.g. "Ability to Listen ,
          Attention to Details .. ")
        </Form.Text>
      </Form.Group>
    </>
  );
};
export default OrganizerSettings;
