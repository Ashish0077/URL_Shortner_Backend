export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const tokenInfo = {
	accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || "0"),
	refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS || "0"),
	issuer: process.env.TOKEN_ISSUER || "",
	audience: process.env.TOKEN_AUDIENCE || ""
};
