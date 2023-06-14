import React, { useEffect } from 'react';
import './SCSS/message.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const Message = ({ message, deleteMessage, handleViewMessage, senderId }) => {
  const { sender, content, createdAt, read } = message;
  console.log(message);

  const isOwnMessage = sender && sender._id === senderId;

  useEffect(() => {
    if (!isOwnMessage && !read) {
      handleViewMessage(message._id);
    }
  }, [isOwnMessage, read, handleViewMessage, message._id]);

  const formattedTimestamp = new Date(createdAt).toLocaleString();

  return (
    <div className={`message ${isOwnMessage ? 'own-message' : ''}`}>
      <div className="message-sender">
        {sender && (
          <>
            <img src={sender.photo} alt={sender.firstName} className="sender-photo" />
            <span className="sender-name">
              {sender.firstName} {sender.lastName}
            </span>
          </>
        )}
      </div>
      <div className="message-text">{content}</div>
      <div className="message-time">{formattedTimestamp}</div>

      <FontAwesomeIcon
        icon={read ? faCheckDouble : faCheck}
        className={`read-indicator ${read ? 'double-check' : ''}`}
      />
      {isOwnMessage && (
        <div className="message-actions">
          <button onClick={() => deleteMessage(message._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Message;
