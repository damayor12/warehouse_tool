import { NextFunction, Request, Response } from "express";

class ErrorHandler {
  notfound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error("Not found - " + req.originalUrl);
    next(error);
  }

  baseError(err: Error, req: Request, res: Response) {
    res.status(res.statusCode || 500).json({
      message: err.message,
      error: {
        status: res.statusCode,
        stack: process.env?.ENV === "development" || !process.env?.ENV ? err.stack : undefined,
      },
    });
  }
}

export default new ErrorHandler();
