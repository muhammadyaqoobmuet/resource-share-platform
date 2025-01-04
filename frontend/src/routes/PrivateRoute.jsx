import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

function PrivateRoute({ children }) {
    const { isAuthenticated, isVerified } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && !isVerified) {
        return <Navigate to="/verify" />;
    }

    return children;
}

export default PrivateRoute;
