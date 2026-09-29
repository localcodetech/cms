// src/api/http.js
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "https://cms-t9bk.onrender.com/api",
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// expired/revoked token: let AuthContext log the user out instead of leaving them stuck
http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      window.dispatchEvent(new Event("auth:expired"));
    }
    return Promise.reject(error);
  }
);

export default http;