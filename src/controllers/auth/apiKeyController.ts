import { Get, Route, Tags, Response } from "tsoa";
import { APIKey, APIKeyModel } from "../../models/auth/APIKey";

// interface APIKeyDoc extends APIKey {
//     _id: string;
// }
@Route("api-keys")
@Tags("Authentication")
@Response<{ message: string }>(401, "Unauthorized", {
	message: `Unauthorized request`,
})
export class ApiKeyController {
	/**
	 * Get all APIKeys
	 * @summary Get all APIKeys
	 * @returns { APIKeyModel[] } Array of APIKeys
	 */
	@Get("")
	public async findAllitems(): Promise<APIKey[]> {
		return APIKeyModel.find({}).select(["-__v"]);
	}
}
