import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // ensure this matches your backend port

export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data; // return only the data object
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data; // return only the data object
};
