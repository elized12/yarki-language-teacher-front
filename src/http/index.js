import axios from "axios";

export const API_URL = `http://localhost:8000`;

const api = axios.create({
    withCredentials: false,
    baseURL: API_URL
})


axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken') ?? '';
    return config;
});

export default api;