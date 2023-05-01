import { Col, Form } from "react-bootstrap";
const Bio = ({ user, setNewBio }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicBio">
      <Form.Label>Bio</Form.Label>
      <Col>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          defaultValue={user.bio}
          onChange={(e) => setNewBio(e.target.value)}
        />
      </Col>
    </Form.Group>
  );
};
export default Bio;
