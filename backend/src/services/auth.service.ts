import bcrypt from "bcrypt";
import { ConflictError } from "../errors/conflict-error.js";
import { toUserDTO } from "../mappers/user.mapper.js";
import { UserRepository } from "../repositories/user.repository.js";
import { RegisterUserData } from "../types/auth.types.js";

export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}
    async register(data: RegisterUserData) {
        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictError("Email already exists");
        }

        const passwordHash = await bcrypt.hash(data.password, 12);

        const user = await this.userRepository.create({
            email: data.email,
            name: data.name,
            passwordHash,
        });

        return toUserDTO(user);
    }
}