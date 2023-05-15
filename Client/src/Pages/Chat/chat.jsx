import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatList from '../../Components/Chat/ChatList';
import ChatBox from '../../Components/Chat/ChatBox';
import MessageForm from '../../Components/Chat/MessageForm';

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    setMessages([]);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <h2>Chats</h2>
          <ChatList onChatSelect={handleChatSelect} />
        </Col>
        <Col md={8}>
          {selectedChatId && (
            <>
              <h2>Chat</h2>
              <ChatBox chatId={selectedChatId} messages={messages} setMessages={setMessages} />
              <MessageForm chatId={selectedChatId} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
