import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { ironSessionOptions } from "../middleware";

export enum TOKEN_TYPES {
	SIWE = "siwe",
	API_KEY = "api-key",
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
		const user = await UserModel.findById(userId);
		if (!user) throw Error(`Can't find that user`);
		switch (type) {
			case TOKEN_TYPES.API_KEY: {
				const { userScopes, tokenName } = props;
				if (!tokenName) throw Error(`Missing tokenName in props`);
				if (!userScopes) throw Error(`Missing userScopes in props`);
				return jwt.sign(
					{
						type: TOKEN_TYPES.API_KEY,
						tokenName,
						user,
						userScopes,
					},
					ironSessionOptions.password,
					{
						expiresIn,
					},
				);
			}
			case TOKEN_TYPES.SIWE: {
				const { siwe } = props;
				if (!siwe) throw Error(`Missing siwe in props`);
				return jwt.sign(
					{
						type: TOKEN_TYPES.SIWE,
						user,
						siwe,
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
