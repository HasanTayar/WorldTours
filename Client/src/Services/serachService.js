import axios from 'axios';
import { getToken } from './token';

const API_URL = 'http://localhost:5000/search'; // Replace with your server URL

export const createSearch = async (searchData) => {
  console.log(searchData);
  try {
    const response = await axios.post(`${API_URL}/search`, searchData, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    });
    const { data, topPicks } = response.data;
    console.log(response.data);
    return { data, topPicks };
  } catch (error) {
    throw error;
  }
}

export const getUserSearches = async () => {
  try {
    const response = await axios.get(`${API_URL}/serach`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    });
    const { searches, topPicks } = response.data.data; // response.data.data because of the { success: true, data: { searches, topPicks: user.topPicks } } format in the backend.
    return { searches, topPicks };
  } catch (error) {
    throw error;
  }
}
