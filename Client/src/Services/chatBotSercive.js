import axios from "axios";

const API = "http://localhost:5000/chatBot";

export const chatWithBot = async (message) => {
  try {
    const response = await axios.post(`${API}/bot`, { content: message });
    return response.data;
  } catch (error) {
    console.error('Error chatting with bot:', error);
    throw error;
  }
};

