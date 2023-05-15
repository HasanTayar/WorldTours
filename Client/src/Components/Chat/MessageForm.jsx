import React, { useState } from 'react';
import { Form, Button,InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { sendMessage } from '../../Services/chatService';

const MessageForm = ({ chatId , user, receiverId }) => {

  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      sendMessage(chatId, message, user._id, receiverId);

      setMessage('');
    }
  };
  
  

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
     
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
          </InputGroup>
    </Form>
  );
};

export default MessageForm;
