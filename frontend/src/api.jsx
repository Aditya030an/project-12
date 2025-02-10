import axios from "axios";

// const API_URL = "http://localhost:5000/api/events";
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/events`;

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    // console.log("response in Api" , response);
    return response.data;
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
};
