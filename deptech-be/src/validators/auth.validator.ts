import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

class AuthValidator {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.body) {
                res.status(400).json({
                    status: "failed",
                    message: "Email and password are required",
                });
                return;
            }
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                rememberMe: Joi.boolean(),
            });
            const validationError = schema.validate(req.body).error;
            if (validationError) {
                res.status(400).json({
                    status: "failed",
                    message: validationError?.details[0]?.message,
                });
                return;
            }
            next();
        } catch (error) {
            console.error((error as Error).message);
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new AuthValidator();
