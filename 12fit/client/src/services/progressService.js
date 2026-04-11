import api from "../utils/api";

export const getProgress = () => {
  return api.get("/progress");
};

export const addProgress = (data) => {
  return api.post("/progress", data);
};
