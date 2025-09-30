import { AbstractWinstonService } from "../types/log.type.js";
import winston from "winston";

class WinstonService implements AbstractWinstonService {
    private readonly logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL ?? "info",
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: "logs/error.log", level: "error" }),
                new winston.transports.File({ filename: "logs/combined.log" }),
            ],
        });
    }

    public log(level: string, message: string) {
        this.logger.log(level, message);
    }
}

export default new WinstonService();

