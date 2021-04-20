import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import asyncHandler from "../../../utils/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import { AuthFailureError, BadRequestError } from "../../../core/ApiError";
import bcrypt from "bcrypt";
import { SuccessResponse } from "../../../core/ApiResponse";

export const login = asyncHandler(async (req: Request, res: Response) => {
	const userRepo = getCustomRepository(UserRepo);
	const user = await userRepo.findByEmail(req.body.email);
	if (!user) throw new BadRequestError("User not registered");
	const match = await bcrypt.compare(req.body.password, user.password);
	if (!match) throw new AuthFailureError("Authentication Failure");
	new SuccessResponse("Login Success.", {
		user: user
	}).send(res);
});
