import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async-handler.js";

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    readonly register = asyncHandler(async (req, res) => {
        const user = await this.authService.register(req.body);

        res.status(201).json(user);
    });
    readonly login = asyncHandler(async (req, res) => {
        const user = await this.authService.login(req.body);

        res.status(200).json(user);
    });
}