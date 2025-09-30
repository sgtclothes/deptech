import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware.js";
import adminRoute from "./admin.route.js";
import authRoute from "./auth.route.js";

router.use(
    "/admin",
    authMiddleware.isAuthenticatedWithCookie,
    authMiddleware.hasRole(["SYSADMIN", "ADMIN"]),
    adminRoute
);

router.use("/auth", authRoute);

export default router;
