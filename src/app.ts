import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { getCustomRepository } from "typeorm";
import { environment } from "./config";
import { ApiError, InternalError } from "./core/ApiError";
import connectDB from "./database/db";
import LinkRepo from "./database/repository/LinkRepo";
import routesV1 from "./routes/v1/routes";
import asyncHandler from "./utils/asyncHandler";
import url from "url";

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/v1", routesV1);

// This route will handle the short link redirect
app.get(
	"/:shortUrl",
	asyncHandler(async (req: Request, res: Response) => {
		const linkRepo = getCustomRepository(LinkRepo);
		const link = await linkRepo.findByShortUrl(req.params.shortUrl);
		if (!link) throw new Error("short link does not exist");
		link.clickCount++;
		linkRepo.save(link);
		if (!link.longUrl.startsWith("https") && !link.longUrl.startsWith("http"))
			link.longUrl = `http://${link.longUrl}`;
		const longUrl = new URL(link.longUrl);
		res.redirect(longUrl.toString());
	})
);

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof ApiError) {
		ApiError.handle(err, res);
	} else {
		if (environment == "dev") {
			return res.status(500).send(err.message);
		}
		ApiError.handle(new InternalError(), res);
	}
});

export default app;
