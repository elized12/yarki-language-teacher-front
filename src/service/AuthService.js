import api from "../http";

export default class AuthService {
    static async login(email, password) {
        return api.post("/sign-in", { "email": email, "password": password });
    }

    static async register(email, nickname, password) {
        return api.post("/sign-up", { "email": email, "nickname": nickname, "password": password });
    }

    static logout() {
        localStorage.removeItem('acessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    static async refresh(refreshToken) {
        return api.post("/refresh", { 'refresh_token': refreshToken })
    }
};