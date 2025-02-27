import logger from "../logger";
import { NextFunction, Request, Response } from "express";

export const headerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.headers["content-type"] !== "application/json") {
		res.status(400).json({});
		logger.warn("Incoming format is not JSON");
		return;
	}
	next();
};
