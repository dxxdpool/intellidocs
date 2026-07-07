import { UserModel } from "../generated/prisma/models/User.js";
import { UserDTO } from "../types/user.types.js";

export function toUserDTO(user: UserModel): UserDTO {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    };
}