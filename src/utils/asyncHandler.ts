import { NextFunction, Request, Response } from "express";

export type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (asyncFunction: AsyncFunction) => (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	asyncFunction(req, res, next).catch(next);
};
