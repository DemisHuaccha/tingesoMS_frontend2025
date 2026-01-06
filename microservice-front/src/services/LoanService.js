import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE_URL + "/loan";

export const listLoan = () => axios.get(apiBase + "/getAll");

export const createLoan = (loan) => axios.post(apiBase + "/createLoan", loan);

export const returnLoan = (loanData) => axios.put(`${apiBase}/return`, loanData);

//Tool need to be repaired
export const returnLoanNotool = (loanData) => axios.put(`${apiBase}/returnDamegeTool`, loanData);

//Tool need to be replaced
export const returnLoanLate = (loanData) => axios.put(`${apiBase}/returnDeleteTool`, loanData);


//export const returnLoan = (loanData) =>axios.put(`${apiBase}/Loan/return`, loanData, {headers: {'Content-Type': 'application/json'} });

