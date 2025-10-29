import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percent: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  allocation: [allocationSchema],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
