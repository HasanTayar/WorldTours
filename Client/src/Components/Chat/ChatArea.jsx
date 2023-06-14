import React from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import './SCSS/ChatArea.scss';

const ChatArea = ({
  messages,
  sendMessage,
  deleteMessage,
  markAsRead,
  getMessages,
  senderId,
}) => {
  const handleViewMessage = (messageId) => {
    markAsRead(messageId);
  };

  return (
    <div className="chat-area">
      {messages.map((message) => (
        <Message
          key={message._id}
          message={message}
          deleteMessage={deleteMessage}
          handleViewMessage={handleViewMessage}
          senderId={senderId}
        />
      ))}
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatArea;
