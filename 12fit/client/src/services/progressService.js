import api from "../utils/api";

export const getProgress = (token) => {
  return api.get("/progress", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProgress = (data, token) => {
  return api.post("/progress", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};