import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../store/AuthProvider";

export default function ProtectedAuthRoute({ children }) {
    const authContext = useContext(AuthContext);
    if (!authContext.isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}