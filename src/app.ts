import express, { Request, Response } from "express";
import morgan from "morgan"
import { getCustomRepository } from "typeorm";
import connectDB from "./database/db"
import LinkRepo from "./database/repository/LinkRepo";
import routesV1 from "./routes/v1/routes";
import asyncHandler from "./utils/asyncHandler";

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/v1", routesV1);

// This route will handle the short link redirect
app.get("/:shortUrl", asyncHandler(async (req: Request, res: Response) => {
		const linkRepo = getCustomRepository(LinkRepo);
		const link = await linkRepo.findByShortUrl(req.params.shortUrl);
		if (!link) throw new Error("short link does not exist");
		link.clickCount++;
		linkRepo.save(link);
		res.redirect(`http://${link.longUrl}`);
	})
);

export default app;