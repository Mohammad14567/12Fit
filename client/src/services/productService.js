import api from "../utils/api";
// Product API service.
// These functions are used by the Products page and the admin dashboard.


// Gets all products, with optional search query.
// If a search term is provided, it will filter products by name .
export const getProducts = (search = "") => {
  return api.get(`/products?search=${search}`);
};
// Creates a new product (admin only).
export const createProduct = (data) => {
  return api.post("/products", data);
};
// Updates an existing product by ID (admin only).
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};
// Deletes a product by ID (admin only).
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};