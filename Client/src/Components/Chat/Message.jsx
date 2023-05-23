import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SCSS/message.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
const Message = ({ message, deleteMessage, markAsRead, senderId }) => {
  const { sender, content, timestamp, read } = message;
  console.log(message);
  if (!message) return null; // Safeguard against undefined messages

  const renderMessageContent = () => {
    return (
      <div>
        <div className="message-sender">
          <img src={sender.photo} alt={sender.firstName} className="sender-photo" />
          <span className="sender-name">{sender.firstName} {sender.lastName}</span>
        </div>
        <div className="message-text">
          {content}
          {!read && <span className="unread-indicator">Unread</span>}
        </div>
      </div>
    );
  };
  

  const isOwnMessage = sender && sender._id === senderId;

  useEffect(() => {
    // Call markAsRead function when the component mounts
    if (!isOwnMessage && !read) {
      markAsRead(message._id);
    }
  }, [isOwnMessage, read, markAsRead, message._id]);

  return (
    <div className={`message-block ${isOwnMessage ? 'own-message-block' : ''}`}>
      <div className={`message-content ${isOwnMessage ? 'own-message' : ''}`}>
        {renderMessageContent()}
        <div className="message-time">{new Date(timestamp).toLocaleString()}</div>
        <FontAwesomeIcon icon={read ? faCheckDouble : faCheck} className={`read-indicator ${read ? 'double-check' : ''}`} />
      </div>
      {!read && <span className="unread-indicator">Unread</span>}
      {isOwnMessage && (
        <div className="message-actions">
          <button onClick={() => deleteMessage(message._id)}>Delete</button>
        </div>
      )}
    </div>
  );
  
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  senderId: PropTypes.string.isRequired,
};

export default Message;
