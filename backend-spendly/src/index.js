// src/index.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import savingRoutes from "./routes/savingRoutes.js";

dotenv.config({quiet: true});

const app = express();
app.use(express.json());

// koneksi ke database
connectDB();

// routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/savings", savingRoutes);

// server run
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
