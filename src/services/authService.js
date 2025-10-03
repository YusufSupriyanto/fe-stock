import api from "../api/axios";

export const register = (data) => api.post("/register",data);

export const login = (data) => api.post("/login", data);

export const getProfile = (token) => {
  return api.get("/profile", {
        headers:{ Authorization: `Bearer ${token}`},
    });
}
export const update_profile = (data) => api.put(`/profile/update`, data);