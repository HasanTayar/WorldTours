import { Card } from "react-bootstrap";
const handleLocationSelect = (place) => {
    setNewLocation(place.formatted_address);
  };
const OrgainzerPublicView = ({ user }) => {
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Location</Card.Title>
          <Card.Text>{user.location}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Languages</Card.Title>
          <Card.Text>{user.languages.join(", ")}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>specialties</Card.Title>
          <Card.Text>{user.specialties.join(", ")}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>certifications</Card.Title>
          <Card.Text>{user.certifications.join(", ")}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Tours Organized</Card.Title>
          <Card.Text>{user.toursOrganized}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default OrgainzerPublicView;
