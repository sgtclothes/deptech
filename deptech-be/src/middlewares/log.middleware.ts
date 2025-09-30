import WinstonService from "../services/winston.service.js";
import type { Request, Response, NextFunction } from "express";

class LogMiddleware {
    public logRequest(req: Request, res: Response, next: NextFunction) {
        WinstonService.log("info", `${req.method} ${req.url} - ${req.ip}`);
        next();
    }
    public logError(error: any, res: Response) {
        console.error((error as Error).message);
        console.error("Stack Trace:", (error as Error).stack);
        res.status(500).json({ message: (error as Error).message });
    }
}

export default new LogMiddleware();
