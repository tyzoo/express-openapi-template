import { prop, getModelForClass, pre, index } from "@typegoose/typegoose";
import { ethers } from "ethers";
import { BaseModel } from "../core/BaseModel";

@pre<Guestbook>("save", async function () {
	if (this.isNew) {
		try {
			this.address = ethers.utils.getAddress(this.address);
		} catch (err: any) {
			throw Error(`Invalid ethereum address`);
		}
	}
})
@index({ address: 1, listName: 1 }, { unique: true })
export class Guestbook extends BaseModel {
	@prop({ required: true })
	public address!: string;

	@prop({ required: true })
	public listName!: string;

	@prop({ required: true })
	public message!: string;
}

export const GuestbookModel = getModelForClass(Guestbook);
