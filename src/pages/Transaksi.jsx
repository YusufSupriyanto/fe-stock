import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getTransaksi, createTransaksi } from "../services/transaksiService";
import { getProduk } from "../services/produkService";

export default function Transaksi() {
    const [data, setData] = useState([]);
    const [produk, setProduk] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        jenis: "in",
        items: [{ produk_id: "", jumlah: 0 }]
    });

    const fetchData = async () => {
        try {
            const res = await getTransaksi();
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProduk = async () => {
        try {
            const res = await getProduk();
            setProduk(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchProduk();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index, e) => {
        const newItems = [...form.items];
        newItems[index][e.target.name] = e.target.value;
        setForm({ ...form, items: newItems });
    };

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { produk_id: "", jumlah: 0 }] });
    };

    const removeItem = (index) => {
        const newItems = [...form.items];
        newItems.splice(index, 1);
        setForm({ ...form, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTransaksi(form);
            setShowModal(false);
            setForm({ jenis: "in", items: [{ produk_id: "", jumlah: 0 }] });
            setErrorMessage("");
            fetchData();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Terjadi kesalahan, coba lagi.");
            }
        }
    };

    return (
        <MainLayout>
            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Transaksi</h1>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Tambah Transaksi</button>
                </div>

                {/* Table Transaksi */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Jenis</th>
                            <th>User</th>
                            <th>Produk</th>
                            <th>Qty change</th>
                            <th>After Stock</th>
                            <th>Waktu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((trx, index) => (
                            <tr key={trx.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {trx.jenis === "in" ? (
                                        <span className="badge badge-success">Stock In</span>
                                    ) : (
                                        <span className="badge badge-error">Stock Out</span>
                                    )}
                                </td>
                                <td>{trx.user?.nama_depan || "-"}</td>
                                <td>
                                    {trx.items.map((i, idx) => (
                                        <div key={idx}>{i.produk?.nama_produk} ({i.jumlah})</div>
                                    ))}
                                </td>
                                <td>
                                    {trx.items.reduce((sum, i) => sum + i.qty_change, 0)}
                                </td>
                                <td>
                                    {trx.items.reduce((sum, i) => sum + Number(i.stock_after), 0)}
                                </td>
                                <td>{new Date(trx.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center">Tidak ada data</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Create Transaksi */}
            {showModal && (
                <dialog open className="modal">
                    <div className="modal-box max-w-2xl">
                        <h2 className="font-bold text-lg mb-4">Tambah Transaksi</h2>

                        {/* Tampilkan error */}
                        {errorMessage && (
                            <div className="alert alert-error mb-3">
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <select
                                name="jenis"
                                className="select select-bordered w-full"
                                value={form.jenis}
                                onChange={handleChange}
                            >
                                <option value="in">Stock In</option>
                                <option value="out">Stock Out</option>
                            </select>

                            {form.items.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <select
                                        name="produk_id"
                                        className="select select-bordered flex-1"
                                        value={item.produk_id}
                                        onChange={(e) => handleItemChange(index, e)}
                                        required
                                    >
                                        <option value="">Pilih Produk</option>
                                        {produk.map((p) => (
                                            <option key={p.id} value={p.id}>{p.nama_produk}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        name="jumlah"
                                        placeholder="Jumlah"
                                        className="input input-bordered w-32"
                                        value={item.jumlah}
                                        onChange={(e) => handleItemChange(index, e)}
                                        required
                                    />
                                    {form.items.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-error btn-sm"
                                            onClick={() => removeItem(index)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button type="button" className="btn btn-outline" onClick={addItem}>+ Tambah Produk</button>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Simpan</button>
                                <button type="button" className="btn" onClick={() => setShowModal(false)}>Batal</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </MainLayout>
    );
}
