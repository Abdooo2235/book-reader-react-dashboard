import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "@/config/api.config";
import { useAuthStore } from "@/store/auth.store";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error(
        "Access denied: You do not have permission to access this resource."
      );
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;
