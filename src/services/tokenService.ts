import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { ironSessionOptions } from "../middleware";

export enum TOKEN_TYPES {
	SIWE = "siwe", //eslint-disable-line
	API_KEY = "api-key", //eslint-disable-line
}

/**
 * A controller for issuing JWTs in the application
 */
export class TokenServiceInstance {
	async issueToken(
		type: TOKEN_TYPES,
		userId: string,
		props: any,
		expiresIn = "365d",
	) {
		const user = await UserModel.findById(userId).select("-__v");
		if (!user) throw Error(`Can't find that user`);
		switch (type) {
			case TOKEN_TYPES.API_KEY: {
				const { scopes, tokenName } = props;
				if (!tokenName) throw Error(`Missing tokenName in props`);
				if (!scopes) throw Error(`Missing scopes in props`);
				return jwt.sign(
					{
						type: TOKEN_TYPES.API_KEY,
						tokenName,
						user: user.toObject(),
						scopes,
					},
					ironSessionOptions.password,
					{
						expiresIn,
					},
				);
			}
			case TOKEN_TYPES.SIWE: {
				const { siwe, scopes } = props;
				if (!siwe) throw Error(`Missing siwe in props`);
				return jwt.sign(
					{
						type: TOKEN_TYPES.SIWE,
						user: user.toObject(),
						siwe,
						scopes,
					},
					ironSessionOptions.password,
					{
						expiresIn,
					},
				);
			}
		}
	}
}

export const TokenService = new TokenServiceInstance();
