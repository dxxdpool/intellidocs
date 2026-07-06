import { prisma } from "./config/prisma.js";
import { AuthController } from "./controllers/auth.controller.js";
import { UserRepository } from "./repositories/user.repository.js";
import { AuthService } from "./services/auth.service.js";

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export { authController };
