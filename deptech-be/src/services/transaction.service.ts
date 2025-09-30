import ModelService from "./model.service.js";
import db from "../models/index.js";
import { Op, Transaction } from "sequelize";
import type { SetupPagination } from "../types/service.type.js";
import { v4 as uuidv4 } from "uuid";

class TransactionService extends ModelService {
    constructor() {
        super(db.Transaction);
    }
    async getAllTransactions(
        params?: { limit?: number; offset?: number; search?: string },
        transaction?: Transaction
    ): Promise<Response> {
        params ??= {};
        let { limit = 10, offset = 0, search = "" } = params;
        try {
            let setup: SetupPagination = {
                limit: Number(limit),
                offset: Number(offset),
                attributes: ["id", "type", "createdAt"],
                include: [
                    {
                        model: db.DetailTransaction,
                        as: "detailTransactions",
                        attributes: ["id", "stock"],
                        include: [
                            {
                                model: db.Product,
                                as: "product",
                                attributes: ["id", "name", "image", "stock"],
                            },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            };
            if (search !== "") {
                const likeSearch = `%${search.toLowerCase()}%`;
                setup.where = {
                    [Op.or]: [
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("Transaction.type")), {
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
    async createTransaction(data: any, transaction?: Transaction) {
        try {
            console.log("DATA TRANSAKSI: ", data);
            const response = await this.create(
                {
                    ...data,
                    id: uuidv4(),
                },
                transaction
            );
            for (const detailTransaction of data?.detailTransactions || []) {
                const product = await db.Product.findOne({
                    where: { id: detailTransaction?.productId },
                    transaction,
                });

                if (!product) {
                    throw new Error(`Product with id ${detailTransaction?.productId} not found`);
                }

                const stockDetail = Number(detailTransaction?.stock);

                if (data?.type === "OUT" && stockDetail > product.stock) {
                    throw new Error("Stock not enough");
                } else if (data?.type === "IN") {
                    await db.Product.update(
                        { stock: product.stock + stockDetail },
                        { where: { id: detailTransaction?.productId }, transaction }
                    );
                } else {
                    await db.Product.update(
                        { stock: product.stock - stockDetail },
                        { where: { id: detailTransaction?.productId }, transaction }
                    );
                }

                await db.DetailTransaction.create(
                    {
                        ...detailTransaction,
                        id: uuidv4(),
                        transactionId: response.id,
                    },
                    { transaction }
                );
            }
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new TransactionService();
