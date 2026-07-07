import { RequestHandler } from "express";
import { ZodType } from "zod";

export function validate<T>(schema: ZodType<T>): RequestHandler {
    return (req, res, next) => {
        req.body = schema.parse(req.body);
        next();
    };
}