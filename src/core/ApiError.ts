import { Response } from "express";
import { environment } from "../config";
import {
	InternalErrorResponse,
	NotFoundResponse,
	AuthFailureResponse,
	BadRequestResponse,
	AccessTokenErrorResponse
} from "./ApiResponse";

enum ErrorType {
	NO_ENTRY = "NoEntryError",
	NO_DATA = "NoDataError",
	INTERNAL = "InternalError",
	BAD_REQUEST = "BadRequestError",
	UNAUTHORIZED = "AuthFailureError",
	BAD_TOKEN = "BadTokenError",
	TOKEN_EXPIRED = "TokenExpiredError",
	ACCESS_TOKEN = "AccessTokenError"
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
			case ErrorType.BAD_TOKEN:
			case ErrorType.TOKEN_EXPIRED:
			case ErrorType.UNAUTHORIZED:
				return new AuthFailureResponse(err.message).send(res);
			case ErrorType.BAD_REQUEST:
				return new BadRequestResponse(err.message).send(res);
			case ErrorType.ACCESS_TOKEN:
				return new AccessTokenErrorResponse(err.message).send(res);
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

export class AuthFailureError extends ApiError {
	constructor(message = "Invalid Credentials") {
		super(ErrorType.UNAUTHORIZED, message);
	}
}

export class BadTokenError extends ApiError {
	constructor(message = "Token is not valid") {
		super(ErrorType.BAD_TOKEN, message);
	}
}

export class TokenExpiredError extends ApiError {
	constructor(message = "Token is expired.") {
		super(ErrorType.TOKEN_EXPIRED, message);
	}
}

export class AccessTokenError extends ApiError {
	constructor(message = "Invalid access token") {
		super(ErrorType.ACCESS_TOKEN, message);
	}
}
