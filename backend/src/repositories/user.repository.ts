import { PrismaClient } from "../generated/prisma/client.js";
import { CreateUserData } from "../types/user.types.js";

export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {}
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async create(data: CreateUserData) {
        return this.prisma.user.create({
            data,
        });
    }
}
