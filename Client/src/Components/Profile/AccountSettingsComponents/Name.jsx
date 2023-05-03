import { Form } from "react-bootstrap";
const Name = ({ user, setNewFirstName, setNewLastName }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Full name</Form.Label>
      <div className="d-flex">
        <Form.Label className="me-2"></Form.Label>
        <Form.Control
          className="me-2"
          type="text"
          defaultValue={user.firstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <Form.Label className="me-2"></Form.Label>
        <Form.Control
          className="ms-2"
          type="text"
          defaultValue={user.lastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
      </div>
    </Form.Group>
  );
};
export default Name;
