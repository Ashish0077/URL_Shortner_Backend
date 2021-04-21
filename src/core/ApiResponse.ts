import { response, Response } from "express";

// HTTP response status codes indicate whether a specific HTTP request has been successfully completed.
enum ResponseStatus {
	SUCCESS = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_ERROR = 500
}

// API response status codes indicate whether a specific API request has been successfully completed.
enum StatusCode {
	SUCCESS = "10000",
	FAILURE = "10001",
	INVALID_ACCESS_TOKEN = "10002"
}

// This class will act as base class for all other types of responses.
abstract class ApiResponse {
	constructor(
		protected statusCode: StatusCode,
		protected status: ResponseStatus,
		protected message: string
	) {}

	/*
        This is method is here to automate the setting status and sanitizing fields job.
        It will automatically set status and will attach the sanitized json object to the res(express)
  */
	protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
		return res.status(this.status).json(ApiResponse.sanitize(response));
	}

	public send(res: Response): Response {
		return this.prepare<ApiResponse>(res, this);
	}

	private static sanitize<T extends ApiResponse>(response: T): T {
		const clone: T = {} as T;
		Object.assign(clone, response);
		// @ts-ignore
		delete clone.status;
		for (const i in clone) if (typeof clone[i] == "undefined") delete clone[i];
		return clone;
	}
}

export class NotFoundResponse extends ApiResponse {
	private url: string | undefined;

	constructor(message = "Not Found") {
		super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
	}

	send(res: Response): Response {
		this.url = res.req?.originalUrl;
		return super.prepare<NotFoundResponse>(res, this);
	}
}

export class SuccessResponse<T> extends ApiResponse {
	constructor(message: string, private data: T) {
		super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
	}

	send(res: Response): Response {
		return super.prepare<SuccessResponse<T>>(res, this);
	}
}

export class SuccessMsgResponse extends ApiResponse {
	constructor(message: string) {
		super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
	}
}

export class FailureMsgResponse extends ApiResponse {
	constructor(message: string) {
		super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
	}
}

export class InternalErrorResponse extends ApiResponse {
	constructor(message: string = "Internal Error") {
		super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
	}
}

export class AuthFailureResponse extends ApiResponse {
	constructor(message = "Authentication Failure") {
		super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
	}
}

export class BadRequestResponse extends ApiResponse {
	constructor(message = "Bad Parameters") {
		super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
	}
}

export class AccessTokenErrorResponse extends ApiResponse {
	private instruction = "refresh_token";

	constructor(message = "Access token invalid") {
		super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
	}

	send(res: Response): Response {
		res.setHeader("instruction", this.instruction);
		return super.prepare<AccessTokenErrorResponse>(res, this);
	}
}
