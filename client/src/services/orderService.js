import api from "../utils/api";
// Order API service.
// Users can create orders from checkout.
// Admins can view, update, and delete orders.

// Creates a new order from the checkout
export const createOrder = (data) => {
  return api.post("/orders", data);
};
// Gets all orders.
export const getOrders = () => {
  return api.get("/orders");
};
// Gets a specific order by ID.
export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};
// Updates the status of an order (e.g., from "Pending" to "Shipped").
export const updateOrderStatus = (id, status) => {
  return api.put(`/orders/${id}/status`, { status });
};
// Deletes an order by ID.
export const deleteOrder = (id) => {
  return api.delete(`/orders/${id}`);
};