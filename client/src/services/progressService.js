import api from "../utils/api";

export const getProgress = (token) => {
  return api.get("/progress", {
   
  });
};

export const addProgress = (data, token) => {
  return api.post("/progress", data, {
  
  });
};
