import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_HOST}/api`,
});

// Τρέχει ΠΡΙΝ φύγει κάθε request: αν υπάρχει token, το βάζει στο header.
// getState() αντί για hook, γιατί εδώ δεν είμαστε μέσα σε component.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const store = useAuthStore.getState();
    if (error.response?.status === 401 || error.response?.status === 403) {
      store.logout();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
