import { useState, useEffect } from "react";
import { getProfile, update_profile } from "../services/authService";
import MainLayout from "../layouts/MainLayout.jsx";

export default function Profile() {
    const [form, setForm] = useState({
        nama_depan: "",
        nama_belakang: "",
        email: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        password: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                const user = res.data.data;

                setForm({
                    nama_depan: user.nama_depan || "",
                    nama_belakang: user.nama_belakang || "",
                    email: user.email || "",
                    tanggal_lahir: user.tanggal_lahir || "",
                    jenis_kelamin: user.jenis_kelamin || "L",
                    password: ""
                });
                setLoading(false);
            } catch (err) {
                setError("Gagal memuat data profil");
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update_profile(form);
            setSuccess("Profil berhasil diperbarui");
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Update profil gagal");
            setSuccess(null);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <p>Memuat profil...</p>
            </div>
        );
    }

    return (
        <MainLayout>
        <div className="flex  justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Update Profil</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            name="nama_depan"
                            value={form.nama_depan}
                            placeholder="Nama Depan"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="nama_belakang"
                            value={form.nama_belakang}
                            placeholder="Nama Belakang"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            placeholder="Email"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            name="tanggal_lahir"
                            value={form.tanggal_lahir || ""}
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        <select
                            name="jenis_kelamin"
                            value={form.jenis_kelamin}
                            className="select select-bordered w-full"
                            onChange={handleChange}
                        >
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            placeholder="Password (kosongkan jika tidak diubah)"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        <button className="btn btn-primary w-full">Update</button>
                    </form>
                </div>
            </div>
        </div>
        </MainLayout>
    );
}
