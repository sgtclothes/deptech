import { QueryInterface, DataTypes } from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable("detail_transactions", {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            transactionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: "transactions", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: "products", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
                defaultValue: new Date(),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("detail_transactions");
    },
};
