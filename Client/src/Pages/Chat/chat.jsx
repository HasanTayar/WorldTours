import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useChat from "../../Services/ChatService";
import UserList from "../../Components/Chat/UserList";
import ChatArea from "../../Components/Chat/ChatArea";
import SearchBar from "../../Components/Chat/SearchBar";
import { fetchAllUsers } from "../../Services/userService";
import axios from "axios";
import './chat.scss';
const ChatPage = ({ user }) => {
  const { userId: receiverId } = useParams();
  const navigate = useNavigate();
  const senderId = user._id;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  
  const {
    messages,
    sendMessage,
    deleteMessage,
    markAsRead,
    getMessages,
    roomId,
    unreadMessages,
    setUnreadMessages,
  } = useChat(senderId, receiverId);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [receiverId]);

  useEffect(() => {
    if (selectedUser) {
      initiateChatRoom(senderId, receiverId);
    }
  }, [senderId, receiverId, selectedUser]);

  useEffect(() => {
    if (roomId.current) {
      getMessages();
    }
  }, [roomId, getMessages]);

  const initiateChatRoom = useCallback(
    async (senderId, receiverId) => {
      try {
        const response = await axios.post(`http://localhost:5000/chatRoom/initiate`, {
          senderId,
          receiverId,
        });
        roomId.current = response.data.roomId;
        getMessages();
      } catch (error) {
        console.error("Error initiating chat room:", error);
      }
    },
    [getMessages, roomId]
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/chat/${user._id}`);
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
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
          currentUserID={senderId}
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
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
