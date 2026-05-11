import api from "../utils/api";

export const getProducts = (search = "") => {
  return api.get(`/products?search=${search}`);
};

export const createProduct = (data) => {
  return api.post("/products", data);
};

export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};