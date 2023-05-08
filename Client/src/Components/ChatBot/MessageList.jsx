import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, isTyping }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      {isTyping && (
        <div className={`message bot-message typing-indicator`}>
          <span>Typing...</span>
        </div>
      )}
    </div>
  );
};

export default MessageList;
