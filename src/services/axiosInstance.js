// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // Use VITE environment variable here
});


axiosInstance.interceptors.request.use(
  (config) => {
    // Set Content-Type jika belum terdefinisi
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    // Log semua detail request
    // console.log("Request Method:", config.method);
    // console.log("Request URL:", config.url);
    // console.log("Request Headers:", config.headers);
    // console.log("Request Data:", config.data);
    // Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Method:", config.method);
    console.log("Request URL:", config.url);
    console.log("Request Headers:", config.headers);
    console.log("Request Data:", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Server response error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
