import { Transaction } from "sequelize";
import { AbstractRESTService } from "../types/service.type.js";

export default class ModelService extends AbstractRESTService {
    private readonly Model;

    constructor(Model: any) {
        super();
        this.Model = Model;
    }

    async count(setup?: object, transaction?: Transaction) {
        try {
            const count = await this.Model.count({ ...setup, transaction });
            return count;
        } catch (error: any) {
            throw new Error(`Error counting: ${error.message}`);
        }
    }

    async getAll(setup?: object, transaction?: Transaction) {
        try {
            const model = await this.Model.findAndCountAll({ ...setup, transaction });
            return model;
        } catch (error: any) {
            throw new Error(`Error fetching: ${error.message}`);
        }
    }

    async getOneBy(setup?: object, transaction?: Transaction) {
        try {
            const model = await this.Model.findOne({ ...setup, transaction });
            return model;
        } catch (error: any) {
            throw new Error(`Error fetching model: ${error.message}`);
        }
    }

    async getOne(id: string, setup?: object, transaction?: Transaction) {
        try {
            const model = await this.Model.findByPk(id, { ...setup, transaction });
            if (!model) return null;
            return model;
        } catch (error: any) {
            throw new Error(`Error fetching model: ${error.message}`);
        }
    }

    async create(data: object, transaction?: Transaction) {
        try {
            return await this.Model.create(data, { transaction });
        } catch (error: any) {
            throw new Error(`Error creating: ${error.message}`);
        }
    }

    async update(id: string, data: object, transaction?: Transaction) {
        try {
            await this.Model.update(data, { where: { id }, transaction });
            return await this.getOne(id, {}, transaction);
        } catch (error: any) {
            throw new Error(`Error updating model: ${error.message}`);
        }
    }

    async delete(id: string, transaction?: Transaction) {
        try {
            const deleted = await this.Model.destroy({ where: { id } }, transaction);
            return { message: `Model ID ${id} deleted.` };
        } catch (error: any) {
            throw new Error(`Error deleting model: ${error.message}`);
        }
    }

    async deleteBy(setup?: object, transaction?: Transaction) {
        try {
            await this.Model.destroy({ ...setup, transaction });
        } catch (error: any) {
            throw new Error(`Error deleting model: ${error.message}`);
        }
    }
}
