import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { fetchUserByToken } from '../../Services/userService';
import { fetchChats } from '../../Services/chatService';  // Import fetchChats from chatService

const ChatList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const user = await fetchUserByToken(); // Fetch the user data
        console.log(user); // Log the user data
  
        const chats = await fetchChats(); // Fetch chats using the chatService
        setChats(chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  
    getChats();
  }, []);
  

  return (
    <ListGroup>
      {chats.map((chat) => (
        <ListGroup.Item 
          key={chat._id} 
          action
          onClick={() => onChatSelect(chat._id)}
        >
          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
          {chat.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatList;
