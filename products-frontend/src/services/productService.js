// File: src/services/productService.js
import axios from 'axios';

const API_URL = 'https://localhost:7298/api/products'; 
// ⚠️ Replace 7XXX with your actual port from Visual Studio (check the browser URL when you run the API)

const getAll = () => axios.get(API_URL);
const getById = (id) => axios.get(`${API_URL}/${id}`);
const create = (product) => axios.post(API_URL, product);
const update = (id, product) => axios.put(`${API_URL}/${id}`, product);
const remove = (id) => axios.delete(`${API_URL}/${id}`);

const productService = { getAll, getById, create, update, remove };
export default productService;
