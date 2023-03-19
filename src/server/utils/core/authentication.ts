import dotenv from "dotenv";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { User_Scopes, UserModel } from "../../models/auth/User";
import { APIKeyModel, APIKey_Scopes } from "../../models/auth/APIKey";
import { TOKEN_TYPES } from "../../services/tokenService";
dotenv.config();

export async function expressAuthentication(
	req: express.Request,
	tokenType: string,
	scopes?: string[],
): Promise<any> {
	switch (tokenType) {
		default:
			throw Error(`Invalid tokenType "${tokenType}"`);
		case TOKEN_TYPES.API_KEY:
		case TOKEN_TYPES.SIWE: {
			let token =
				req.body.token ||
				req.query.token ||
				req.headers.authorization?.replace("Bearer ", "") ||
				req.session.jwt;
			return new Promise(async (resolve, reject) => {
				if (!token) return reject(new Error("No token provided"));
				if (token.startsWith("0x")) {
					const apiKeyLookup = await APIKeyModel.findOne({ hash: token }).select(["jwt"]);
					if (!apiKeyLookup) return reject(new Error("Incorrect API Key"));
					token = apiKeyLookup.jwt;
				}
				jwt.verify(
					token,
					process.env.SECRET_COOKIE_PASSWORD!,
					async function (err: any, decoded: any) {
						if (err) {
							reject(err);
						} else {
							req.res!.locals.jwt = token;
							req.res!.locals.decoded = decoded;
							const user = await UserModel.findById(decoded.user._id).select([
								"jwt",
								"scopes",
							]);
							if (!user) return reject(new Error(`User doesn't exist`));
							if (
								user.scopes?.includes(User_Scopes.BANNED) &&
								!scopes?.includes(User_Scopes.BANNED)
							) {
								return reject(new Error(`Your account is banned`));
							}
							switch (tokenType) {
								case TOKEN_TYPES.API_KEY:
									{
										if (decoded.type !== TOKEN_TYPES.API_KEY) {
											return reject(
												new Error(
													`Invalid JWT type: "${decoded.type}" expected: "api-key"`,
												),
											);
										}
										const { tokenName } = decoded;
										if (!tokenName)
											return reject(new Error(`Invalid JWT. Missing "tokenName"`));
										const apiKey = await APIKeyModel.findOne({
											user: user._id,
											tokenName,
										});
										if (!apiKey) return reject(new Error(`Invalid APIKey`));
										if (scopes) {
											for (const scope of scopes) {
												if (!apiKey.scopes?.includes(scope as APIKey_Scopes)) {
													return reject(
														new Error(`API Key is missing a required scope '${scope}'`),
													);
												}
											}
										}
										if (apiKey.jwt !== token)
											return reject(new Error(`APIKey is invalid`));
									}
									break;
								case TOKEN_TYPES.SIWE:
									{
										if (decoded.type !== TOKEN_TYPES.SIWE) {
											return reject(
												new Error(`Invalid JWT type: "${decoded.type}" expected: "siwe"`),
											);
										}
										if (scopes) {
											for (const scope of scopes) {
												if (!user.scopes?.includes(scope as User_Scopes)) {
													return reject(
														new Error(`User account is missing a required scope '${scope}'`),
													);
												}
											}
										}
										if (user.jwt !== token) return reject(new Error(`JWT is invalid`));
									}
									break;
							}
							resolve(decoded);
						}
					},
				);
			});
		}
	}
}
