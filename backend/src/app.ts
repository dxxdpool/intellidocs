import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import healthRouter from "./routes/health.routes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/health", healthRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

app.use(errorHandler);

export default app;