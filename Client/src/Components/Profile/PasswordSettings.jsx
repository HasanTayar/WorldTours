import { Form, Button } from "react-bootstrap";
const PasswordSettings = () => {
    return(
  <Form>
    <Form.Group controlId="Password">
      <Form.Label>Current Password</Form.Label>
      <Form.Control type="password"></Form.Control>
    </Form.Group>
    <Form.Group controlId="Password1">
      <Form.Label>Enter a new Password</Form.Label>
      <Form.Control type="password"></Form.Control>
    </Form.Group>
    <Form.Group controlId="Password2">
      <Form.Label>Confriom Password</Form.Label>
      <Form.Control type="password"></Form.Control>
    </Form.Group>
    <Form.Group>
      <Button type="sumbit" variant="primary">
        {" "}
        Change Password
      </Button>
    </Form.Group>
  </Form>
    );
};
export default PasswordSettings;