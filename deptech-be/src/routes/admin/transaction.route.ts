import express from "express";
const router = express.Router();
import transactionController from "../../controllers/transaction.controller.js";

router.get("/", transactionController.index);
router.post("/", transactionController.create);

export default router;
