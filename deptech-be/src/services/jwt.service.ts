import jwt, { type SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Service to generate and verify JWT tokens
 * @class
 * @singleton
 * @exports JwtService
 * @requires dotenv
 * @requires jwt
 */

class JwtService {
    private readonly secretKey: string = process.env.JWT_SECRET as string;
    private readonly expiresIn: number = Number(process.env.JWT_EXPIRES_IN) || 3600;

    public generateToken(payload: any, expiresIn?: number): string {
        if (!this.secretKey) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const options: SignOptions = { expiresIn: expiresIn ?? this.expiresIn };
        return jwt.sign(payload, this.secretKey, options);
    }

    public verifyToken(token: string): any {
        try {
            if (!this.secretKey) {
                throw new Error("JWT_SECRET is not defined in environment variables.");
            }
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            console.error("Invalid Token:", error);
            return null;
        }
    }
}

export default new JwtService();
