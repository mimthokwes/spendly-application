import Saving from "../models/Savings.js";

// Get savings info for user
export const getSaving = async (req, res) => {
  try {
    const saving = await Saving.findOne({ userId: req.user.id });
    if (!saving) {
      return res.status(404).json({ message: "Tabungan belum dibuat." });
    }
    res.json(saving);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or initialize saving
export const createSaving = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const exists = await Saving.findOne({ userId });
    if (exists)
      return res.status(400).json({ message: "Tabungan sudah ada." });

    const newSaving = new Saving({ userId });
    await newSaving.save();
    res.status(201).json({message: "Savings Acount Created Successfuly"},newSaving);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deposit to saving
export const depositSaving = async (req, res) => {
  try {
    const { nominal, category, description } = req.body;
    const saving = await Saving.findOne({ userId: req.user.id });
    if (!saving)
      return res.status(404).json({ message: "Tabungan tidak ditemukan." });

    saving.total += nominal;
    saving.history.push({
      typeSaving: "deposit",
      nominal,
      category,
      description,
    });
    await saving.save();

    res.json({ message: "Berhasil menambah tabungan.", saving });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Withdraw from saving
export const withdrawSaving = async (req, res) => {
  try {
    const { nominal, category, description } = req.body;
    const saving = await Saving.findOne({ userId: req.user.id });
    if (!saving)
      return res.status(404).json({ message: "Tabungan tidak ditemukan." });

    if (saving.total < nominal)
      return res
        .status(400)
        .json({ message: "Saldo tabungan tidak mencukupi." });

    saving.total -= nominal;
    saving.history.push({
      typeSaving: "withdraw",
      nominal,
      category,
      description,
    });
    await saving.save();

    res.json({ message: "Berhasil menarik tabungan.", saving });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete saving account
export const deleteSaving = async (req, res) => {
  try {
    const saving = await Saving.findOneAndDelete({ userId: req.user.id });

    if (!saving) {
      return res.status(404).json({ message: "Tabungan tidak ditemukan." });
    }

    res.json({ message: "Tabungan berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
