import dotenv from "dotenv";
import type { DBConfig } from "../types/config.type.js";
dotenv.config();

const config: Record<string, DBConfig> = {
    development: {
        use_env_variable: process.env.DB_URL_DEVELOPMENT,
        username: process.env.DB_USERNAME_DEVELOPMENT ?? "root",
        password: process.env.DB_PASSWORD_DEVELOPMENT ?? "null",
        database: process.env.DB_DATABASE_DEVELOPMENT ?? "database_development",
        host: process.env.DB_HOST_DEVELOPMENT ?? "127.0.0.1",
        port: Number(process.env.DB_PORT_DEVELOPMENT) || 3306,
        dialect: process.env.DB_DIALECT_DEVELOPMENT ?? "mysql",
        dialectOptions: {
            connectTimeout: 30000,
        },
        pool: {
            max: 20,
            min: 0,
            acquire: 60000,
            idle: 30000,
        },
        logging: console.log,
    },
    test: {
        use_env_variable: process.env.DB_URL_TEST,
        username: process.env.DB_USERNAME_TEST ?? "root",
        password: process.env.DB_PASSWORD_TEST ?? "null",
        database: process.env.DB_DATABASE_TEST ?? "database_test",
        host: process.env.DB_HOST_TEST ?? "127.0.0.1",
        port: Number(process.env.DB_PORT_TEST) || 3306,
        dialect: process.env.DB_DIALECT_TEST ?? "mysql",
    },
    production: {
        use_env_variable: process.env.DB_URL_PRODUCTION,
        username: process.env.DB_USERNAME_PRODUCTION ?? "root",
        password: process.env.DB_PASSWORD_PRODUCTION ?? "null",
        database: process.env.DB_DATABASE_PRODUCTION ?? "database_production",
        host: process.env.DB_HOST_PRODUCTION ?? "127.0.0.1",
        port: Number(process.env.DB_PORT_PRODUCTION) || 3306,
        dialect: process.env.DB_DIALECT_PRODUCTION ?? "mysql",
        dialectOptions: {
            connectTimeout: 30000,
        },
        pool: {
            max: 20,
            min: 0,
            acquire: 60000,
            idle: 30000,
        },
        logging: console.log,
    },
};

export default config;
