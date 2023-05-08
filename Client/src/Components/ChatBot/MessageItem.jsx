
import ChatBotLogo from '../../assets/ChatBotLogo.png';

const MessageItem = ({ message }) => {
  return (
    <div className={`message-item ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
      {message.sender === 'bot' && (
        <img src={ChatBotLogo} alt="Chatbot" className="message-logo" />
      )}
      <p>{message.content}</p>
    </div>
  );
};

export default MessageItem;