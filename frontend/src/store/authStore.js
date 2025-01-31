import { create } from "zustand";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

// Initialize state from localStorage
const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
const isVerified = Boolean(localStorage.getItem("isVerified"));
const userData = localStorage.getItem("user");
const user = null;

const useAuthStore = create((set) => ({
    token: localStorage.getItem("authToken") || null,
    user: user || null,
    email: "",
    postCreatedBy: '',
    expiresIn: localStorage.getItem("authExpiresIn") || null,
    isAuthenticated: isAuthenticated,
    isVerified: isVerified,
    isLoading: false,
    error: null,
    isModalOpen: false,


    openModal: () => {
        set({ isModalOpen: true })
    },
    closeModal: () => {
        set({ isModalOpen: false })
    },

    setEmail: (email) => {
        set({ email })
    },


    // reaaming other methods
    // Save token and user data to localStorage
    saveToken: (token, expiresIn, user) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authExpiresIn", expiresIn);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");  // Set isAuthenticated to true
        localStorage.setItem("isVerified", "true");       // Set isVerified to true
        set({ token, expiresIn, user, isAuthenticated: true, isVerified: true });
    },

    // Clear token and user data from localStorage
    clearToken: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authExpiresIn");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("isVerified");
        set({ token: null, expiresIn: null, user: null, isAuthenticated: false, isVerified: false });
    },

    // Signup action
    signup: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", data);
            set({ isLoading: false });
            return response.data.message;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw new Error(error.response?.data?.message || "Signup failed");
        }
    },

    // Login action
    login: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("http://localhost:8080/auth/login", data);
            const { token, expiresIn, user } = response.data;
            set({ isLoading: false, isAuthenticated: true, isVerified: true });

            // Save token and user to localStorage
            useAuthStore.getState().saveToken(token, expiresIn, user);

            return "Login successful";
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw new Error(error?.response?.data?.message || "user not Verified");
        }
    },

    // Verification action
    verify: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("http://localhost:8080/auth/verify", data);
            set({ isLoading: false, isVerified: true });

            // Update localStorage when verified
            localStorage.setItem("isVerified", "true");

            return response.data.message;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw new Error(error.response?.data?.message || "Verification failed");
        }
    },

    // Set user data
    setUser: (user) => set({ user }),

    getUser: async () => {
        try {
            const response = await axiosInstance.get('/user/me');
            set({ user: response.data }); // Store the user data globally
        } catch (error) {
            console.log(error);
        }
    },

    // Logout action
    logout: () => {
        useAuthStore.getState().clearToken();
        set({ isAuthenticated: false, isVerified: false, user: null });
    },

    isUploading: false,
    uploadMessage: "",

    upload: async (formData) => {
        try {
            set({ isUploading: true, uploadMessage: "" });

            const response = await axiosInstance.post("/resource/create", formData);
            set({
                uploadMessage: "File uploaded successfully!",
                isUploading: false,
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Upload failed!";
            set({
                uploadMessage: errorMessage,
                isUploading: false,
            });
        }
    },


    isUpdating: false,
    updatingMessage: "",

    // Assuming the updateData function inside authStore is like this:
    updateData: async (formData) => {
        try {
            set({ isUpdating: true, updatingMessage: "" });

            // Make PUT request with formData
            const response = await axiosInstance.put(`/resource/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure the correct header
                }
            });
            set({
                updatingMessage: "Resource updated successfully!",
                isUpdating: false,
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Update failed!";
            set({
                updatingMessage: errorMessage,
                isUpdating: false,
            });
        }
    },

    fetchResources: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/resource/");
            set({ resources: response.data.content, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw new Error(error.response?.data?.message || "Failed to fetch resources");
        }
    },


    deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Make the request to delete the resource from the server
            const response = await axiosInstance.delete(`/resource/delete/${id}`);

            // Return the updated list of resources after deletion (assuming the response contains the updated resources list)
            set({ resources: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || error.message });
            throw new Error(error.response?.data?.message || "Failed to delete resource");
        }
    }



}));

export default useAuthStore;
