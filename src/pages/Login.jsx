import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem("token", res.data.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login gagal");
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} />
                        <button className="btn btn-primary w-full">Login</button>
                    </form>
                    <p className="text-sm">
                        Belum punya akun? <Link to="/register" className="link">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
