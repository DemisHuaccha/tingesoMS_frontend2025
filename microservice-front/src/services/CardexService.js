import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE_URL + "/kardex";


export const listCardex = () => axios.get(apiBase + "/getAll");

export const listForTime = (start, end, toolId) => axios.post(`${apiBase}/filter/date`, null, { params: { start, end, toolId } });

export const searchByToolId = (logEntry) => axios.post(`${apiBase}/log`, logEntry);
