// Import React methods for context and state management
import { createContext, useContext, useState } from "react";

// Create the authentication context
const AuthContext = createContext();

// Context provider component for the entire app
export const AuthProvider = ({ children }) => {
    // State to hold the token, initialized from localStorage
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Login function to save token in localStorage and update state
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // Logout function clears token from localStorage and state
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    // Provide token, login and logout to all children components
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing auth context in components
export const useAuth = () => useContext(AuthContext);
