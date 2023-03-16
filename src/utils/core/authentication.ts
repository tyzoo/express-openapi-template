import dotenv from "dotenv";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { User_Scopes, UserModel } from "../../models/auth/User";
import { combineMiddleware, ironSession } from "../../middleware";
import { APIKeyModel, APIKey_Scopes } from "../../models/auth/APIKey";
dotenv.config();

export async function expressAuthentication(
	req: express.Request,
	securityName: string,
	scopes?: string[],
): Promise<any> {
	const getIronRequest = () => {
		return new Promise((resolve) => {
			combineMiddleware([
				ironSession,
				((req) => resolve(req)) as express.RequestHandler,
			])(req, req.res!, req.next!);
		});
	};
	const ironReq = (await getIronRequest()) as unknown as express.Request;
	switch (securityName) {
		case "api_key":
		case "jwt":
			const token =
				ironReq.body.token ||
				ironReq.query.token ||
				ironReq.headers.authorization?.replace("Bearer ", "") ||
				ironReq.session.jwt;
			return new Promise((resolve, reject) => {
				if (!token) return reject(new Error("No token provided"));
				jwt.verify(
					token,
					process.env.SECRET_COOKIE_PASSWORD!,
					async function (err: any, decoded: any) {
						if (err) {
							reject(err);
						} else {
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
							const { tokenName } = decoded;
							if (!tokenName) throw Error(`Invalid JWT. Missing "tokenName"`);
							switch (securityName) {
								case "api_key":
									{
										const apiKey = await APIKeyModel.findOne({ tokenName });
										if (!apiKey) throw Error(`Invalid APIKey`);
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
								case "jwt":
									{
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
		default: {
			throw Error(`Invalid securityName "${securityName}"`);
		}
	}
}
