import { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";
import MainLoader from "../loader/main-loader";
import { Navigate } from "react-router";

export default function RequireAuthRoute({ children }) {
    const auth = useContext(AuthContext);

    if (auth.isLoading) {
        return <MainLoader />
    }

    if (!auth.isAuth) {
        return <Navigate to="/login" />
    }

    return children;
}