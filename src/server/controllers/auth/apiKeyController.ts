import express from "express";
import { PaginateResult } from "mongoose";
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
 * APIKey document with _id field
 * @interface
 * @extends APIKey
 * @property {string} _id - The ID of the APIKey
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
	 * Retrieve all APIKeys
	 * @summary Retrieve all APIKeys (User Only)
	 * @returns { PaginateResult<APIKey> } - An array of paginated APIKeys
	 */
	@Get("/")
	public async findAllItems(
		@Queries() queryParams: FilterQueryParams,
		@Request() req: express.Request,
	): Promise<PaginateResult<APIKey>> {
		const userId = req.res!.locals.decoded.user._id;
		const user = await UserModel.findById(userId);
		if (!user) throw new APIError(403, "Invalid user");
		const mongoQuery = buildMongoQuery(queryParams);
		const items = await APIKeyModel.paginate({
			...mongoQuery.filters,
			user: user._id,
		}, {
			...mongoQuery.options,
			select: ["-__v"],
		});
		return items as PaginateResult<APIKey>;
	}

	/**
	 * Create a new APIKey.
	 * @summary Create a new APIKey (User Only)
	 * @param {object} body - Request body
	 * @param {number} body.expiresInDays 356 - The number of days the token should be valid for.
	 * @param {APIKey_Scopes[]} body.scopes ["user:read"] - The scopes for the new APIKey relativre to the user.
	 * @param {string} body.tokenName "Read Only Token" - The name for the new APIKey.
	 * @returns { APIKey } - The new APIKey.
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
	 * Delete an APIKey
	 * @summary Delete an APIKey (User Only)
	 * @param {string} id - The ID of the APIKey to delete.
	 * @returns { { success: boolean, message: string } } - A success status message.
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
