import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import asyncHandler from "../../../utils/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import { AuthFailureError, BadRequestError } from "../../../core/ApiError";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { SuccessResponse } from "../../../core/ApiResponse";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import { createToken } from "../../../auth/authUtils";
import _ from "lodash";

export const login = asyncHandler(async (req: Request, res: Response) => {
	if (!req.body.email || !req.body.password) throw new BadRequestError("Bad Parameters");
	const userRepo = getCustomRepository(UserRepo);
	const user = await userRepo.findByEmail(req.body.email);
	if (!user) throw new BadRequestError("User not registered");

	const match = await bcrypt.compare(req.body.password, user.password);
	if (!match) throw new AuthFailureError("Authentication Failure");

	const accessTokenKey = crypto.randomBytes(64).toString("hex");
	const refreshTokenKey = crypto.randomBytes(64).toString("hex");

	const keystoreRepo = getCustomRepository(KeystoreRepo);
	const keystore = await keystoreRepo.create({
		client: user,
		primaryKey: accessTokenKey,
		secondaryKey: refreshTokenKey
	});
	const keystoreAvailable = await keystoreRepo.findOne({ client: user });
	if (!keystoreAvailable) await keystoreRepo.save(keystore);
	else await keystoreRepo.update({ client: user }, keystore);
	const tokens = await createToken(user, keystore.primaryKey, keystore.secondaryKey);
	new SuccessResponse("Login Success.", {
		user: _.omit(user, ["password", "id"]),
		tokens: tokens
	}).send(res);
});
