import type { Request, Response } from "express";
import db from "../models/index.js";
import LogMiddleware from "../middlewares/log.middleware.js";
import ProductService from "../services/product.service.js";
import ResponseUtil from "../utils/response.util.js";

class ProductController {
    async index(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const products = await ProductService.getAllProducts(req.query, transaction);
            await transaction.commit();
            ResponseUtil.success(res, products, "Products retrieved successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const product = await ProductService.createProduct(req, transaction);
            await transaction.commit();
            ResponseUtil.success(res, product, "Product created successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const product = await ProductService.updateProduct(req.params.id ?? "", req, transaction);
            await transaction.commit();
            ResponseUtil.success(res, product, "Product updated successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        const transaction = await db.sequelize.transaction();
        try {
            const product = await ProductService.deleteProduct(req.params.id ?? "", transaction);
            await transaction.commit();
            ResponseUtil.success(res, product, "Product deleted successfully");
        } catch (error) {
            await transaction.rollback();
            LogMiddleware.logError(error, res);
        }
    }
}

export default new ProductController();

