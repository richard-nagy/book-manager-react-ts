import type { NextFunction, Request, Response } from "express";

export default class HttpError extends Error {
    public status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
    }

    setStatus(status: number): this {
        this.status = status;
        return this;
    }

    setMessage(message: string): this {
        this.message = message;
        return this;
    }

    static errorHandler(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction,
    ): void {
        console.error("Error:", err.message);

        if (err instanceof HttpError) {
            res.status(err.status).json({
                message: err.message,
                ok: false,
                data: null,
            });
            return;
        }

        res.status(500).json({
            message: err.message || "Internal Server Error",
            ok: false,
            data: null,
        });
    }
}
