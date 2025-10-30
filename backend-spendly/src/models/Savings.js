import mongoose from "mongoose";

const savingHistorySchema = new mongoose.Schema({
  typeSaving: {
    type: String,
    enum: ["deposit", "withdraw"],
    required: true,
  },
  nominal: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: () =>
      new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
  },
});

const savingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    history: [savingHistorySchema],
  },
  { timestamps: true }
);

const Saving = mongoose.model("Saving", savingSchema);
export default Saving;
