import type { NextFunction, Request, Response } from "express";
export abstract class AbstractAuthController {
    abstract login(req: Request, res: Response): Promise<void>;
    abstract register(req: Request, res: Response): Promise<void>;
    abstract logout(req: Request, res: Response): Promise<void>;
    abstract forgotPassword(req: Request, res: Response): Promise<void>;
    abstract resetPassword(req: Request, res: Response): Promise<void>;
}

export abstract class AbstractAuthMiddleware {
    abstract isAuthenticatedWithCookie(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract verifyToken(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract checkIfUserExists(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract checkIfUserNotExists(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export abstract class AbstractAuthValidator {
    abstract login(req: Request, res: Response, next: NextFunction): Promise<void>;
    abstract register(req: Request, res: Response, next: NextFunction): Promise<void>;
}
