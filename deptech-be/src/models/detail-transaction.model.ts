import { Model, DataTypes, Sequelize } from "sequelize";
import { type DetailTransactionModel } from "../types/transaction.type.js";

export default (sequelize: Sequelize) => {
    class DetailTransaction extends Model<DetailTransactionModel> {
        static associate(models: any) {
            /** Belongs to Transaction */
            DetailTransaction.belongsTo(models.Transaction,{
                foreignKey: "transactionId",
                as: "transaction",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            /** Belongs to Product */
            DetailTransaction.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "product",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    DetailTransaction.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            transactionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "transactions",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            stock: {
                type: DataTypes.INTEGER,
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
            modelName: "DetailTransaction",
            tableName: "detail_transactions",
        }
    );

    return DetailTransaction;
};

