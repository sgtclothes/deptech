import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import LogMiddleware from "./middlewares/log.middleware.js";
import { getDirname } from "./global/path.global.js";
import chalk from "chalk";
import http from "http";

const __dirname = getDirname(import.meta.url);

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(
    cors({
        origin: [
            process.env.BASE_URL_APP ?? ""
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(LogMiddleware.logRequest);
app.use("/api", routes);
app.use("/api/assets", express.static(path.join(__dirname, "../assets")));

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(chalk.green(`Server running on ${process.env.BASE_URL_API}`));
});

export default server;
