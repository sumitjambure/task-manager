import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            return toast.error("All fields are required");
        }

        try {
            await axios.post("http://localhost:5000/api/auth/register", form);
            toast.success("Registered successfully! Please login.");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-wrapper">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} />
                <button type="submit">Register</button>
                <p>Having an account?</p>
                <button onClick={() => navigate("/")}>Login</button>
            </form>
        </div>
    );
}
