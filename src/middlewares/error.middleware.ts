import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../shared/utils/apiError.js";
import logger from "./logger.js";

export default function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError && err.isOperational) {
    logger.warn({ err }, err.message);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  logger.error({ err }, "Unexpected Error");
  return res.status(500).json({
    status: "error",
    message: "Something Went Wrong",
  });
}
