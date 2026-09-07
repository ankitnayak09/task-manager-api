import express from "express";
import type { Request, Response } from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { NotFoundError } from "./shared/utils/apiError.js";
import logger from "./middlewares/logger.js";
import errorMiddleware from "./middlewares/error.middleware.js";

function createApp() {
  const app = express();

  app.use(
    pinoHttp({
      logger,
      genReqId: (req) =>
        (req.headers["x-request-id"] as string) ?? crypto.randomUUID(),
    }),
  );
  app.use(helmet({ contentSecurityPolicy: true }));
  app.use(express.json());

  // Health Route
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ uptime: process.uptime(), healthy: true });
  });

  // Domain Routes

  // Not Found Routes
  app.use((req, res, next) => {
    next(new NotFoundError("Route Not Found"));
  });

  app.use(errorMiddleware);

  return app;
}

export default createApp;
