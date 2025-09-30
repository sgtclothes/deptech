import type { Response, Request, CookieOptions } from "express";
interface ICookieConfig {
    key: string;
    options: CookieOptions;
}

class CookieService {
    private readonly defaultConfig: ICookieConfig = {
        key: process.env.COOKIE_KEY ?? "app",
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.COOKIE_SAME_SITE === "none" ? "none" : "lax",
            maxAge: process.env.COOKIE_MAX_AGE ? Number(process.env.COOKIE_MAX_AGE) : 3600000,
        }
    };

    public setCookie(res: Response, value: string, config?: Partial<ICookieConfig>): void {
        const finalConfig = {
            key: config?.key ?? this.defaultConfig.key,
            options: { ...this.defaultConfig.options, ...config?.options }
        };
        res.cookie(finalConfig.key, value, finalConfig.options);
    }

    public getCookie(req: Request, name: string = this.defaultConfig.key): string | undefined {
        return req.cookies[name];
    }

    public deleteCookie(res: Response, name: string = this.defaultConfig.key): void {
        res.clearCookie(name);
    }
}

export default new CookieService();
