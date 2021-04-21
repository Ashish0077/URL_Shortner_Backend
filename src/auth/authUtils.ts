import { AuthFailureError, InternalError } from "../core/ApiError";
import { tokenInfo } from "../config";
import JWT, { JwtPayload } from "../core/JWT";
import User from "../database/model/User";
import { Tokens } from "../types/app-request";

export const getAccessToken = (authorization?: string): string => {
	if (!authorization) throw new AuthFailureError("Invalid Authorization");
	if (!authorization.startsWith("Bearer ")) throw new AuthFailureError("Invalid Authorization");
	return authorization.split(" ")[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
	if (
		!payload ||
		!payload.iss ||
		!payload.sub ||
		!payload.aud ||
		!payload.key ||
		payload.iss !== tokenInfo.issuer ||
		payload.aud !== tokenInfo.audience
	)
		throw new AuthFailureError("Invalid Access Token");
	return true;
};

export const createToken = async (
	user: User,
	accessTokenKey: string,
	refreshTokenKey: string
): Promise<Tokens> => {
	const accessToken = await JWT.encode(
		new JwtPayload(
			tokenInfo.issuer,
			tokenInfo.audience,
			user.uuid,
			accessTokenKey,
			tokenInfo.accessTokenValidityDays
		)
	);

	if (!accessToken) throw new InternalError();

	const refreshToken = await JWT.encode(
		new JwtPayload(
			tokenInfo.issuer,
			tokenInfo.audience,
			user.uuid,
			refreshTokenKey,
			tokenInfo.refreshTokenValidityDays
		)
	);

	if (!refreshToken) throw new InternalError();

	return {
		accessToken: accessToken,
		refreshToken: refreshToken
	} as Tokens;
};
