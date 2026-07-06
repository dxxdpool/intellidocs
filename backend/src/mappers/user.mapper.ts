import { UserModel } from "../generated/prisma/models/User.js";
import { UserResponse } from "../types/user.types.js";

export function toUserResponse(user: UserModel): UserResponse {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    };
}