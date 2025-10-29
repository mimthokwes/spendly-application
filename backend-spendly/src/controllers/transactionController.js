import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// CREATE TRANSACTION
export const createTransaction = async (req, res) => {
  try {
    const userId = req.user.id; // dari token JWT middleware
    const { type, nominal, category, description, date } = req.body;

    if (!type || !nominal || !category) {
      return res
        .status(400)
        .json({ error: "Type, amount, and category are required" });
    }

    const newTransaction = new Transaction({
      userId,
      type,
      nominal,
      category,
      description,
      date: req.body.date ? new Date(req.body.date) : new Date(),
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

// GET ALL TRANSACTIONS FOR A USER
export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get transactions" });
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!transaction) {
      return res
        .status(404)
        .json({ error: "Transaction not found or unauthorized" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
