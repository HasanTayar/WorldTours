import axios from "axios";
const API = "http://localhost:5000/tours";
const USER_API = "http://localhost:5000/users";
//Handles Creating New Tour
export const createTour = async (data) => {
  try {
    const response = await axios.post(`${API}/create-tour`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, message: "Tour created successfully!" };
  } catch (error) {
    console.error("Error creating tour:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
//To Get ALl The Tours From The Database
export const fetchAllTours = async () => {
  try {
    const response = await axios.get(`${API}/tours`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};
//Getting Orgainzer And Tour Detials At Same Time
export const fetchTourAndOrganizer = async (tourId) => {
  try {
    const response = await axios.get(`${API}/${tourId}`);
    const tour = response.data;
    const organizerResponse = await axios.get(
      `${USER_API}/id/${tour.organizerId}`
    );
    const organizer = organizerResponse.data;

    return { tour, organizer };
  } catch (error) {
    console.error("Error fetching tour and organizer details:", error);
    return { tour: null, organizer: null };
  }
};
export const getTourById = async (id) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  } catch (e) {
    console.log("error while getting tour ", e);
    return null;
  }
};
export const updateTour = async (tourId, data) => {
  try {
    await axios.put(`${API}/update/${tourId}`, data , {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      }
    });
    return { success: true, message: "Tour updated successfully!" };
  } catch (error) {
    console.error("Error updating tour:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

// Deleting a tour
export const deleteTour = async (tourId) => {
  try {
    await axios.delete(`${API}/delete/${tourId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { success: true, message: "Tour deleted successfully!" };
  } catch (error) {
    console.error("Error deleting tour:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
export const getNearbyTours = async (lat, long) => {
  try {
    // Reverse Geocoding
    const geoResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${`${import.meta.env.VITE_GOOGLE_API}`}`);
    
    // Finding country from the response
    const geoData = geoResponse.data;
    const countryComponent = geoData.results[0].address_components.find(component => component.types.includes('country'));
    const userCountry = countryComponent.long_name;

    // Fetching nearby tours
    const tourResponse = await axios.get(`${API}/nearby?userLat=${lat}&userLong=${long}&userCountry=${userCountry}`);
    
    return tourResponse.data.tours;
  } catch (error) {
    console.error("Error fetching nearby tours:", error);
    throw error;
  }
};
