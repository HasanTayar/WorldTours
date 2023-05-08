import axios from "axios";

export const addOrder = async (data) => {
  try {
    const response = await axios.post("/api/order/new-order", data);
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
    const response = await axios.get("/api/order/orders"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
export const approveOrder = async (orderId) => {
  try {
    const response = await axios.patch(`/api/order/${orderId}/approve`, {});

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
    const response = await axios.patch(`/api/order/${orderId}/cancel-organizer`, {});

    if (response.status === 200) {
      return response.data.order;
    }
    
  } catch (e) {
    console.log(e);
    return false;
  }
};

