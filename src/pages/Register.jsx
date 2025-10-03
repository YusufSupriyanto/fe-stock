import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nama_depan: "",
        nama_belakang: "",
        email: "",
        tanggal_lahir: "",
        jenis_kelamin: "L", // default laki-laki
        role: "user",       // default user
        password: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Register gagal");
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Register</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type="text" name="nama_depan" placeholder="Nama Depan" className="input input-bordered w-full" onChange={handleChange} />
                        <input type="text" name="nama_belakang" placeholder="Nama Belakang" className="input input-bordered w-full" onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} />
                        <input type="date" name="tanggal_lahir" className="input input-bordered w-full" onChange={handleChange} />
                        <select name="jenis_kelamin" className="select select-bordered w-full" onChange={handleChange}>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} />
                        <button className="btn btn-primary w-full">Register</button>
                    </form>
                    <p className="text-sm">
                        Sudah punya akun? <Link to="/" className="link">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
