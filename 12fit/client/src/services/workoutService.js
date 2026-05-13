import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000" 
});
/**

 * @param {Object} data - تحتوي على (age, weight, height, goal, activity)
 */
export const generateWorkout = async (data) => {
  try {
    const response = await api.post("/api/workouts/generate", data);
    return response.data; 
  } catch (error) {
    console.error("Workout Service Error:", error.response?.data || error.message);
    throw error;
  }
};