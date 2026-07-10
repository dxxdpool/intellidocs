import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.url(),

    JWT_SECRET: z.string().min(32),

    JWT_EXPIRES_IN: z.enum([
        "15m",
        "1h",
        "1d",
        "7d",
    ]).default("15m"),

    BCRYPT_ROUNDS: z.coerce.number().default(12),
});

export const env = envSchema.parse(process.env);