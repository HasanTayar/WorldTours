import React, { useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import './SCSS/ChatArea.scss';
const ChatArea = ({ messages, sendMessage, deleteMessage, markAsRead, getMessages, senderId }) => {


  
  const handleViewMessage = (messagesId) => {
    // Call markAsRead function with the messageId
    markAsRead(messagesId);
  };

  return (
    <div className="chat-area">
      {messages.map((message, i) => (
        <Message
          key={i}
          message={message}
          deleteMessage={deleteMessage}
          handleViewMessage={handleViewMessage}
          senderId={senderId}
          markAsRead={markAsRead}
        />
      ))}
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatArea;
