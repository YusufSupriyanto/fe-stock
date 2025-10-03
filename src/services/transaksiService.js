import api from "../api/axios";

export const getTransaksi = () => api.get("/transaksi");
export const createTransaksi = (data) => api.post("/transaksi", data);
