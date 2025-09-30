import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const toInsert = [
            {
                id: uuidv4(),
                firstname: "admin",
                lastname: "deptech",
                email: "admin@deptech.com",
                birthDate: null,
                gender: null,
                role: "ADMIN",
                password: await bcrypt.hash("abcDEF123!", 10),
                data: JSON.stringify({}),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const users = toInsert;
        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("users", {});
    },
};
