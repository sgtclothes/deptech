import express from "express";
const router = express.Router();
import userRoute from "./admin/user.route.js";
import categoryRoute from "./admin/category.route.js";
import productRoute from "./admin/product.route.js";
import transactionRoute from "./admin/transaction.route.js";

router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/transactions", transactionRoute);

export default router;
