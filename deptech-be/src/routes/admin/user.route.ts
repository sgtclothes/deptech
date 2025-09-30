import express from "express";
const router = express.Router();
import userController from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

router.get("/", userController.index);
router.post("/", authMiddleware.checkIfUserExists, userController.create);
router.put("/:id", authMiddleware.checkIfUserNotExists, userController.update);
router.delete("/:id", userController.delete);

export default router;
