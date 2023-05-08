import axios from 'axios';



export const createMessage = async (sender, receiver, content) => {
  try {
    const response = await axios.post(`/api/chat`, { sender, receiver, content });
    return response.data;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
};

export const getChatHistory = async (sender, receiver) => {
  try {
    const response = await axios.get(`/api/chat/history`, { params: { sender, receiver } });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

export const markAsRead = async (messageId) => {
  try {
    const response = await axios.put(`/api/chat/read/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return null;
  }
};

export const deleteMessage = async (messageId) => {
  try {
    await axios.delete(`/api/chat/${messageId}`);
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};
