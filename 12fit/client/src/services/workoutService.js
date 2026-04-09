import api from "../utils/api";

export const generateWorkout = (data, token) => {
  return api.post("/workouts", data, {
    
  });
};
