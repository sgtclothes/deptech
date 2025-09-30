import type { Request, Response } from "express";
import db from "../models/index.js";
import LogMiddleware from "../middlewares/log.middleware.js";
import UserService from "../services/user.service.js";
import ResponseUtil from "../utils/response.util.js";

class UserController {
    async index(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const users = await UserService.getAllUsers(req.query, transaction);
            await transaction.commit();
            ResponseUtil.success(res, users, "Users retrieved successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await UserService.createUser(req.body, transaction);
            await transaction.commit();
            ResponseUtil.success(res, user, "User created successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await UserService.updateUser(req.params.id ?? "", req.body, transaction);
            await transaction.commit();
            ResponseUtil.success(res, user, "User updated successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await UserService.deleteUser(req.params.id ?? "", transaction);
            await transaction.commit();
            ResponseUtil.success(res, user, "User deleted successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
}

export default new UserController();
