import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getKategori, createKategori, updateKategori, deleteKategori } from "../services/kategoriService";

export default function Kategori() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ nama_kategori: "", deskripsi: "" });
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await getKategori();
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateKategori(editId, form);
                setEditId(null);
            } else {
                await createKategori(form);
            }
            // Reset form sesuai nama field di state
            setForm({ nama_kategori: "", deskripsi: "" });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setForm({ nama_kategori: item.nama_kategori, deskripsi: item.deskripsi });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin hapus kategori ini?")) {
            await deleteKategori(id);
            fetchData();
        }
    };

    return (
        <MainLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Kategori</h1>

                {/* Form Create / Edit */}
                <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        name="nama_kategori"
                        placeholder="Nama Kategori"
                        className="input input-bordered w-1/3"
                        value={form.nama_kategori}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="deskripsi"
                        placeholder="Deskripsi"
                        className="input input-bordered w-1/3"
                        value={form.deskripsi}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary">{editId ? "Update" : "Create"}</button>
                    {editId && (
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => setForm({ nama_kategori: "", deskripsi: "" }) && setEditId(null)}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Kategori</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama_kategori}</td>
                                <td>{item.deskripsi}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
