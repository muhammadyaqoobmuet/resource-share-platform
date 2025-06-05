// src/utils/axiosInstance.js
import axios from "axios";
import useAuthStore from "@/store/authStore";

const axiosInstance = axios.create({
    baseURL: "https://campus-hub-api-08z4.onrender.com",
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
