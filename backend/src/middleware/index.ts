import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class Middleware {
  handleValidationError = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(500).json(error);
    }
    next();
  };
}

export default new Middleware();
