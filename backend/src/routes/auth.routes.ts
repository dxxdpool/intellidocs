import { Router } from "express";
import { authController, authenticate } from "../container.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);
router.get(
    "/me",
    authenticate,
    authController.me
);

export default router;