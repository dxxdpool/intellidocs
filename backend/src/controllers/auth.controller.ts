import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { registerSchema } from "../validators/auth.validator.js";

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = registerSchema.parse(req.body);
            const user = await this.authService.register(data);
            
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

}