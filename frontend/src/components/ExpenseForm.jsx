import React, { useState } from "react";

const ExpenseForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd) {
      onAdd({
        name: formData.name,
        amount: Number(formData.amount),
        category: formData.category,
      });
    }
    setFormData({ name: "", amount: "", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mt-8 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-2">
        Add Expense
      </h2>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter expense name"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category (e.g., Food, Travel)"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
