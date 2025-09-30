import type { Request, Response } from "express";
import db from "../models/index.js";
import config from "../config/app.js";
import bcrypt from "bcrypt";
import JwtService from "../services/jwt.service.js";
import LogMiddleware from "../middlewares/log.middleware.js";
import CookieService from "../services/cookie.service.js";
import ResponseUtil from "../utils/response.util.js";

class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const user = (req as any).user;
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (!isValidPassword) {
                ResponseUtil.error(res, config.response.messages.checkIfUserNotExists.messageFailed);
                return;
            }
            const token = JwtService.generateToken({
                id: user.id,
                email: user.email,
                roles: [user.role],
            });
            CookieService.setCookie(res, token);
            await transaction.commit();
            ResponseUtil.success(res, { id: user.id }, "User login successfully");
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            LogMiddleware.logError(error, res);
        }
    }
    async logout(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            CookieService.deleteCookie(res);
            await transaction.commit();
            ResponseUtil.success(res, {}, "User logged out successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
}

export default new AuthController();
