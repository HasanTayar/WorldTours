import axios from "axios";
const API = "http://localhost:5000/payment"

export const getPaymentMethods = async (userId) => {
  try {
    const response = await axios.get(`${API}/${userId}/hasPaymentRef`);
    if (response.status === 200){
      return response.data;
    }
  } catch (e) {
    console.error("Error While fetching Payment Methods:", e);
    throw e;
  }
};



export const addPaymentMethod = async (userId, cardNumber, expiryDate, cvv) => {
  try {
    const response = await axios.post(`${API}/addPaymentMethod`, {
      userId,
      cardNumber,
      expiryDate,
      cvv,
    });
    if (response.status === 201) {
      console.log("Card Added Succsfuly");
    }
  } catch (e) {
    console.error("Error adding payment method", e);
  }
};

export const deletePaymentMethod = async (cardId) => {
  try {
    const response = await axios.delete(`${API}/delete/${cardId}`);
    console.log(cardId);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting payment method", error);
    throw error;
  }
};

