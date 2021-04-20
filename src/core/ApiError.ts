import { Response } from "express";
import { environment } from "../config";
import { InternalErrorResponse, NotFoundResponse } from "./ApiResponse";

enum ErrorType {
	NO_ENTRY = "NoEntryError",
	NO_DATA = "NoDataError",
	INTERNAL = "InternalError",
	BAD_REQUEST = "BadRequestError"
}

export abstract class ApiError extends Error {
	constructor(public type: ErrorType, public message: string = "error") {
		super(type);
	}

	public static handle(err: ApiError, res: Response): Response {
		switch (err.type) {
			case ErrorType.NO_ENTRY:
			case ErrorType.NO_DATA:
				return new NotFoundResponse(err.message).send(res);
			case ErrorType.INTERNAL:
				return new InternalErrorResponse(err.message).send(res);
			default: {
				let message = err.message;
				if (environment == "prod") message = "Something went wrong!";
				return new InternalErrorResponse(message).send(res);
			}
		}
	}
}

export class NoEntryError extends ApiError {
	constructor(message = "entry don't exists") {
		super(ErrorType.NO_ENTRY, message);
	}
}

export class NoDataError extends ApiError {
	constructor(message = "No data available") {
		super(ErrorType.NO_DATA, message);
	}
}

export class InternalError extends ApiError {
	constructor(message = "Internal Error") {
		super(ErrorType.INTERNAL, message);
	}
}

export class BadRequestError extends ApiError {
	constructor(message = "Bad Request") {
		super(ErrorType.BAD_REQUEST, message);
	}
}
