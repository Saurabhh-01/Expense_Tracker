// BalanceSummary.jsx
import React, { useMemo } from "react";

const BalanceSummary = ({ expenses, initialBalance }) => {
  // Calculate total expense (sum of negative amounts -> stays negative)
  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, item) => {
      const amt = Number(item.amount) || 0;
      return amt < 0 ? sum + amt : sum;
    }, 0);
  }, [expenses]);

  // Available balance (net) = initialBalance + sum of all amounts (so negatives reduce it)
  const availableBalance = useMemo(() => {
    const all = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    return (Number(initialBalance) || 0) + all;
  }, [expenses, initialBalance]);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md flex justify-around text-center">
      <div>
        <h3 className="text-gray-500 font-medium">Total Expense</h3>
        <p className="text-red-500 font-bold text-xl">₹{totalExpense}</p>
      </div>
      <div>
        <h3 className="text-gray-500 font-medium">Available Balance</h3>
        <p className={`${
                  availableBalance < 0
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                } font-bold text-xl`}>₹{availableBalance}</p>
      </div>
    </div>
  );
};

export default BalanceSummary;
