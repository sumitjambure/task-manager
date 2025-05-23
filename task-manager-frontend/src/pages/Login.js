import { useState } from "react"; // useState for form
import axios from "axios"; // HTTP requests
import { useNavigate } from "react-router-dom"; // Navigation hook
import { useAuth } from "../context/AuthContext"; // Auth context
import { toast } from "react-toastify"; // Notifications
import "./Login.css"; // Styling

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value }); // Form input handler

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            login(res.data.token); // Save token
            navigate("/dashboard"); // Redirect
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-wrapper">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} />
                <button type="submit">Login</button>
                <p>Don't have an account?</p>
                <button onClick={() => navigate("/register")}>Register</button>
            </form>
        </div>
    );
}
