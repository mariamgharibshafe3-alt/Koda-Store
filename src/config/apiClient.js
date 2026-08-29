import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});



export default apiClient;