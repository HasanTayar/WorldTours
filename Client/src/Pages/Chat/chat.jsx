import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useChat from '../../Services/ChatService';
import UserList from '../../Components/Chat/UserList';
import ChatArea from '../../Components/Chat/ChatArea';
import SearchBar from '../../Components/Chat/SearchBar';
import { fetchAllUsers } from '../../Services/userService';
import { initiateChat } from '../../Services/chatRoomsServices';
import './chat.scss';
import { getMessages } from '../../Services/chatRoomsServices';
const ChatPage = ({ user }) => {
  const { userId: receiverId } = useParams();
  const navigate = useNavigate();
  const senderId = user._id;
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});

  const {
    messages,
    sendMessage,
    deleteMessage,
    markAsRead,

  } = useChat(senderId, receiverId);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      if (selectedUser) {
        try {
          const roomId = await initiateChat(senderId, selectedUser._id);
          await getMessages(roomId);
          setUnreadMessages((prevState) => ({
            ...prevState,
            [selectedUser._id]: 0,
          }));
        } catch (error) {
          console.error('Error initiating chat:', error);
        }
      }
    };

    initializeChat();
  }, [selectedUser, senderId, getMessages]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/chat/${user._id}`);
    setUnreadMessages((prevState) => ({
      ...prevState,
      [user._id]: 0,
    }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user._id !== senderId &&
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-page">
      <div className="sidebar">
        <SearchBar search={search} handleSearch={handleSearch} />
        <UserList
          users={filteredUsers}
          handleUserClick={handleUserClick}
          selectedUser={selectedUser}
          unreadMessages={unreadMessages}
        />
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
            receiverId={selectedUser._id}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
