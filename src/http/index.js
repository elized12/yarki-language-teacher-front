import axios from "axios";
import AuthService from "../service/AuthService";

export const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
    withCredentials: false,
    baseURL: API_URL
});

let onLogout = null;

export const setLogoutHandler = (callback) => {
    onLogout = callback;
};

api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken') ?? '';
    return config;
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await AuthService.refresh(localStorage.getItem('refreshToken'));
                const newToken = response.data.access_token;

                localStorage.setItem('accessToken', newToken);

                originalRequest.headers.Authorization = newToken;

                return api(originalRequest);
            } catch (refreshError) {
                if (onLogout) {
                    onLogout();
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;