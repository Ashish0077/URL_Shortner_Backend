import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import crypto from "crypto"
import LinkRepo from "../../../database/repository/LinkRepo";
import asyncHandler from "../../../utils/asyncHandler";

export const getLink = asyncHandler(async(req: Request, res: Response) => {
    const link = await getCustomRepository(LinkRepo).findByUuid(req.params.uuid);
    if(!link)
        throw new Error("Link does not exist");
    link.shortUrl = `${req.protocol}://${req.get('host')}/${link.shortUrl}`;
    res.status(200).json({data: link});
})

export const createLink = asyncHandler(async(req: Request, res: Response) => {
    if(!req.body.longUrl)
        throw new Error("Long Url missing");
    const linkRepo = getCustomRepository(LinkRepo);
    const link = await linkRepo.create({
        longUrl: req.body.longUrl,
        shortUrl: crypto.randomBytes(3).toString("hex")
    })
    await linkRepo.save(link);
    link.shortUrl = `${req.protocol}://${req.get('host')}/${link.shortUrl}`;
    res.status(200).json({data: link});
})

export const deleteLink = asyncHandler(async(req: Request, res: Response) => {
    const linkRepo = getCustomRepository(LinkRepo);
    const link = await linkRepo.findByUuid(req.params.uuid);
    if(!link)
        throw new Error("Link does not exist");
    await linkRepo.delete({id: link.id});
    res.status(200).json({data : "successfully deleted"});
})