import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  info: { type: String },
  type: { type: String, enum: ["income", "spending"], required: true },
  nominal: { type: Number, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
