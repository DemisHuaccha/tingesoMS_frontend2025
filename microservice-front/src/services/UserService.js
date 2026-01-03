import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE_URL + "/auth/api/auth";

export const createUser = (user) => axios.post(`${apiBase}/register`, user);

export const updateUser = (user) => axios.put(`${apiBase}/update/${user.id}`, user);
