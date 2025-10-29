// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // ambil token dari header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password"); // simpan data user ke req
      next(); // lanjut ke controller berikutnya
    } catch (error) {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
  }
};
