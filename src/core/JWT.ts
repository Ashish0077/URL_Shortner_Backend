import { readFile } from "fs";
import { promisify } from "util";
import path from "path";
import { InternalError, TokenExpiredError, BadTokenError } from "./ApiError";
import { sign, verify } from "jsonwebtoken";

export class JwtPayload {
	aud: string; // audience
	sub: string; // subject(uuid)
	iss: string; // issuer
	iat: number; // issued at
	exp: number; // expiration
	key: string;

	constructor(issuer: string, audience: string, subject: string, key: string, validity: number) {
		this.iss = issuer;
		this.aud = audience;
		this.sub = subject;
		this.iat = Math.floor(Date.now() / 100);
		this.exp = this.iat + validity * 24 * 60 * 60;
		this.key = key;
	}
}

export default class JWT {
	private static readPublicKey(): Promise<string> {
		return promisify(readFile)(path.join(__dirname, "../../keys/public.pem"), "utf-8");
	}

	private static readPrivateKey(): Promise<string> {
		return promisify(readFile)(path.join(__dirname, "../../keys/private.pem"), "utf-8");
	}

	public static async encode(payload: JwtPayload): Promise<string> {
		const cert = await this.readPrivateKey();
		if (!cert) throw new InternalError("Token Generation failure.");
		// @ts-ignore
		return promisify(sign)({ ...payload }, cert, { algorithm: "RS256" });
	}

	public static async validate(token: string): Promise<JwtPayload> {
		const cert = await this.readPublicKey();
		if (!cert) throw new InternalError();
		try {
			// @ts-ignore
			return (await promisify(verify)(token, cert)) as JwtPayload;
		} catch (error) {
			if (error && error.name == "TokenExpiredError") throw new TokenExpiredError();
			throw new BadTokenError();
		}
	}

	public static async decode(token: string): Promise<JwtPayload> {
		const cert = await this.readPublicKey();
		if (!cert) throw new InternalError();
		try {
			// @ts-ignore
			return (await promisify(verify)(token, cert, { ignoreExpiration: true })) as JwtPayload;
		} catch (error) {
			throw new BadTokenError();
		}
	}
}
