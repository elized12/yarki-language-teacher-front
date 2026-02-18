import { createContext, useEffect, useState } from "react";
import AuthService from "../service/AuthService";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const authPromise = refreshToken
                    ? AuthService.refresh(refreshToken)
                    : Promise.resolve(null);

                await Promise.all([
                    authPromise,
                    new Promise(resolve => setTimeout(resolve, 2000))
                ]).then(([response]) => {
                    if (response?.data?.access_token) {
                        localStorage.setItem("accessToken", response.data.access_token);
                        setIsAuth(true);
                    } else {
                        setIsAuth(false);
                    }
                }).finally(() => {
                    setIsLoading(false);
                });

            } catch {
                setIsAuth(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            setIsAuth(true);
        }
        catch (ex) {
            throw ex;
        }
    };

    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuth, user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
