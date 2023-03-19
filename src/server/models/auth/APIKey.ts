import {
	prop,
	getModelForClass,
	index,
	modelOptions,
	Severity,
} from "@typegoose/typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { sha256 } from "ethers/lib/utils";
import { TokenService, TOKEN_TYPES } from "../../services/tokenService";
import { BaseModel } from "../core/BaseModel";
import { UserModel } from "./User";

export enum APIKey_Scopes {
	USER_READ = "user:read", //eslint-disable-line
	USER_WRITE = "user:write", //eslint-disable-line
}

/**
 * Users must assign unique names to each APIKey
 */
@index({ name: 1, user: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })

/**
 * APIKey objects allows users to to access
 * scoped read/write routes
 */
export class APIKey extends BaseModel {
	/**
	 * APIKeys are linked to users
	 */
	@prop({ required: true, ref: () => "User" })
	public user!: string; // user._id

	/**
	 * Every APIKey should have a unique name
	 */
	@prop({ required: true })
	public name!: string;

	/**
	 * Store source JWT for authorizaiton
	 */
	@prop({ required: false, select: false, default: null })
	public jwt?: string;

	/**
	 * Store hash of the JWT
	 */
	@prop({ required: false, select: false, default: null })
	public hash?: string;

	/**
	 * Date the API Key expires
	 */
	@prop({ required: true })
	public expiresAt!: Date;

	/**
	 * Scopes of the API Key relative to the User account
	 * @example "user:read", "user:write"
	 */
	@prop({ required: false, default: [] })
	public scopes?: APIKey_Scopes[];

	public static async issueToken(
		this: ModelType<APIKey>,
		userId: string,
		tokenName: string,
		expiresInDays: number,
		scopes: string[] = [],
	) {
		const user = await UserModel.findById(userId);
		if (!user) throw Error(`Can't find that user`);
		const token = await TokenService.issueToken(
			TOKEN_TYPES.API_KEY,
			userId,
			{
				scopes,
				tokenName,
			},
			expiresInDays + "d",
		);
		if (!token) throw Error(`Failed to issue token`);
		const oneDayInSeconds = 24 * 60 * 60 * 1000;
		const apiKey = await this.create({
			user: user._id,
			name: tokenName,
			scopes,
			jwt: token,
			hash: sha256(Buffer.from(token, "base64")),
			expiresAt: new Date(Date.now() + expiresInDays * oneDayInSeconds),
		});
		console.log({ apiKey });
		return apiKey;
	}
}

export const APIKeyModel = getModelForClass(APIKey);
