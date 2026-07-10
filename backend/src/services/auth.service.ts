import { ConflictError } from "../errors/conflict-error.js";
import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { toUserDTO } from "../mappers/user.mapper.js";
import { UserRepository } from "../repositories/user.repository.js";
import { LoginUserData, RegisterUserData } from "../types/auth.types.js";
import { generateAccessToken } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}
    async register(data: RegisterUserData) {
        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictError("Email already exists");
        }

        const passwordHash = await hashPassword(data.password);

        const user = await this.userRepository.create({
            email: data.email,
            name: data.name,
            passwordHash,
        });

        return toUserDTO(user);
    }
    async login(data: LoginUserData) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const isValidPassword = await verifyPassword(
            data.password,
            user.passwordHash
        );

        if (!isValidPassword) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const accessToken = generateAccessToken(user.id);

        return {
            accessToken,
            user: toUserDTO(user),
        };
    }
}