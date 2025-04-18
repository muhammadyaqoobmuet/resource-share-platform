// src/utils/axiosInstance.js
import axios from "axios";
import useAuthStore from "@/store/authStore";

const axiosInstance = axios.create({
    baseURL: "https://backend-production-8b19f.up.railway.app/",
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
