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
    const { type, year, month, week, day } = req.query;

    const filter = { userId };

    // ✅ Validasi type
    if (type) {
      const allowedTypes = ["income", "spending"];
      if (!allowedTypes.includes(type)) {
        return res.status(400).json({ error: "Invalid transaction type" });
      }
      filter.type = type;
    }

    // 🕒 Filter waktu berdasarkan kombinasi (year, month, week, day)
    if (year || month || week || day) {
      const y = parseInt(year) || new Date().getFullYear();
      const m = month ? parseInt(month) - 1 : null; // 1–12 → 0–11
      let startDate, endDate;

      if (year && !month && !week && !day) {
        // 🎯 Seluruh tahun
        startDate = new Date(y, 0, 1);
        endDate = new Date(y + 1, 0, 1);
      } else if (month && !week && !day) {
        // 🎯 Satu bulan penuh
        startDate = new Date(y, m, 1);
        endDate = new Date(y, m + 1, 1);
      } else if (month && week) {
        // 🎯 Minggu ke-n dalam bulan
        const startOfMonth = new Date(y, m, 1);
        const startOfWeek = new Date(startOfMonth);
        startOfWeek.setDate(startOfMonth.getDate() + (week - 1) * 7);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        endOfWeek.setHours(23, 59, 59, 999);

        startDate = startOfWeek;
        endDate = endOfWeek;
      } else if (month && day) {
        // 🎯 Hari tertentu dalam bulan
        const d = parseInt(day);
        startDate = new Date(y, m, d);
        endDate = new Date(y, m, d + 1);
      } else if (!month && week) {
        // 🎯 Minggu ke-n dalam tahun (kurang umum tapi bisa)
        const firstDay = new Date(y, 0, 1);
        const startOfWeek = new Date(firstDay);
        startOfWeek.setDate(firstDay.getDate() + (week - 1) * 7);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        endOfWeek.setHours(23, 59, 59, 999);

        startDate = startOfWeek;
        endDate = endOfWeek;
      } else {
        return res.status(400).json({
          error:
            "Invalid date combination. Use year, month, week, or day properly.",
        });
      }

      filter.date = { $gte: startDate, $lt: endDate };
    }

    // 🔍 Query data
    const transactions = await Transaction.find(filter).sort({ date: -1 });

    // 💬 Jika kosong
    if (transactions.length === 0) {
      return res.status(200).json({
        message: "No transactions added yet",
        data: [],
      });
    }

    // ✅ Jika ada data
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
