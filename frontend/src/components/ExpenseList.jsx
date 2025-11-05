import React from "react";

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Expense List
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses added yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {expenses.map((expense) => (
            <li
              key={expense._id} // use unique _id from backend
              className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {expense.name}
                </span>
                <span className="text-sm text-gray-500">{expense.category}</span>
              </div>

              <span
                className={`font-semibold px-3 py-1 rounded-md ${
                  expense.amount < 0
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                ₹{expense.amount}
              </span>

              <button
                onClick={() => onDelete(expense._id)}
                className="text-red-500 hover:text-red-700 font-medium transition-all"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
