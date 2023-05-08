import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SendMessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <Form onSubmit={handleSubmit} className="send-message-form">
      <Form.Group>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
      </Form.Group>
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default SendMessageForm;
