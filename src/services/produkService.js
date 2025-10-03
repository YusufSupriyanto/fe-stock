import api from "../api/axios";

export const getProduk = () => api.get("/produk");
export const createProduk = (data) => api.post("/produk", data, {
    headers: { "Content-Type": "multipart/form-data" }
});
export const updateProduk = (id, data) => api.post(`/produk/${id}?_method=PUT`, data, {
    headers: { "Content-Type": "multipart/form-data" }
});
export const deleteProduk = (id) => api.delete(`/produk/${id}`);
