import React, { useState } from 'react';
import ChatRoom from '../../Components/Chat/ChatRoom';
import UsersList from '../../Components/Chat/UsersList';
import { Container, Row, Col } from 'react-bootstrap';


const ChatPage = () => {
  const [sender] = useState('YourUsername');
  const [receiver, setReceiver] = useState(null);

  const handleUserSelect = (selectedUser) => {
    setReceiver(selectedUser);
  };

  return (
    <Container className="chat-page">
      <Row>
        <Col md={4}>
          <UsersList onUserSelect={handleUserSelect} />
        </Col>
        <Col md={8}>
          {receiver && <ChatRoom sender={sender} receiver={receiver} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
