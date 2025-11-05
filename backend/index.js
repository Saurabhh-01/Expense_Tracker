import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/ExpenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection with proper error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose
  .connect(process.env.MONGO_URI)
  .catch((err) => console.error('Initial MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
