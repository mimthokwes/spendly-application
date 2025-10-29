// src/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  logoutUser,
  deleteUserById
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",protect, getUserProfile);
router.patch("/profile", protect, updateUser);
router.post("/logout", logoutUser);
router.delete("/:id", protect, deleteUserById); // hanya user login yg bisa hapus dirinya

export default router;
