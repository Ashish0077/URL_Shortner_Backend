import { ProtectedRequest } from "app-request";
import { Request, Response } from "express";
import _ from "lodash";
import { getCustomRepository } from "typeorm";
import { SuccessResponse } from "../../../core/ApiResponse";
import UserRepo from "../../../database/repository/UserRepo";
import asyncHandler from "../../../utils/asyncHandler";

export const getProfile = asyncHandler(async (req: ProtectedRequest, res: Response) => {
	new SuccessResponse("success", { user: _.omit(req.user, ["password", "id"]) }).send(res);
});

export const updateProfile = asyncHandler(async (req: ProtectedRequest, res: Response) => {
	req.user.name = req.body.name || req.user.name;
	req.user.email = req.body.email || req.user.email;
	await getCustomRepository(UserRepo).updateUser(req.user);
	new SuccessResponse("success", { user: _.omit(req.user, ["password", "id"]) }).send(res);
});
