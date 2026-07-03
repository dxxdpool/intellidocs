import type { Request, Response } from "express";
import { getHealthStatus } from "../services/health.services.js";


export function getHealth(
    req: Request,
    res: Response
) {
    const health = getHealthStatus();

    res.status(200).json(health);
}