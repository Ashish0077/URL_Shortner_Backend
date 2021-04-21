import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import asyncHandler from "../../../utils/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import { BadRequestError } from "../../../core/ApiError";
import bcrypt from "bcrypt";
import { SuccessResponse } from "../../../core/ApiResponse";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import crypto from "crypto";
import { createToken } from "../../../auth/authUtils";

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

	const accessTokenKey = crypto.randomBytes(64).toString("hex");
	const refreshTokenKey = crypto.randomBytes(64).toString("hex");

	const keystoreRepo = getCustomRepository(KeystoreRepo);
	const keystore = keystoreRepo.create({
		client: createdUser,
		primaryKey: accessTokenKey,
		secondaryKey: refreshTokenKey
	});
	await keystoreRepo.save(keystore);
	const tokens = await createToken(createdUser, keystore.primaryKey, keystore.secondaryKey);
	new SuccessResponse("Signup Successful", {
		user: createdUser,
		tokens: tokens
	}).send(res);
});
