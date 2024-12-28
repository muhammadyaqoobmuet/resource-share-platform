import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    return token && new Date().getTime() < tokenExpiration;
};

function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }
    return children;
}

export default PrivateRoute;
