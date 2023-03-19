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
	Queries,
	Delete,
	Path,
} from "tsoa";
import { UserModel, User_Scopes } from "../../models";
import { TOKEN_TYPES } from "../../services/tokenService";
import { APIKey, APIKeyModel, APIKey_Scopes } from "../../models/auth/APIKey";
import { APIError } from "../../utils";
import { buildMongoQuery, FilterQueryParams } from "../../utils/db/mongoQuery";

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
	public async findAllItems(
		@Queries() queryParams: FilterQueryParams,
		@Request() req: express.Request,
	): Promise<APIKeyDoc[]> {
		const userId = req.res!.locals.decoded.user._id;
		const user = await UserModel.findById(userId);
		if (!user) throw new APIError(403, "Invalid user");
		const mongoQuery = buildMongoQuery(queryParams);
		const items = await APIKeyModel.find({
			...mongoQuery.filters,
			user: user._id,
		})
			.sort(mongoQuery.options.sort)
			.skip(mongoQuery.options.skip)
			.limit(mongoQuery.options.limit)
			.select("-__v");
		return items;
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

	/**
	 * Deletes an APIKey.
	 * @summary Deletes an APIKey.
	 * @param {string} id - The ID of the APIKey to delete.
	 * @returns { Promise<{ success: boolean, message: string }> } - A success status message.
	 */
	@Delete("/{itemId}")
	public async deleteApiKey(
		@Path() itemId: string,
		@Request() req: express.Request,
	): Promise<{ success: boolean; message: string }> {
		const userId = req.res!.locals.decoded.user._id;
		const user = await UserModel.findById(userId);
		if (!user) throw new APIError(403, "Invalid user");
		const apiKey = await APIKeyModel.findOne({
			_id: itemId,
			user: user._id,
		});
		if (!apiKey) throw new APIError(404, "API key not found");
		await apiKey.remove();
		return {
			success: true,
			message: "API key successfully deleted",
		};
	}
}
