import api from "../utils/api";

export const generateDiet = (data, token) => {
  return api.post("/diet", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};