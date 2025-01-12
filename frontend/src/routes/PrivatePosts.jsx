import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

function PrivatePosts({ children }) {
    const { isAuthenticated, isVerified } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && isVerified && window.location.pathname !== '/my-posts') {
        return <Navigate to="/my-posts" />;
    }

    return children;
}

export default PrivatePosts;