import { Model, DataTypes, Sequelize } from "sequelize";
import { type ProductModel } from "../types/product.type.js";

export default (sequelize: Sequelize) => {
    class Product extends Model<ProductModel> {
        static associate(models: any) {
            /** Many to One with Category */
            Product.belongsTo(models.Category,{
                foreignKey: "categoryId",
                as: "category",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Product.hasMany(models.DetailTransaction, {
                foreignKey: "productId",
                as: "detailTransactions",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        }
    }

    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            categoryId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
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
            modelName: "Product",
            tableName: "products",
        }
    );

    return Product;
};

