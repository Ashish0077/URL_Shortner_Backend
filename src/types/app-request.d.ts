import { Request } from "express";
import Keystore from "../database/model/Keystore";
import User from "../database/model/User";

/* 
	whenever there will be a Protected Request made to the server this interface will 
	attach a authenticated user and token information to the request object
*/
declare interface ProtectedRequest extends Request {
	user: User;
	accessToken: string;
	keystore: Keystore;
}

declare interface Tokens {
	accessToken: string;
	refreshToken: string;
}
