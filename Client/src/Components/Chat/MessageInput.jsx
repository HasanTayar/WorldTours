import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import './SCSS/messageInput.scss';

const MessageInput = ({ sendMessage }) => {
  const [messageBody, setMessageBody] = useState('');

  const handleSendMessage = () => {
    if (messageBody && messageBody.trim()) {
      sendMessage(messageBody);
      setMessageBody('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };



  return (
    <InputGroup>
      <Input 
        type="text" 
        value={messageBody} 
        onChange={(e) => setMessageBody(e.target.value)} 
        onKeyPress={handleKeyPress}
      />
      <Button color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </InputGroup>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
