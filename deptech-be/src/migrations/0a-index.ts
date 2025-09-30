import { QueryInterface } from "sequelize";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { getDirname, getBasename } from "../global/path.global.js";
import config from "../config/app.js";

const __dirname = getDirname(import.meta.url);
const basename = getBasename(import.meta.url);

const loadMigrations = async (pathName: string) => {
    if (!fs.existsSync(pathName)) {
        return [];
    }
    let files = fs.readdirSync(pathName).filter((file) => {
        return !file.startsWith(".") && file !== basename && file.endsWith(".js") && file.indexOf(".test.js") === -1;
    });
    files = files.sort((a, b) => {
        const getLeadingNumber = (str: string) => parseInt(str.match(/^\d+/)?.[0] || "0", 10);
        return getLeadingNumber(a) - getLeadingNumber(b);
    });
    const migrationImports = files.map((file) => import(pathToFileURL(path.join(pathName, file)).href));
    const migrations = await Promise.all(migrationImports);
    return migrations.map((m) => m.default);
};

const collectMigrations = async () => {
    let migrations = await Promise.all([...(await loadMigrations(__dirname + config.paths.migrations.root))]);
    let appMigrations = await Promise.all(
        config.paths.migrations.apps.map((appPath: string) => loadMigrations(path.join(__dirname, appPath)))
    );
    appMigrations.forEach((appMigration) => {
        migrations = migrations.concat(appMigration);
    });
    return migrations;
};

export default {
    up: async (queryInterface: QueryInterface) => {
        try {
            for (const migration of await collectMigrations()) {
                await migration.up(queryInterface);
            }
        } catch (error) {
            console.error(error);
        }
    },
    down: async (queryInterface: QueryInterface) => {
        try {
            for (const migration of await collectMigrations()) {
                await migration.down(queryInterface);
            }
        } catch (error) {
            console.error(error);
        }
    },
};
