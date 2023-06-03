import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useChat from '../../Services/ChatService';
import UserList from '../../Components/Chat/UserList' 
import ChatArea from '../../Components/Chat/ChatArea';
import SearchBar from '../../Components/Chat/SearchBar';
import { fetchAllUsers } from '../../Services/userService'; 
import './chat.scss';
import axios from 'axios';

const ChatPage = ({ user }) => {
  const { userId: receiverId } = useParams();
  const navigate = useNavigate();
  const senderId = user._id;
  const roomId = useRef();

  const {
    messages,
    sendMessage,
    deleteMessage,
    markAsRead,
    getMessages,
    unreadMessages,
    updateUnreadMessages,
  } = useChat(senderId, roomId.current);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [receiverId]);

  useEffect(() => {
    // Initiate the chat room automatically when entering the chat page
    if (selectedUser) {
      initiateChatRoom(senderId, receiverId);
    }
  }, [senderId, receiverId, selectedUser]);

  useEffect(() => {
    // Refetch the messages after a message has been marked as read
    if (roomId.current) {
      getMessages(roomId.current);
    }
  }, [markAsRead, getMessages]);

  const initiateChatRoom = useCallback(
    async (senderId, receiverId) => {
      try {
        const response = await axios.post(`http://localhost:5000/chatRoom/initiate`, {
          senderId,
          receiverId,
        });
        roomId.current = response.data.roomId;
        getMessages(roomId.current);
      } catch (error) {
        console.error('Error initiating chat room:', error);
      }
    },
    [roomId]
  );
   
  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/chat/${user._id}`);
    updateUnreadMessages(0); // Reset the unread message count when clicking on a user
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const currentUserID = user._id;

  const filteredUsers = users.filter(
    (user) => user._id !== currentUserID && `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-page">
      <div className="sidebar">
        <SearchBar search={search} handleSearch={handleSearch} />
        <UserList users={filteredUsers} handleUserClick={handleUserClick} selectedUser={selectedUser} unreadCount={unreadMessages} />
      </div>
      <div className="chat-content">
        {selectedUser && (
          <ChatArea
            messages={messages}
            sendMessage={sendMessage}
            deleteMessage={deleteMessage}
            markAsRead={markAsRead}
            getMessages={getMessages}
            senderId={senderId}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
