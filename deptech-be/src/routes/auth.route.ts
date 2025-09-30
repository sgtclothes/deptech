import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authValidator from "../validators/auth.validator.js";

router.post(
    "/login",
    authValidator.login,
    authMiddleware.checkIfUserNotExists,
    authMiddleware.checkIfUserActive,
    authController.login
);

router.post("/logout", authMiddleware.isAuthenticatedWithCookie, authController.logout);

export default router;
