import React, { useEffect, useState } from "react";
import Header from "./Header";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import axios from "axios";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const API_URL = "http://localhost:8080/api/expenses";

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add new expense
  const handleAddExpense = async (expense) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // backend returns { message, expense }
      const newExpense = res.data.expense || res.data;
      // prepend so newest appears first
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div>
      <Header />
      <ExpenseForm onAdd={handleAddExpense} />
      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
    </div>
  );
};

export default Dashboard;
