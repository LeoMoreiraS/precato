import dotenv from "dotenv";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../swagger.json";
import "./shared/database";
import "./shared/container";
import { AppError } from "./shared/errors/AppError";
import { router } from "./shared/routes/routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({ error: err.message });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
        next();
    }
);
export { app };
