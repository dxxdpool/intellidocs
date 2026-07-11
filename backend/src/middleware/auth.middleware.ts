import { RequestHandler } from "express";

import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { UserRepository } from "../repositories/user.repository.js";
import { asyncHandler } from "../utils/async-handler.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function createAuthMiddleware(
    userRepository: UserRepository
): RequestHandler {
    return asyncHandler(async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            throw new UnauthorizedError("Authentication required");
        }

        const token = authHeader.substring(7);

        const payload = verifyAccessToken(token);

        const user = await userRepository.findById(payload.sub);

        if (!user) {
            throw new UnauthorizedError("Invalid authentication token");
        }

        req.user = user;

        next();
    });
}