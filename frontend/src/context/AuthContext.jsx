import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenExpiration = localStorage.getItem("tokenExpiration");
        const isTokenValid = token && new Date().getTime() < tokenExpiration;

        if (isTokenValid) {
            setUser({ token });
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, name, setName }}>
            {children}
        </AuthContext.Provider>
    );
};
