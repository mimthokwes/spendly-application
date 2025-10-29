import express from "express";
import { createTransaction, getUserTransactions, deleteTransaction } from "../controllers/transactionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getUserTransactions);
router.delete("/:id", protect, deleteTransaction);

export default router;
