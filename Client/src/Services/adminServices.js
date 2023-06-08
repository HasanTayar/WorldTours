import axios from "axios";
const API_URL = "http://localhost:5000/admin";

// Function to send a GET request to retrieve all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
};

// Function to send a GET request to retrieve all tours
export const getAllTours = async () => {
  try {
    const response = await axios.get(`${API_URL}/tours`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving tours:", error);
    throw error;
  }
};

// Function to send a GET request to retrieve all chat rooms
export const getAllChatRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/chatrooms`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat rooms:", error);
    throw error;
  }
};

// Function to send a GET request to retrieve all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw error;
  }
};
