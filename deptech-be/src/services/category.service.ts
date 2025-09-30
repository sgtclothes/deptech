import ModelService from "./model.service.js";
import db from "../models/index.js";
import { Op, Transaction } from "sequelize";
import type { SetupPagination } from "../types/service.type.js";
import { v4 as uuidv4 } from "uuid";

class CategoryService extends ModelService {
    constructor() {
        super(db.Category);
    }
    async getAllCategories(
        params?: { limit?: number; offset?: number; search?: string },
        transaction?: Transaction
    ): Promise<Response> {
        params ??= {};
        let { limit = 10, offset = 0, search = "" } = params;
        try {
            let setup: SetupPagination = {
                limit: Number(limit),
                offset: Number(offset),
                attributes: ["id", "name", "description", "createdAt"],
                order: [["createdAt", "DESC"]],
            };
            if (search !== "") {
                const likeSearch = `%${search.toLowerCase()}%`;
                setup.where = {
                    [Op.or]: [
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("name")), {
                            [Op.like]: likeSearch,
                        }),
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("description")), {
                            [Op.like]: likeSearch,
                        }),
                    ],
                };
            }
            const response = await this.getAll(setup, transaction);
            const totalCount = await this.count({}, transaction);
            response.totalCount = totalCount;
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async createCategory(data: any, transaction?: Transaction) {
        try {
            const response = await this.create(
                {
                    ...data,
                    id: uuidv4(),
                },
                transaction
            );
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateCategory(categoryId: string, data: any, transaction?: Transaction) {
        try {
            const response = await this.update(categoryId, data, transaction);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async deleteCategory(categoryId: string, transaction?: Transaction) {
        try {
            return await this.delete(categoryId, transaction);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new CategoryService();
