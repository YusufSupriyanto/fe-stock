import api from "../api/axios";

export const getKategori = () => api.get("/kategori");
export const createKategori = (data) => api.post("/kategori", data);
export const updateKategori = (id, data) => api.put(`/kategori/${id}`, data);
export const deleteKategori = (id) => api.delete(`/kategori/${id}`);
