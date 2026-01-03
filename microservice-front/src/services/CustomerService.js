import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE_URL + "/client/api/client";

export const listCustomer = () => axios.get(apiBase + "/all");

export const createCustomer = (customer) => axios.post(apiBase + "/register", customer);

export const updateStatusCustomer = (idCustomer) => axios.put(`${apiBase}/updateStatus/${idCustomer}`);

export const searchCustomerRuts = (partialRut) => {
  return axios.get(`${apiBase}/search`, { params: { rut: partialRut } });
};

export const getDelayedClients = () => axios.get(`${apiBase}/getDelayedClients`);
