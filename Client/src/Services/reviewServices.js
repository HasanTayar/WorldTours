import axios from 'axios';

const API = 'http://localhost:5000/reviews';

export const sendReviewEmail = async (orderId) => {
  try {
    const response = await axios.post(`${API}/sendReviewEmail/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const submitReview = async (hashedToken, text, rating) => {
  try {
    const response = await axios.post(`${API}/submitReview`, { hashedToken, text, rating });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
