import axios from "axios";

export const registerUser = async (formData) => {
    try {
        const response = await axios.post('/api/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};