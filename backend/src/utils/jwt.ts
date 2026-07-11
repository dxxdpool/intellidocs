import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { JwtPayload } from "../types/auth.types.js";

export function generateAccessToken(userId: string): string {
    return jwt.sign(
        { sub: userId },
        env.JWT_SECRET,
        {
            expiresIn: env.JWT_EXPIRES_IN,
        }
    );
}

export function verifyAccessToken(token: string): JwtPayload {
    try {
        const payload = jwt.verify(token, env.JWT_SECRET);

        if (
            typeof payload !== "object" ||
            payload === null ||
            typeof payload.sub !== "string"
        ) {
            throw new UnauthorizedError("Invalid authentication token");
        }

        return {
            sub: payload.sub,
        };
    } catch {
        throw new UnauthorizedError("Invalid authentication token");
    }
}