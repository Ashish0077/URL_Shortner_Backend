import { ProtectedRequest } from "app-request";
import { Response } from "express";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import { getCustomRepository } from "typeorm";
import asyncHandler from "../../../utils/asyncHandler";
import { SuccessMsgResponse } from "../../../core/ApiResponse";

export const logout = asyncHandler(async (req: ProtectedRequest, res: Response) => {
	await getCustomRepository(KeystoreRepo).remove(req.keystore);
	new SuccessMsgResponse("Logout success").send(res);
});
