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
  const { userId : receiverId} = useParams();
  const navigate = useNavigate();
  const senderId = user._id;
  const roomId = useRef();

  const { messages, sendMessage, deleteMessage, markAsRead, getMessages  } = useChat(senderId , roomId.current);
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

      initiateChatRoom(senderId , receiverId);
    }
  }, [senderId, receiverId, selectedUser]);

  const initiateChatRoom = useCallback(
    async (senderId, receiverId) => {
      try {
        const response = await axios.post(`http://localhost:5000/chatRoom/initiate`, {
          senderId,
          receiverId,
        });
        console.log(response.data);
        roomId.current = response.data.roomId;
        getMessages(roomId.current);

      } catch (error) {
        console.error('Error initiating chat room:', error);
      }
    },
    [roomId]
  );
  
  

  const handleUserClick = (
    (user) => {
      setSelectedUser(user);
      navigate(`/chat/${user._id}`);
    }
   
  );

  const handleSearch = ((e) => {
    setSearch(e.target.value);
  });

  const filteredUsers = 
   
      users.filter(

        (user) => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
      
  );

  

  return (
    <div className="chat-page">
      <div className="sidebar">
        <SearchBar search={search} handleSearch={handleSearch} />
        <UserList users={filteredUsers} handleUserClick={handleUserClick} selectedUser={selectedUser} />
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
