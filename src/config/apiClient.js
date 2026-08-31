import axios from "axios";
import getAuthToken from "../server/hooksApi";
const apiClient = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default apiClient;
