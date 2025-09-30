import express from "express";
const router = express.Router();
import categoryController from "../../controllers/category.controller.js";

router.get("/", categoryController.index);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;
