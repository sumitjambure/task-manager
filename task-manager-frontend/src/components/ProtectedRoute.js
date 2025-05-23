// Importing Navigate to redirect users
import { Navigate } from "react-router-dom";
// Importing custom hook to access authentication context
import { useAuth } from "../context/AuthContext";

// This component wraps around any route that needs to be protected (requires login)
export default function ProtectedRoute({ children }) {
    // Destructuring token from auth context to check login status
    const { token } = useAuth();

    // If token exists, render the children (protected component), otherwise redirect to login page
    return token ? children : <Navigate to="/" />;
}
