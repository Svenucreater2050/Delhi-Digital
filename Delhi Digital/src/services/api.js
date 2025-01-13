import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getInvoices = () => axios.get(`${BASE_URL}/invoices`);
export const createInvoice = (data) => axios.post(`${BASE_URL}/invoices`, data);
export const updateInvoice = (id, data) => axios.put(`${BASE_URL}/invoices/${id}`, data);
export const deleteInvoice = (id) => axios.delete(`${BASE_URL}/invoices/${id}`);
