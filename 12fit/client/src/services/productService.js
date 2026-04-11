import api from "../utils/api";

export const getProducts = () => {
  return api.get("/products");
};

export const createProduct = (data, token) => {
  return api.post("/products", data, {
   
  });
};
