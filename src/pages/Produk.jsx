import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProduk, createProduk, updateProduk, deleteProduk } from "../services/produkService";
import { getKategori } from "../services/kategoriService";

export default function Produk() {
    const [data, setData] = useState([]);
    const [kategori, setKategori] = useState([]);
    const [form, setForm] = useState({ nama_produk: "", deskripsi: "", kategori_id: "", gambar: null });
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const res = await getProduk();
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchKategori = async () => {
        try {
            const res = await getKategori();
            setKategori(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchKategori();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "gambar") {
            setForm({ ...form, gambar: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("nama_produk", form.nama_produk);
            formData.append("deskripsi", form.deskripsi);
            formData.append("kategori_id", form.kategori_id);
            if (form.gambar) formData.append("gambar", form.gambar);

            if (editId) {
                await updateProduk(editId, formData);
            } else {
                await createProduk(formData);
            }

            setShowModal(false);
            setForm({ nama_produk: "", deskripsi: "", kategori_id: "", gambar: null });
            setEditId(null);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setForm({
            nama_produk: item.nama_produk,
            deskripsi: item.deskripsi || "",
            kategori_id: item.kategori_id,
            gambar: null
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin hapus produk ini?")) {
            await deleteProduk(id);
            fetchData();
        }
    };

    return (
        <MainLayout>
            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Produk</h1>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Tambah Produk</button>
                </div>

                {/* Table Produk */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                            <th>Gambar</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama_produk}</td>
                                <td>{item.kategori?.nama_kategori || "-"}</td>
                                <td>{item.stok}</td>
                                <td>
                                    {item.gambar && (
                                        <img src={item.gambar || `/storage/${item.gambar}`} alt="" className="w-16 h-16 object-cover rounded" />
                                    )}
                                </td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center">Tidak ada data</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Create/Update */}
            {showModal && (
                <dialog open className="modal">
                    <div className="modal-box max-w-xl">
                        <h2 className="font-bold text-lg mb-4">{editId ? "Edit Produk" : "Tambah Produk"}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="nama_produk"
                                placeholder="Nama Produk"
                                className="input input-bordered w-full"
                                value={form.nama_produk}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="deskripsi"
                                placeholder="Deskripsi"
                                className="textarea textarea-bordered w-full"
                                value={form.deskripsi}
                                onChange={handleChange}
                            />
                            <select
                                name="kategori_id"
                                className="select select-bordered w-full"
                                value={form.kategori_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {kategori.map((k) => (
                                    <option key={k.id} value={k.id}>{k.nama_kategori}</option>
                                ))}
                            </select>
                            <input
                                type="file"
                                name="gambar"
                                className="file-input file-input-bordered w-full"
                                onChange={handleChange}
                                accept="image/*"
                            />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">{editId ? "Update" : "Create"}</button>
                                <button type="button" className="btn" onClick={() => { setShowModal(false); setEditId(null); }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </MainLayout>
    );
}
