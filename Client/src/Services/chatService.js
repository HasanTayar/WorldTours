import axios from 'axios';
import io from 'socket.io-client';

let socket;
const SERVER_URL = 'http://localhost:5000/chat';

// Connect to the Socket.IO server
export const connectSocket = () => {
  socket = io(SERVER_URL);
};

// Disconnect from the Socket.IO server
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

// Subscribe to new chat messages
export const subscribeToChat = (chatId, callback) => {
  if (!socket) return;

  socket.on('chatMessage', (message) => {
    if (message.chatId === chatId) {
      callback(message);
    }
  });
};

// Send a chat message
export const sendMessage = (chatId, message) => {
  if (socket) {
    socket.emit('chatMessage', { chatId, message });
  }
};

// Fetch all chats from the server
export const fetchChats = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/chats`);
    return response.data.chats;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};

// Fetch a specific chat from the server
export const fetchChat = async (chatId) => {
  try {
    const response = await axios.get(`${SERVER_URL}/chats/${chatId}`);
    return response.data.chat;
  } catch (error) {
    console.error(`Error fetching chat ${chatId}:`, error);
    return null;
  }
};
