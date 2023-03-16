import {
	prop,
	getModelForClass,
	index,
	modelOptions,
	Severity,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserModel } from "./User";
import { TokenService, TOKEN_TYPES } from "../../services/tokenService";

export enum APIKey_Scopes {
	READ = "read",
	WRITE = "write",
}

/**
 * Users must assign unique names to each APIKey
 */
@index({ name: 1, user: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })

/**
 * APIKey objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The APIKey object contains common information to link
 * back to the user which contains status and role.
 */
export class APIKey extends TimeStamps {
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
	 * Store latest JWT for authorizaiton
	 */
	@prop({ required: false, select: false, default: null })
	public jwt?: string;

	/**
	 * Date the API Key expires
	 */
	@prop({ required: true })
	public expiresAt!: Date;

	/**
	 * Scopes of the API Key relative to the User account
	 * @example "read", "write"
	 */
	@prop({ required: false, default: [] })
	public scopes?: APIKey_Scopes[];

	/**
	 * Scopes of the API Key
	 */
	public static async issueToken(
		this: ModelType<APIKey>,
		userId: string,
		tokenName: string,
		expiresInDays: number,
		scopes: string[] = [],
	) {
		const user = await UserModel.findById(userId);
		if (!user) throw Error(`Can't find that user`);
		const oneDayInSeconds = 24 * 60 * 60 * 1000;
		return this.create({
			user,
			name: tokenName,
			token: await TokenService.issueToken(
				TOKEN_TYPES.API_KEY,
				userId,
				{
					scopes,
					tokenName,
				},
				expiresInDays + "d",
			),
			expiresAt: new Date(Date.now() + expiresInDays * oneDayInSeconds),
		});
	}
}

export const APIKeyModel = getModelForClass(APIKey);
