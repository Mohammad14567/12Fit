import api from "../utils/api";

export const generateWorkout = async (data, token) => {
  try {
    const response = await api.post("/workouts/generate", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Workout Error:", error);
    throw error;
  }
};