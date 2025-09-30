import ModelService from "./model.service.js";
import db from "../models/index.js";
import { Op, Transaction } from "sequelize";
import type { SetupPagination } from "../types/service.type.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import fsPromise from "fs/promises";
import { getDirname } from "../global/path.global.js";

const __dirname = getDirname(import.meta.url);

class ProductService extends ModelService {
    constructor() {
        super(db.Product);
    }
    async getAllProducts(
        params?: { limit?: number; offset?: number; search?: string },
        transaction?: Transaction
    ): Promise<Response> {
        params ??= {};
        let { limit = 10, offset = 0, search = "" } = params;
        try {
            let setup: SetupPagination = {
                limit: Number(limit),
                offset: Number(offset),
                attributes: ["id", "categoryId", "name", "image", "description", "stock", "createdAt"],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.Category,
                        as: "category",
                        attributes: ["id", "name"],
                    },
                ],
            };
            if (search !== "") {
                const likeSearch = `%${search.toLowerCase()}%`;
                setup.where = {
                    [Op.or]: [
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("Product.name")), {
                            [Op.like]: likeSearch,
                        }),
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("Product.description")), {
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
    async createProduct(req: any, transaction?: Transaction) {
        try {
            const { file, body: data } = req;
            const filePathName = req.filePathName;
            let targetData: any = {
                ...data,
                id: uuidv4(),
            };
            if (file) {
                const image = "/api/assets/uploads" + filePathName + "/" + file.filename;
                targetData.image = image;
            }
            const response = await this.create(targetData, transaction);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateProduct(id: string, req: any, transaction?: Transaction) {
        try {
            const { file, body: data } = req;
            const filePathName = req?.filePathName;

            const product = await db.Product.findOne({
                where: { id },
                transaction,
            });

            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }

            let updateData: any = {
                name: data?.name,
                description: data?.description,
                stock: data?.stock,
                categoryId: data?.categoryId,
            };

            if (!file && data?.removeImage) {
                if (product.image) {
                    const oldImagePath = path.join(__dirname, `../../assets/uploads/${product.image}`);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.image = null;
            }

            if (file) {
                if (product.image) {
                    const oldImagePath = path.join(__dirname, `../../assets/uploads/${product.image}`);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.image = "/api/assets/uploads" + filePathName + "/" + file.filename;
            }
            const response = await product.update(updateData, { transaction });
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteProduct(id: string, transaction?: Transaction) {
        try {
            const product = await db.Product.findOne({
                where: { id },
                transaction,
            });
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            if (product.image) {
                const oldImagePath = path.join(__dirname, `../../assets/uploads/${product.image}`);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            const response = await product.destroy({ transaction });
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new ProductService();
