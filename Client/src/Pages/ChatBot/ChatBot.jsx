import { useState, useEffect } from 'react';
import MessageList from '../../Components/ChatBot/MessageList';
import MessageInput from '../../Components/ChatBot/MessageInput';
import './ChatBot.scss';
import { chatWithBot } from '../../Services/chatBotSercive';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([{ sender: 'bot', content: 'Hello! I\'m WorldTours bot. How can I help you?' }]);
  }, []);

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: message }]);
    setIsTyping(true);

    try {
      const botResponse = await chatWithBot(message);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', content: botResponse.message }]);
      }, 3000); // 3-second delay
    } catch (error) {
      console.error('Error chatting with bot:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <h3 className="text-center" style={{background:"#007bff" , color:"white"}}>Support Chat</h3>
      <MessageList messages={messages} isTyping={isTyping} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBot;
