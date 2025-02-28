import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { headerMiddleware } from "./middleware/header";
import { ZodError } from "zod";
import { EnvSchema, TEnvSchema } from "./env";
import { promMiddleware } from "./middleware/monitor";
import client from "prom-client";

import logger from "./logger";
import authRouter from "./routes/auth";
import dashRouter from "./routes/dashboard";
import profileRouter from "./routes/profile";

export class InitServer {
  app: Express;
  env?: TEnvSchema;

  constructor() {
    this.app = express();
  }

  public setup(): void {
    // Setup middlewares
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.disable("x-powered-by");
    this.app.use(promMiddleware);

    // Test route
    this.app.get("/api/v1/test", (_: Request, res: Response) => {
      res.status(200).json({
        message: "Heartbeat exists.",
      });
    });

    // Metrics route
    this.app.get("/api/v1/metrics", async (_: Request, res: Response) => {
      const metrics = await client.register.metrics();
      res.set("Content-Type", client.register.contentType);
      res.end(metrics);
    });

    this.app.use("/api/v1/auth", headerMiddleware, authRouter);
    this.app.use("/api/v1/profile", headerMiddleware, profileRouter);
    this.app.use("/api/v1/dashboard", headerMiddleware, dashRouter);

    // Return 404 if requested route is undefined
    this.app.use("*", (_: Request, res: Response) => {
      res.status(404);
    });
  }

  public async start() {
    try {
      logger.info("Initializing Server!");
      await prisma.$connect();
      this.env = EnvSchema.parse(process.env);
      this.app.listen(this.env.PORT);
      logger.info(`Optimus initialized successfully on: ${this.env?.PORT}`);
    } catch (error: any) {
      if (error instanceof PrismaClientInitializationError) {
        logger.fatal("Could not connect to PostgreSQL. Initialization failed!");
        return;
      } else if (error instanceof ZodError) {
        logger.fatal(
          "Could not load Environment Variables. Initialization failed!",
        );
        return;
      }
      console.log(error);
    }
  }
}
