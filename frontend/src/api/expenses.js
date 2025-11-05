import axios from 'axios';

const API_URL = "http://localhost:8080/api/expenses";

// Add auth token to all requests
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllExpenses = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

export const addExpense = async (expenseData) => {
  return await axios.post(API_URL, expenseData, { headers: authHeader() });
};

export const deleteExpense = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};