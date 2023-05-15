import React, { useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { subscribeToChat } from "../../Services/chatService";

const ChatBox = ({ chatId, messages, setMessages }) => {
  const messagesEndRef = useRef(null);
  console.log("chatId :", chatId, " messages:\n", messages);
  useEffect(() => {
    subscribeToChat((message) => {
      if (message.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
  }, [chatId, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 
  return (
    <ListGroup>
      {messages.map((message, index) => (
        <ListGroup.Item key={index}>
          <strong>test:</strong> {message.content}
        </ListGroup.Item>
      ))}
      <div ref={messagesEndRef} />
    </ListGroup>
  );
};

export default ChatBox;
