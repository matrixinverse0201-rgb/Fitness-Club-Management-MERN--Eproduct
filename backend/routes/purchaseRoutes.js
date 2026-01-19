import express from "express";
import { createPurchase ,deletePurchase} from "../controllers/purchaseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPurchase);
router.delete("/:id", authMiddleware, deletePurchase);

export default router;