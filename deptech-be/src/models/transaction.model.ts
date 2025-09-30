import { Model, DataTypes, Sequelize } from "sequelize";
import { type TransactionModel } from "../types/transaction.type.js";

export default (sequelize: Sequelize) => {
    class Transaction extends Model<TransactionModel> {
        static associate(models: any) {
            /** One to Many with DetailTransaction */
            Transaction.hasMany(models.DetailTransaction,{
                foreignKey: "transactionId",
                as: "detailTransactions",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Transaction.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            data: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: {},
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Transaction",
            tableName: "transactions",
        }
    );

    return Transaction;
};

