import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import crypto from "crypto";
import LinkRepo from "../../../database/repository/LinkRepo";
import asyncHandler from "../../../utils/asyncHandler";
import { BadRequestError, NoEntryError } from "../../../core/ApiError";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/ApiResponse";

export const getLink = asyncHandler(async (req: Request, res: Response) => {
	const link = await getCustomRepository(LinkRepo).findByUuid(req.params.uuid);
	if (!link) throw new NoEntryError("Link does not exist.");
	link.shortUrl = `${req.protocol}://${req.get("host")}/${link.shortUrl}`;
	new SuccessResponse("success", link).send(res);
});

export const createLink = asyncHandler(async (req: Request, res: Response) => {
	if (!req.body.longUrl) throw new BadRequestError("Long Url missing");
	const linkRepo = getCustomRepository(LinkRepo);
	const link = await linkRepo.create({
		longUrl: req.body.longUrl,
		shortUrl: crypto.randomBytes(3).toString("hex")
	});
	await linkRepo.save(link);
	link.shortUrl = `${req.protocol}://${req.get("host")}/${link.shortUrl}`;
	new SuccessResponse("success", link).send(res);
});

export const deleteLink = asyncHandler(async (req: Request, res: Response) => {
	const linkRepo = getCustomRepository(LinkRepo);
	const link = await linkRepo.findByUuid(req.params.uuid);
	if (!link) throw new NoEntryError("Link does not exist");
	await linkRepo.delete({ id: link.id });
	new SuccessMsgResponse("Successfully Deleted!");
});
