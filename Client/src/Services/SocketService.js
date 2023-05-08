import io from 'socket.io-client';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your server's address
const socket = io(API_URL);

const joinRoom = (roomId) => {
  socket.emit('joinRoom', roomId);
};

const leaveRoom = (roomId) => {
  socket.emit('leaveRoom', roomId);
};

const sendMessage = async (roomId, message, username) => {
  try {
    const response = await axios.post(`${API_URL}/messages/${roomId}`, { username, message });
    const createdMessage = response.data;
    if (createdMessage) {
      socket.emit('chatMessage', { roomId, message: createdMessage });
    }
  } catch (error) {
    console.error(error);
  }
};

const onMessageReceived = (callback) => {
  socket.on('chatMessage', (message) => {
    callback(message);
  });
};

const removeMessageListener = () => {
  socket.off('chatMessage');
};

const getAllMessages = async (chatRoomId, userId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${chatRoomId}`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createChatRoom = async (senderId, receiverId, issue) => {
  try {
    const response = await axios.post(`${API_URL}/chatRooms`, { senderId, receiverId, issue });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getChatRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/chatRooms`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export default {
  joinRoom,
  leaveRoom,
  sendMessage,
  onMessageReceived,
  removeMessageListener,
  getAllMessages,
  createChatRoom,
  getChatRooms,
};
