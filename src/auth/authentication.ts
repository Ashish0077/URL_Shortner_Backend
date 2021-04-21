import { ProtectedRequest } from "app-request";
import express, { NextFunction, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AuthFailureError, TokenExpiredError, AccessTokenError } from "../core/ApiError";
import JWT from "../core/JWT";
import KeystoreRepo from "../database/repository/KeystoreRepo";
import UserRepo from "../database/repository/UserRepo";
import asyncHandler from "../utils/asyncHandler";
import { getAccessToken, validateTokenData } from "./authUtils";

const router = express.Router();

export default router.use(
	asyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
		req.accessToken = getAccessToken(req.headers.authorization);
		try {
			const payload = await JWT.validate(req.accessToken);
			validateTokenData(payload);

			const user = await getCustomRepository(UserRepo).findByUuid(payload.sub);
			if (!user) throw new AuthFailureError("User not registered.");
			req.user = user;

			const keystore = await getCustomRepository(KeystoreRepo).findforKey(user, payload.key);
			if (!keystore) {
				throw new AuthFailureError("Invalid access token");
			}
			req.keystore = keystore;
			return next();
		} catch (error) {
			if (error instanceof TokenExpiredError) throw new AccessTokenError(error.message);
			throw error;
		}
	})
);
