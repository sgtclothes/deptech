import express from "express";
const router = express.Router();
import productController from "../../controllers/product.controller.js";
import MulterUtil from "../../utils/multer.util.js";

const stringDate = new Date().toISOString().slice(0, 10);
const upload = new MulterUtil(`/products/${stringDate}`).getUploader();

router.get("/", productController.index);
router.post("/", upload.single("image"), productController.create);
router.put("/:id", upload.single("image"), productController.update);
router.delete("/:id", productController.delete);

export default router;
