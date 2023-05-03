
import axios from "axios";
//Handles Creating New Tour
export const createTour = async (data) => {
  try {
    const response = await axios.post("/api/create-tour", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, message: "Tour created successfully!" };
  } catch (error) {
    console.error("Error creating tour:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};
//To Get ALl The Tours From The Database
export const fetchAllTours = async () => {
  try {
    const response = await axios.get('/api/tours');
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};
//Getting Orgainzer And Tour Detials At Same Time
export const fetchTourAndOrganizer = async (tourId) => {
  try {
    const response = await axios.get(`/api/tour/${tourId}`);
    const tour = response.data;
    const organizerResponse = await axios.get(`/api/user/id/${tour.organizerId}`);
    const organizer = organizerResponse.data;
    
    return { tour, organizer };
  } catch (error) {
    console.error("Error fetching tour and organizer details:", error);
    return { tour: null, organizer: null };
  }
};
export const getTourById = async (id)=>{
  try{
    const response = await axios.get(`/api/tour/${id}`);
    return response.data; 
  }catch(e){
    console.log("error while getting tour ",e);
    return(null);
  }
}