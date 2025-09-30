import type { Request, Response } from "express";
import db from "../models/index.js";
import LogMiddleware from "../middlewares/log.middleware.js";
import ResponseUtil from "../utils/response.util.js";
import TransactionService from "../services/transaction.service.js";

class TransactionController {
    async index(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const trx = await TransactionService.getAllTransactions(req.query, transaction);
            await transaction.commit();
            ResponseUtil.success(res, trx, "Transactions retrieved successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const trx = await TransactionService.createTransaction(req.body, transaction);
            await transaction.commit();
            ResponseUtil.success(res, trx, "Transaction created successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
}

export default new TransactionController();
