import { NextFunction, Request, Response } from "express";
import client from "prom-client";

// Initializers for middleware
const reqCounter = new client.Counter({
	name: "totalHTTPRequests",
	help: "Total number of HTTP requests",
	labelNames: ["method", "route", "status"],
});

const activeUserGauge = new client.Gauge({
	name: "activeUsers",
	help: "Number of users with unresolved requests",
	labelNames: ["method", "route"],
});

const httpReqDurationHist = new client.Histogram({
	name: "httpRequestDurationInMs",
	help: "Duration of HTTP requests in ms",
	labelNames: ["method", "route", "status"],
	buckets: [25, 50, 100, 500, 1000, 3000, 5000, 10000],
});

const promMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const startTime = Date.now();

	activeUserGauge.inc({
		method: req.method,
		route: req.route ? req.route.path : req.path,
	});

	res.on("close", () => {
		const endTime = Date.now();
		const duration = endTime - startTime;
		// console.log(`Request took ${}`);

		activeUserGauge.dec();

		httpReqDurationHist.observe(
			{
				method: req.method,
				route: req.route ? req.route.path : req.path,
				status: res.statusCode,
			},
			duration,
		);

		reqCounter.inc({
			method: req.method,
			route: req.route ? req.route.path : req.path,
			status: res.statusCode,
		});
	});
	next();
};

export { promMiddleware };
