import express from "express";
import Expense from "../models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all expenses for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err });
  }
});

// Add new expense (authenticated)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const newExpense = new Expense({ name, amount, category, userId: req.userId });
    await newExpense.save();
    res.status(201).json({ message: "Expense added", expense: newExpense });
  } catch (err) {
    res.status(500).json({ message: "Error adding expense", error: err });
  }
});

// Delete expense by id (authenticated, only owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found or not authorized" });
    }
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense", error: err });
  }
});

export default router;
