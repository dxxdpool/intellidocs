import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.issues,
        });
    }

    if (err instanceof Error) {
        return res.status(400).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: "Internal Server Error",
    });
}