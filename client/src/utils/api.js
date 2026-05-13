import axios from "axios";



const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:8080/api",

  timeout: 35000,
});


api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;