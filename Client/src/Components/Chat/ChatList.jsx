
import { useState , useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';


const ChatList = ({ chats }) => {
  
  return (
    <ListGroup className="chat-list">
      {chats.map((chat) => (
        <ListGroup.Item key={chat._id}>
          {chat.sender}: {chat.content}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatList;
