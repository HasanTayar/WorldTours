import axios from 'axios';

const API_URL = 'http://localhost:5000/chatRoom';

export async function initiateChat(senderId, receiverId) {
  const response = await axios.post(`${API_URL}/initiate`, { senderId, receiverId });
  return response.data.roomId;
}

export async function sendMessage(roomId, senderId, content) {
  const response = await axios.post(`${API_URL}/message`, { roomId, senderId, content });
  return response.data;
}

export async function markMessageAsRead(messageId) {
  const response = await axios.put(`${API_URL}/message/${messageId}/read`);
  return response.data;
}

export async function deleteMessage(messageId) {
  const response = await axios.delete(`${API_URL}/message/${messageId}`);
  return response.data;
}

export async function getChatRooms() {
  const response = await axios.get(`${API_URL}/chatrooms`);
  return response.data;
}

export async function getMessages(roomId) {
  const response = await axios.get(`${API_URL}/messages/${roomId}`);
  return response.data;
}
