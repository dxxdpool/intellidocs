import { z } from "zod";

const emailSchema = z
    .email("Invalid email")
    .trim()
    .toLowerCase();

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128);

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100),

    email: emailSchema,

    password: passwordSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;