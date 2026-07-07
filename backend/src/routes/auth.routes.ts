import { Router } from "express";
import { authController } from "../container.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

export default router;