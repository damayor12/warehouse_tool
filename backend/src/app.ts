import express, { NextFunction, Request, Response, Express } from "express";

import router from "./routes";
import ErrorHandler from "./middleware/errors";
import cors from "cors";

function createServer() {
  const app: Express = express();
  app.use(express.json());

  app.use(cors());
  app.use("/", router);

  app.use(ErrorHandler.notfound);

  app.use(ErrorHandler.baseError);

  return app;
}

export default createServer;
