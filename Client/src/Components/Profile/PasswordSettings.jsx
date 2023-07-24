import { Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { updatePasswordService } from "../../Services/userService";
const PasswordSettings = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlertVariant('danger');
      setAlertMessage("New password and confirm password do not match");
    } else {
      try {
        const response = await updatePasswordService(user._id, currentPassword, newPassword);
        setAlertVariant('success');
        setAlertMessage(response.message);
        setConfirmPassword('');
        setNewPassword('');
        setCurrentPassword('');
      } catch (error) {
        setAlertVariant('danger');
        setAlertMessage(`Failed to update password: ${error.response.data.message}`);
      }
    }
  };
  return (
    <>
    <Alert variant={alertVariant} show={alertMessage !== ""} onClose={() => setAlertMessage("")} dismissible>
        {alertMessage}
      </Alert>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="Password">
        <Form.Label>Current Password</Form.Label>
        <Form.Control type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId="Password1">
        <Form.Label>Enter a new Password</Form.Label>
        <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId="Password2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">Change Password</Button>
      </Form.Group>
    </Form>
    </>
  );
};

export default PasswordSettings;
