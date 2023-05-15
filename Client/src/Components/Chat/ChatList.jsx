import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { fetchUserByToken } from "../../Services/userService";
import { fetchChats } from "../../Services/chatService";

import { fetchAllUsers } from "../../Services/userService";

const ChatList = ({ onChatSelect, user }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        if (user.isAdmin) {
          const users = await fetchAllUsers(); // Fetch all users if the current user is an admin
          setChats(users);
        } else {
          const chats = await fetchChats(); // Fetch chats using the chatService
          setChats(chats);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    getChats();
  }, [chats, user]);

  return (
    <ListGroup>
      {chats &&
        chats.map((chat) => (
          <ListGroup.Item
            key={chat._id}
            action
            onClick={() => onChatSelect(chat._id, chat._id)}
          
          >
            <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
            {chat.firstName + " " + chat.lastName}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default ChatList;
