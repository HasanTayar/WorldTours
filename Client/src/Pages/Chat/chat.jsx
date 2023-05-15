import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatList from "../../Components/Chat/ChatList";
import ChatBox from "../../Components/Chat/ChatBox";
import MessageForm from "../../Components/Chat/MessageForm";
import { fetchAllUsers } from "../../Services/userService";
import { connectSocket, disconnectSocket, fetchChat } from "../../Services/chatService";

const ChatPage = ({ user }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(null);

  const handleChatSelect = (chatId, receiverId) => {
    setSelectedChatId(chatId);
    setReceiverId(receiverId);
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (selectedChatId && receiverId) {
        try {
          const chatHistory = await fetchChat(selectedChatId);
          setMessages(prevMessages => [...prevMessages, ...chatHistory]);
        } catch (error) {
          console.error(`Error fetching chat ${selectedChatId}:`, error);
        }
      }
    }

    fetchChatHistory();
  }, [selectedChatId, receiverId]);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    }
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      if (user.isAdmin) {
        try {
          const users = await fetchAllUsers();
          console.log(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    getUsers();
  }, [user]);

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <h2>Chats</h2>
          <ChatList onChatSelect={handleChatSelect} user={user} />
        </Col>
        <Col md={8}>
          {selectedChatId ? (
            <>
              <h2>Chat</h2>
              <ChatBox
                chatId={selectedChatId}
                messages={messages}
                setMessages={setMessages}
              />
              <MessageForm chatId={selectedChatId} user={user} receiverId={receiverId} />
            </>
          ) : (
            <div style={{ border: "1px solid black", padding: "20px" }}>
              Please select a chat to start conversation
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
