import axios from "axios";
const API = "http://localhost:5000/order"
export const addOrder = async (data) => {
  try {
    const response = await axios.post(`${API}/new-order`, data);
    if (response.status === 201) {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchAllOrders = async () => {
  try {
    const response = await axios.get(`${API}/orders`); 
   
    return response.data.orders;
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
export const approveOrder = async (orderId) => {
  try {
    const response = await axios.patch(`${API}/${orderId}/approve`, {});

    if (response.status === 200) {
      console.log(response.data);
      return response.data.order;
    }
    
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.patch(`${API}/${orderId}/cancel-organizer`, {});

    if (response.status === 200) {
      return response.data.order;
    }
    
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API}/${orderId}`);

    if (response.status === 200) {
      return response.data;
    }
    
  } catch (e) {
    console.log(e);
    return false;
  }
};
