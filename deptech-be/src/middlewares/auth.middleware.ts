import type { NextFunction, Request, Response } from "express";
import db from "../models/index.js";
import config from "../config/app.js";
import JwtService from "../services/jwt.service.js";
import LogMiddleware from "./log.middleware.js";
import ResponseUtil from "../utils/response.util.js";
import CookieService from "../services/cookie.service.js";
import { Op } from "sequelize";
import LibPhoneNumberUtil from "../utils/libphonenumber.util.js";

class AuthMiddleware {
    async isAuthenticatedWithCookie(req: Request, res: Response, next: NextFunction): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const token = CookieService.getCookie(req);
            if (!token) {
                ResponseUtil.error(res, config.response.messages.verifyToken.messageFailed, {}, 401);
                return;
            }
            const decoded = JwtService.verifyToken(token);
            if (!decoded) {
                ResponseUtil.error(res, "Invalid session", {}, 401);
                return;
            }
            (req as any).user = decoded;
            await transaction.commit();
            next();
        } catch (error) {
            await transaction.rollback();
            ResponseUtil.error(res, "Authentication failed", {}, 401);
            LogMiddleware.logError(error, res);
        }
    }
    hasRole(requiredRoles: string | string[]) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const user = (req as any).user;
                if (!user) {
                    ResponseUtil.error(res, "Unauthorized access", {}, 401);
                    return;
                }
                const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
                const hasRequiredRole = user.roles.some((role: string) =>
                    roles.includes(role)
                );
                if (!hasRequiredRole) {
                    ResponseUtil.error(res, "Insufficient permissions", {}, 403);
                    return;
                }
                next();
            } catch (error) {
                ResponseUtil.error(res, "Authorization failed", {}, 403);
                LogMiddleware.logError(error, res);
            }
        };
    }
    async checkIfUserNotExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await db.User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                res.status(400).json({
                    message: config.response.messages.checkIfUserNotExists.messageFailed,
                    status: "failed",
                });
                return;
            }
            (req as any).user = user;
            next();
        } catch (error) {
            LogMiddleware.logError(error, res);
        }
    }
    async checkIfUserExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const columnToChecks: any = [{ email: req.body.email }];
            if (req.body.username) columnToChecks.push({ username: req.body.username });
            if (req.body.phoneNumber) columnToChecks.push({ phoneNumber: req.body.phoneNumber });
            const user = await db.User.findOne({
                where: {
                    [Op.or]: columnToChecks,
                },
            });
            if (user) {
                res.status(400).json({
                    message: config.response.messages.checkIfUserExists.messageFailed,
                    status: "failed",
                });
                return;
            }
            next();
        } catch (error) {
            LogMiddleware.logError(error, res);
        }
    }
    /**
     * This function checks if a user with the provided email exists in the database.
     * If the user exists, it returns an error response and halts further processing.
     * If the user does not exist, it proceeds to the next middleware or route handler.
     */
    async checkIfUserActive(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let user = (req as any).user;
            if (!user.active) {
                res.status(400).json({
                    message: config.response.messages.checkIfUserActive.messageFailed,
                    status: "failed",
                });
                return;
            }
            next();
        } catch (error) {
            LogMiddleware.logError(error, res);
        }
    }
    checkIfTokenIsValid = (type: "params" | "query" | "body") => {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                let { token } = req[type];
                if (!token) {
                    res.status(400).json({
                        message: config.response.messages.checkIfTokenIsValid.messageFailed,
                        status: "failed",
                    });
                    return;
                }
                const decoded = JwtService.verifyToken(token as string);
                if (!decoded) {
                    res.status(400).json({
                        message: config.response.messages.checkIfTokenIsValid.messageFailed,
                        status: "failed",
                    });
                    return;
                }
                (req as any).decoded = decoded;
                next();
            } catch (error) {
                LogMiddleware.logError(error, res);
            }
        };
    };
    normalizePhoneNumber = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const libPhoneNumberUtil = new LibPhoneNumberUtil("ID");
            const phoneNumber = libPhoneNumberUtil.normalizePhoneNumber(req.body.phoneNumber);
            if (!phoneNumber) {
                res.status(400).json({
                    message: "Invalid phone number, please try again with valid phone number",
                    status: "failed",
                });
                return;
            }
            req.body.phoneNumber = phoneNumber;
            next();
        } catch (error) {
            LogMiddleware.logError(error, res);
        }
    };
}

export default new AuthMiddleware();
