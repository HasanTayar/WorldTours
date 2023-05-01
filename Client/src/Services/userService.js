import axios from "axios";
import { setToken, getToken, destroyToken } from "./Tokens/token";
// Validates user login and sets a token if successful
export const checkUserDetails = async (email, password, setError) => {
  setError("");
  try {
    const response = await axios.post("/api/login", { email, password });
    setToken(response.data);
    return response.data; // Return the token on success
  } catch (error) {
    console.error("error", error);
    setError(error);
    return false;
  }
};

// Retrieves user details by token and updates user state
export const getUserByToken = async (setUser, setIsLoggedIn, setError) => {
  const token = getToken();
  try {
    const response = await axios.get("/api/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(response.data));
    return true;
  } catch (error) {
    setError(error.response?.data?.message || error.message);
  }
};

// Gets user details by email and sets local user data
export const getUserByEmail = async (
  email,
  setError,
  setLocalUser,
  setShowPasswordInput
) => {
  setError("");
  try {
    const response = await axios.get(`/api/user/${email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      setLocalUser(response.data);
      setShowPasswordInput(true);
    } else {
      localStorage.setItem;
      setError("No user found. Please sign up first.");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    setError("An error occurred while fetching user data.");
  }
};
// Handles password reset request and sets an error message
export const forgotPassword = async (email, setError) => {
  try {
    const response = await axios.post("/api/forget-password", { email });
    setError(response.data.message);
  } catch (error) {
    console.error("Error resetting password :", error);
    setError("An error occurred while resetting your password.");
  }
};
export const logout = (setIsLoggedIn, setUser) => {
  setIsLoggedIn(false);
  setUser(null);
  destroyToken();
  localStorage.removeItem("user");
};

// Handles new user insert
export const registerUser = async (formData) => {
  try {
    const response = await axios.post("/api/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function updateUserProfile(updatedData) {
  console.table(updatedData);
  try {
    const response = await axios.put("/api/update-profile", updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      console.log("Profile updated successfully");
      // Update the UI or redirect the user as needed
    } else {
      console.log("Error updating profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}
//Handle Verifing Email for The User
export const verifyEmail = async (token) => {
    try {
      const response = await axios.post("/api/verify-email", { token });
      if (!response.ok) {
        throw new Error(response.data.message);
      }
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: "An error occurred while verifying your email" };
    }
  };
  // Handles Upadting Forgeten Password
  export const updatePassword = async (token, newPassword) => {
    try {
      const response = await axios.post('/api/reset-password', {
        token,
        newPassword,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response.data.message || 'An error occurred while updating your password. Please try again.' };
    }
  };