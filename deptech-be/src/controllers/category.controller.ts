import type { Request, Response } from "express";
import db from "../models/index.js";
import LogMiddleware from "../middlewares/log.middleware.js";
import CategoryService from "../services/category.service.js";
import ResponseUtil from "../utils/response.util.js";

class CategoryController {
    async index(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const categories = await CategoryService.getAllCategories(req.query, transaction);
            await transaction.commit();
            ResponseUtil.success(res, categories, "Categories retrieved successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const category = await CategoryService.createCategory(req.body, transaction);
            await transaction.commit();
            ResponseUtil.success(res, category, "Category created successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const category = await CategoryService.updateCategory(req.params.id ?? "", req.body, transaction);
            await transaction.commit();
            ResponseUtil.success(res, category, "Category updated successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const category = await CategoryService.deleteCategory(req.params.id ?? "", transaction);
            await transaction.commit();
            ResponseUtil.success(res, category, "Category deleted successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
}

export default new CategoryController();

