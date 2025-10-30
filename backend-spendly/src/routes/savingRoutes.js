import express from "express";
import {
  getSaving,
  createSaving,
  depositSaving,
  withdrawSaving,
  deleteSaving,
} from "../controllers/savingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSaving);
router.post("/create", protect, createSaving);
router.post("/deposit", protect, depositSaving);
router.post("/withdraw", protect, withdrawSaving);
router.delete("/:id",protect, deleteSaving);

export default router;
