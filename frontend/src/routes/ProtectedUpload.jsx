import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

function PrivateUpload({ children }) {
    const { isAuthenticated, isVerified } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && isVerified && window.location.pathname !== '/upload') {
        return <Navigate to="/upload" />;
    }

    return children;
}

export default PrivateUpload;
