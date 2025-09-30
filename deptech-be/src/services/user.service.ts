import ModelService from "./model.service.js";
import db from "../models/index.js";
import { Op, Transaction } from "sequelize";
import type { SetupPagination } from "../types/service.type.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { getDirname } from "../global/path.global.js";

const __dirname = getDirname(import.meta.url);

class UserService extends ModelService {
    constructor() {
        super(db.User);
    }
    async getAllUsers(
        params?: { limit?: number; offset?: number; search?: string },
        transaction?: Transaction
    ): Promise<Response> {
        params ??= {};
        let { limit = 10, offset = 0, search = "" } = params;
        try {
            let setup: SetupPagination = {
                limit: Number(limit),
                offset: Number(offset),
                attributes: [
                    "id",
                    "firstname",
                    "lastname",
                    "gender",
                    "email",
                    "role",
                    "birthDate",
                    "active",
                    "createdAt",
                ],
                order: [["createdAt", "DESC"]],
            };
            if (search !== "") {
                const likeSearch = `%${search.toLowerCase()}%`;
                setup.where = {
                    [Op.or]: [
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("firstname")), {
                            [Op.like]: likeSearch,
                        }),
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("lastname")), {
                            [Op.like]: likeSearch,
                        }),
                        db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("email")), {
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
    async createUser(data: any, transaction?: Transaction) {
        try {
            const password = await bcrypt.hash(data.password, 10);
            const response = await this.create(
                {
                    ...data,
                    id: uuidv4(),
                    password,
                    active: true,
                },
                transaction
            );
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateUser(userId: string, data: any, transaction?: Transaction) {
        try {
            const response = await this.update(userId, data, transaction);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async deleteUser(userId: string, transaction?: Transaction) {
        try {
            return await this.delete(userId, transaction);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new UserService();
