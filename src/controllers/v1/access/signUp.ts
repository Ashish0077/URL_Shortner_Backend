import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import asyncHandler from "../../../utils/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import { BadRequestError } from "../../../core/ApiError";
import bcrypt from "bcrypt";
import { SuccessResponse } from "../../../core/ApiResponse";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
	const userRepo = getCustomRepository(UserRepo);
	const user = await userRepo.findByEmail(req.body.email);
	if (user) throw new BadRequestError("User already registered");
	const passwordHash = await bcrypt.hash(req.body.password, 10);
	const createdUser = await userRepo.create({
		name: req.body.name,
		email: req.body.email,
		password: passwordHash
	});
	await userRepo.save(createdUser);
	new SuccessResponse("Signup Successful", {
		user: createdUser
	}).send(res);
});
