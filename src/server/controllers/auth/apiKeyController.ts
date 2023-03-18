import express from "express";
import {
	Get,
	Route,
	Tags,
	Response,
	Request,
	Security,
	Post,
	Body,
} from "tsoa";
import { UserModel, User_Scopes } from "../../models";
import { TOKEN_TYPES } from "../../services/tokenService";
import { APIKey, APIKeyModel, APIKey_Scopes } from "../../models/auth/APIKey";
import { APIError } from "../../utils";

/**
 * APIKey document with _id field.
 * @interface
 * @extends APIKey
 * @property {string} _id - The ID of the APIKey.
 */
interface APIKeyDoc extends APIKey {
	_id: string;
}

/**
 * Controller for managing APIKeys.
 * @class
 */
@Route("/api-keys")
@Tags("APIKeys")
@Security(TOKEN_TYPES.SIWE, [User_Scopes.USER])
@Response<{ message: string }>(401, "Unauthorized", {
	message: `Unauthorized request`,
})
export class ApiKeyController {
	/**
	 * Retrieves all APIKeys.
	 * @summary Retrieves all APIKeys.
	 * @returns { Promise<APIKey[]> } - An array of APIKeys.
	 */
	@Get("/")
	public async findAllitems(
		@Request() req: express.Request,
	): Promise<APIKeyDoc[]> {
		const userId = req.res!.locals.decoded.user._id;
		const user = await UserModel.findById(userId);
		if (!user) throw new APIError(403, "Invalid user");
		return APIKeyModel.find({ user: user._id }).select(["-__v"]);
	}

	/**
	 * Creates a new APIKey.
	 * @summary Creates a new APIKey.
	 * @param {object} body - Request body.
	 * @param {number} body.expiresInDays 356 - The number of days the token should be valid for.
	 * @param {APIKey_Scopes[]} body.scopes ["read"] - The scopes for the new APIKey relativre to the user.
	 * @param {string} body.tokenName "Read Only Token" - The name for the new APIKey.
	 * @returns { Promise<APIKey> } - The new APIKey.
	 */
	@Post("/")
	public async createApiKey(
		@Request() req: express.Request,
		@Body()
		body: {
			expiresInDays: number;
			scopes: APIKey_Scopes[];
			tokenName: string;
		},
	): Promise<APIKeyDoc> {
		const { expiresInDays, scopes, tokenName } = body;
		const userId = req.res!.locals.decoded.user._id;
		const user = await UserModel.findById(userId);
		if (!user) throw new APIError(403, "Invalid user");
		return APIKeyModel.issueToken(userId, tokenName, expiresInDays, scopes);
	}
}
