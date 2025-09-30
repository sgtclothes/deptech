import { type Response } from "express";
import { type ResponseData } from "../types/response.type.js";

export default class ResponseUtil {
    static success(res: Response, data: any, message: string = "Success"): Response {
        const responseData: ResponseData = {
            status: "success",
            message,
            data,
        };
        return res.status(200).json(responseData);
    }
    static error(res: Response, message: string = "Error", data: any = null, status: number = 400): Response {
        const responseData: ResponseData = {
            status: "error",
            message,
            data,
            statusCode: status,
        };
        return res.status(status).json(responseData);
    }
    static custom(
        res: Response,
        status: string,
        message: string,
        data: any = null,
        statusCode: number = 200
    ): Response {
        const responseData: ResponseData = {
            status,
            message,
            data,
            statusCode,
        };
        return res.status(statusCode).json(responseData);
    }
}
