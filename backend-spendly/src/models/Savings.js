import mongoose from "mongoose";

const savingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  history: [
    {
      amount: { type: Number, required: true },
      source: { type: String, default: "Manual Top-Up" },
      transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction", default: null },
      date: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

const Saving = mongoose.model("Saving", savingSchema);
export default Saving;
