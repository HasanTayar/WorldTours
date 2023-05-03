import axios from "axios";

export const getPaymentMethods = async (userId, setSavedCards) => {
  try {
    const response = await axios.get(`/api/${userId}/hasPaymentRef`);
    if(response.status === 200){
      setSavedCards(response.data);
    }
  } catch (e) {
    console.error("Error While fetching Payment Methods:", e);
  }
};

export const addPaymentMethod = async (userId, cardNumber, expiryDate, cvv) => {
  try {
    const response = await axios.post(`/api/addPaymentMethod`, {
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

export const deletePaymentMethod = async (cardId, setSavedCards) => {
  try {
    const response = await axios.delete(`/api/delete/${cardId}`);
    console.log(cardId);
    if (response) {
      setSavedCards(savedCards.filter((card) => card._id !== cardId));
    }
  } catch (error) {
    console.error("Error deleting payment method", error);
  }
};
