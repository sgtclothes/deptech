import { Model, DataTypes, Sequelize } from "sequelize";
import { type CategoryModel } from "../types/category.type.js";

export default (sequelize: Sequelize) => {
    class Category extends Model<CategoryModel> {
        static associate(models: any) {
            /** One to Many with Product */
            Category.hasMany(models.Product,{
                foreignKey: "categoryId",
                as: "products",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Category.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
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
            modelName: "Category",
            tableName: "categories",
        }
    );

    return Category;
};
