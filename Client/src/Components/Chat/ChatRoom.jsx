import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import SendMessageForm from './SendMessageForm';
import { Container, Row, Col } from 'react-bootstrap';
import { getChatHistory, createMessage } from '../../Services/chatService';

const ChatRoom = ({ sender, receiver }) => {
  const [chats, setChats] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchChatHistory();
  }, [sender, receiver]);

  useEffect(() => {
    const unreadMessages = chats.filter((chat) => chat.receiver === sender && !chat.read);
    setUnreadCount(unreadMessages.length);
  }, [chats, sender]);

  const fetchChatHistory = async () => {
    const chatHistory = await getChatHistory(sender, receiver);
    setChats(chatHistory);
  };

  const handleSendMessage = async (content) => {
    const newMessage = await createMessage(sender, receiver, content);
    if (newMessage) {
      setChats([...chats, newMessage]);
    }
  };

  return (
    <Container className="chat-room">
      <Row>
        <Col>
          <h2>Chat with {receiver}</h2>
          {unreadCount > 0 && <span className="unread-count">({unreadCount} new messages)</span>}
        </Col>
      </Row>
      <Row>
        <Col>
          <ChatList chats={chats} />
          <SendMessageForm onSubmit={handleSendMessage} />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;
