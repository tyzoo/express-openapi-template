import {
	prop,
	getModelForClass,
	pre,
	index,
	modelOptions,
	Severity,
} from "@typegoose/typegoose";
import { ethers } from "ethers";
import { BaseModel } from "../core/BaseModel";

export enum User_Scopes {
	ADMIN = "admin", //eslint-disable-line
	USER = "user", //eslint-disable-line
	BANNED = "banned", //eslint-disable-line
	VERIFIED = "verified", //eslint-disable-line
}

@pre<User>("save", async function () {
	if (this.isNew) {
		try {
			this.address = ethers.utils.getAddress(this.address);
		} catch (err: any) {
			throw Error(`Invalid ethereum address`);
		}
	}
})
@index({ address: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })

/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
export class User extends BaseModel {
	@prop({ required: true, immutable: true })
	public address!: string;

	@prop({ required: false })
	public nonce?: string;

	/**
	 * Privleged access to API's and other account flags
	 * @example ["user", "admin", "verified", "banned"]
	 */
	@prop({ required: false, default: [] })
	public scopes?: User_Scopes[];

	/**
	 * Store latest JWT for authorizaiton
	 */
	@prop({ required: false, select: false, default: null })
	public jwt?: string;
}

export const UserModel = getModelForClass(User);
