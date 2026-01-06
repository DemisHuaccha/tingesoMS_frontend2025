import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE_URL + "/inventory";

export const listTool = () => axios.get(apiBase + "/all");

export const getToolById = (idTool) => axios.get(`${apiBase}/${idTool}`);

export const createTool = (tool) => axios.post(`${apiBase}/create`, tool);

export function updateTool(toolData) { return axios.put(`${apiBase}/update/${toolData.idTool}`, toolData); }
export function underRepairTool(toolStatus) { return axios.put(`${apiBase}/underRepair`, toolStatus); }
export function updateStatusTool(toolStatus) { return axios.put(`${apiBase}/updateStatus`, toolStatus); }
export function deleteTool(toolStatus) { return axios.put(`${apiBase}/deleteTool`, toolStatus); }

export const filterTool = (filterDto) => axios.post(`${apiBase}/filter`, filterDto);
export const gruopTools = () => axios.get(`${apiBase}/group`);

export const rankingTools = () => axios.get(import.meta.env.VITE_API_BASE_URL + "/report/ranking");