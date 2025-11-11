import express from "express";
import { aiChatBot } from "../controllers/aiChatBotController.js";

const router = express.Router();

router.post("/", aiChatBot);
console.log("✅ chatBotRoutes aktif");


export default router;