import { Form } from "react-bootstrap";
const Email = ({ user, setNewEmail }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        defaultValue={user.email}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
};
export default Email;
