import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://fit12-pro-production.up.railway.app",
});

export default api;